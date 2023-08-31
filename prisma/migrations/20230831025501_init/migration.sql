-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "filename" TEXT,
    "views" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);
