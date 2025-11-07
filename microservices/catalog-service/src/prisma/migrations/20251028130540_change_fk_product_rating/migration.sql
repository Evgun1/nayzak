/*
  Warnings:

  - A unique constraint covering the columns `[productsRatingId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_productsRatingId_key" ON "Products"("productsRatingId");
