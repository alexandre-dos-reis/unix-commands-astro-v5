import { z } from "zod";
import * as dotenv from "dotenv";
import { logError, logSuccess, logWarn, inspect } from "./helpers/logger";
import { gql, GraphQLClient } from "graphql-request";
import { fileURLToPath } from "url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LegacyCommandQuery {
  commands: {
    title: string;
    slug: string;
    tab: string;
    description: string;
    cmd_order: number | null;
    image: string | null;
    sub_commands: {
      sign: string | null;
      item: string;
      info: string;
      sort: number | null;
    }[];
  }[];
}

(async () => {
  dotenv.config({
    path: ".env.local",
  });

  const env = z
    .object({
      LEGACY_GRAPHQL_ENDPOINT: z.string().min(1).url(),
      LEGACY_GRAPHQL_TOKEN: z.string().min(1),
    })
    .safeParse(process.env);

  if (!env.success) {
    logError("❌ Invalid environment variables:\n");
    throw new Error("Invalid environment variables");
  }

  const ENV = env.data;

  const client = new GraphQLClient(ENV.LEGACY_GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `Bearer ${ENV.LEGACY_GRAPHQL_TOKEN}`,
    },
  });

  const { commands }: LegacyCommandQuery = await client.request(gql`
    {
      commands {
        title
        slug
        tab
        image
        description
        cmd_order
        sub_commands {
          item
          info
          sort
          sign
        }
      }
    }
  `);

  const commandsDirname = path.join(__dirname, "../src/content/commands");

  fs.rmSync(commandsDirname, { force: true, recursive: true });
  fs.mkdirSync(commandsDirname);

  //   if (!fs.existsSync(commandsDirname)) {
  //     logWarn("The commands directory doesn't exist. Creating the folder...");
  //     fs.mkdirSync(commandsDirname);
  //   }

  // Creating each top command folder
  commands.map(async (c) => {
    const cmdDirPath = path.join(commandsDirname, c.tab);

    if (!fs.existsSync(cmdDirPath)) {
      fs.mkdirSync(cmdDirPath);
    }

    const indexMDXPath = path.join(cmdDirPath, "index.mdx");

    if (!fs.existsSync(indexMDXPath)) {
      fs.writeFileSync(
        indexMDXPath,
        `---
sort: ${c.cmd_order || 1}
title: ${c.title}
${c.image ? `image: ${c.image}` : ""}
---

${c.description}

${c.sub_commands
  .sort((a, b) => (a.sort || 1) - (b.sort || 1))
  .map(
    (sc) =>
      `<C i={\`${sc.item}\`}${sc.sign !== "$" ? ` env={\`${sc.sign}\`}` : ""}>${
        sc.info
      }</C>\n\n`
  )
  // To avoid comma...
  .join("")}
`
      );
    }
  });

  //   logWarn(inspect(commands));
})();
