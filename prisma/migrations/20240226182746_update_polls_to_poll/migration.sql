/*
  Warnings:

  - You are about to drop the column `pollsId` on the `PollOption` table. All the data in the column will be lost.
  - You are about to drop the `Polls` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pollId` to the `PollOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_pollsId_fkey";

-- AlterTable
ALTER TABLE "PollOption" DROP COLUMN "pollsId",
ADD COLUMN     "pollId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Polls";

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollOption" ADD CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
