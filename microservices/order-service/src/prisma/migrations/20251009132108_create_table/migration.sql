-- CreateEnum
CREATE TYPE "OrdersStatus" AS ENUM ('pending', 'processing', 'shipped');

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "OrdersStatus" NOT NULL DEFAULT 'pending',
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,
    "addressesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
