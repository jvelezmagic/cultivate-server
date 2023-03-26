/*
  Warnings:

  - Added the required column `description` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "description" TEXT NOT NULL;
