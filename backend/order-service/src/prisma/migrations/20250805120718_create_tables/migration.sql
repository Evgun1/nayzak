-- CreateEnum
CREATE TYPE "order"."OrdersStatus" AS ENUM ('pending', 'processing', 'shipped');

-- CreateTable
CREATE TABLE "order"."Orders" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "order"."OrdersStatus" NOT NULL DEFAULT 'pending',
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
