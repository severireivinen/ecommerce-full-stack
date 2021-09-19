/*
  Warnings:

  - Added the required column `amount` to the `ProductsOnCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductsOnCart" ADD COLUMN     "amount" INTEGER NOT NULL;
