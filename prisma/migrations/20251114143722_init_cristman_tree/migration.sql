-- CreateEnum
CREATE TYPE "CardTemplate" AS ENUM ('CLASSIC', 'CUTE', 'MODERN', 'PIXEL');

-- CreateEnum
CREATE TYPE "OrnamentType" AS ENUM ('BALL', 'GIFT', 'RIBBON', 'SOCK', 'SNOW', 'ANGEL', 'BULB');

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "toName" TEXT,
    "fromName" TEXT,
    "message" TEXT NOT NULL,
    "templateType" "CardTemplate" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ornament" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "treeId" TEXT NOT NULL,
    "type" "OrnamentType" NOT NULL,
    "posX" DOUBLE PRECISION NOT NULL,
    "posY" DOUBLE PRECISION NOT NULL,
    "visibleFrom" TIMESTAMP(3),
    "visibleUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ornament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tree_slug_key" ON "Tree"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ornament_cardId_key" ON "Ornament"("cardId");

-- AddForeignKey
ALTER TABLE "Ornament" ADD CONSTRAINT "Ornament_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ornament" ADD CONSTRAINT "Ornament_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
