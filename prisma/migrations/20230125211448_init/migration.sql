-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CODE', 'NETWORK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('MACOS', 'UNIX', 'LINUX');

-- CreateTable
CREATE TABLE "commands" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "slug" VARCHAR(64),
    "tab" VARCHAR(64),
    "env" VARCHAR(32) NOT NULL DEFAULT '$',
    "type" "Type",
    "platform" "Platform" NOT NULL DEFAULT 'UNIX',
    "content" TEXT NOT NULL,
    "image" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "parent_id" INTEGER,
    "commandId" INTEGER,

    CONSTRAINT "commands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commands_slug_key" ON "commands"("slug");

-- AddForeignKey
ALTER TABLE "commands" ADD CONSTRAINT "commands_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "commands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
