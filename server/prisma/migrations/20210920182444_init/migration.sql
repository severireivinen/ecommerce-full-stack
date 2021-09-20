/*
  Warnings:

  - A unique constraint covering the columns `[productId,customerId]` on the table `ShoppingCartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCartItem_productId_customerId_key" ON "ShoppingCartItem"("productId", "customerId");
