/*
  Warnings:

  - The values [DEFAULT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Entrepreneur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `businessStage` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `pitchDeckUrl` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Entrepreneur` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Entrepreneur` table. All the data in the column will be lost.
  - The `id` column on the `Entrepreneur` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Investor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `firmName` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `investmentFocus` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `socialMedia` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Investor` table. All the data in the column will be lost.
  - The `id` column on the `Investor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `business` to the `Entrepreneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pitch` to the `Entrepreneur` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `Entrepreneur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Investor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ENTREPRENEUR', 'INVESTOR');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Entrepreneur" DROP CONSTRAINT "Entrepreneur_userId_fkey";

-- DropForeignKey
ALTER TABLE "Investor" DROP CONSTRAINT "Investor_userId_fkey";

-- AlterTable
ALTER TABLE "Entrepreneur" DROP CONSTRAINT "Entrepreneur_pkey",
DROP COLUMN "bio",
DROP COLUMN "businessStage",
DROP COLUMN "contactNumber",
DROP COLUMN "createdAt",
DROP COLUMN "industry",
DROP COLUMN "pitchDeckUrl",
DROP COLUMN "socialMedia",
DROP COLUMN "updatedAt",
DROP COLUMN "website",
ADD COLUMN     "business" TEXT NOT NULL,
ADD COLUMN     "pitch" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Entrepreneur_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Investor" DROP CONSTRAINT "Investor_pkey",
DROP COLUMN "bio",
DROP COLUMN "contactNumber",
DROP COLUMN "createdAt",
DROP COLUMN "firmName",
DROP COLUMN "investmentFocus",
DROP COLUMN "socialMedia",
DROP COLUMN "updatedAt",
DROP COLUMN "website",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Investor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "BusinessStage";

-- CreateTable
CREATE TABLE "Investment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "entrepreneurId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrepreneur_userId_key" ON "Entrepreneur"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_userId_key" ON "Investor"("userId");

-- AddForeignKey
ALTER TABLE "Entrepreneur" ADD CONSTRAINT "Entrepreneur_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_entrepreneurId_fkey" FOREIGN KEY ("entrepreneurId") REFERENCES "Entrepreneur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
