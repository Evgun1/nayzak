-- CreateEnum
CREATE TYPE "ProductsStatus" AS ENUM ('outOfStock', 'inStock', 'discontinued');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'client');

-- CreateEnum
CREATE TYPE "OrdersStatus" AS ENUM ('pending', 'processing', 'shipped');

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategories" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "categoriesId" INTEGER NOT NULL,

    CONSTRAINT "Subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brands" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "mainPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ProductsStatus" NOT NULL DEFAULT 'inStock',
    "categoriesId" INTEGER NOT NULL,
    "subcategoriesId" INTEGER NOT NULL,
    "brandsId" INTEGER,
    "mediaId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'client',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activationLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "OrdersStatus" NOT NULL DEFAULT 'pending',
    "customersId" INTEGER NOT NULL,
    "productsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressesId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "credentialsId" INTEGER NOT NULL,
    "mediaId" INTEGER,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "customersId" INTEGER NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_credentialsId_key" ON "Customers"("credentialsId");

-- AddForeignKey
ALTER TABLE "Subcategories" ADD CONSTRAINT "Subcategories_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subcategoriesId_fkey" FOREIGN KEY ("subcategoriesId") REFERENCES "Subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandsId_fkey" FOREIGN KEY ("brandsId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
