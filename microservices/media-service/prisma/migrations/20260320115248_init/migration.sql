-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "plaiceholder" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesMedia" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "categoriesId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubcategoriesMedia" (
    "id" SERIAL NOT NULL,
    "subcategoriesId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "SubcategoriesMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomersMedia" (
    "id" SERIAL NOT NULL,
    "customersId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "CustomersMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsMedia" (
    "id" SERIAL NOT NULL,
    "productsId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,

    CONSTRAINT "ProductsMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesMedia_mediaId_key" ON "CategoriesMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesMedia_categoriesId_key" ON "CategoriesMedia"("categoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "SubcategoriesMedia_subcategoriesId_key" ON "SubcategoriesMedia"("subcategoriesId");

-- CreateIndex
CREATE UNIQUE INDEX "SubcategoriesMedia_mediaId_key" ON "SubcategoriesMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomersMedia_customersId_key" ON "CustomersMedia"("customersId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomersMedia_mediaId_key" ON "CustomersMedia"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductsMedia_mediaId_key" ON "ProductsMedia"("mediaId");

-- AddForeignKey
ALTER TABLE "CategoriesMedia" ADD CONSTRAINT "CategoriesMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubcategoriesMedia" ADD CONSTRAINT "SubcategoriesMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomersMedia" ADD CONSTRAINT "CustomersMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsMedia" ADD CONSTRAINT "ProductsMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
