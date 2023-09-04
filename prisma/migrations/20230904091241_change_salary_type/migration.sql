/*
  Warnings:

  - You are about to alter the column `salary` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "salary" SET DATA TYPE INTEGER;
