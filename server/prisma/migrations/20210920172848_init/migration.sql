/*
  Warnings:

  - Made the column `customerId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderStatusCodeId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productCategoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `Shipment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ShoppingCartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `ShoppingCartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderStatusCodeId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingCartItem" DROP CONSTRAINT "ShoppingCartItem_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingCartItem" DROP CONSTRAINT "ShoppingCartItem_productId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "orderStatusCodeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shipment" ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ShoppingCartItem" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ShoppingCartItem" ADD CONSTRAINT "ShoppingCartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingCartItem" ADD CONSTRAINT "ShoppingCartItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusCodeId_fkey" FOREIGN KEY ("orderStatusCodeId") REFERENCES "OrderStatusCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
