import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://www.npmjs.com/package/astro-m2dx#auto-imports
import m2dx from 'astro-m2dx';

/** @type {import('astro-m2dx').Options} */
import image from "@astrojs/image";
const m2dxOptions = {
  autoImports: true
};

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx({
    remarkPlugins: [[m2dx, m2dxOptions]]
  }), image()]
});