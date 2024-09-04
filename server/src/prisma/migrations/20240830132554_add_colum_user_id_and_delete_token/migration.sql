/*
  Warnings:

  - You are about to drop the column `user_token` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `product_id` on table `Cart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_product_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "user_token",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "usersId" INTEGER NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
