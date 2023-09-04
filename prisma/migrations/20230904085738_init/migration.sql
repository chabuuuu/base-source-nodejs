/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Nam', 'Nu');

-- DropTable
DROP TABLE "photo";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Nam',
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "job_title" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "profile_picture" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
