/*
  Warnings:

  - Added the required column `addressesId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order"."Orders" ADD COLUMN     "addressesId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "order"."Addresses" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order"."Orders" ADD CONSTRAINT "Orders_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "order"."Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
