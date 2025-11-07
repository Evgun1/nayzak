-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "productsRatingId" INTEGER;

-- CreateTable
CREATE TABLE "ProductsRating" (
    "id" SERIAL NOT NULL,
    "avg" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductsRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productsRatingId_fkey" FOREIGN KEY ("productsRatingId") REFERENCES "ProductsRating"("id") ON DELETE SET NULL ON UPDATE CASCADE;
