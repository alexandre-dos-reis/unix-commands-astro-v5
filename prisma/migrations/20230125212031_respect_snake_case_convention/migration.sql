/*
  Warnings:

  - You are about to drop the column `commandId` on the `commands` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commands" DROP CONSTRAINT "commands_commandId_fkey";

-- AlterTable
ALTER TABLE "commands" DROP COLUMN "commandId",
ADD COLUMN     "command_id" INTEGER;

-- AddForeignKey
ALTER TABLE "commands" ADD CONSTRAINT "commands_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
