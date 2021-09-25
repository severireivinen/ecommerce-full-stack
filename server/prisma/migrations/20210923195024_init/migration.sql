/*
  Warnings:

  - You are about to alter the column `price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `ShoppingCartItem` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "ShoppingCartItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
