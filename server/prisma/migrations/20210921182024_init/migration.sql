/*
  Warnings:

  - A unique constraint covering the columns `[processed]` on the table `OrderStatusCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusCode_processed_key" ON "OrderStatusCode"("processed");
