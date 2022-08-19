-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMING', 'INPROGRESS', 'CONCLUDED');

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "user_limit" INTEGER NOT NULL,
    "creator_user_id" TEXT NOT NULL,
    "is_public" "Status" NOT NULL DEFAULT "PUBLIC",
    "status" "Status" NOT NULL DEFAULT 'INCOMING',
    "type" "TournamentType" NOT NULL,
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shield_url" TEXT NOT NULL DEFAULT 'https://i.pinimg.com/originals/d6/d2/09/d6d209b706faef3a58030445c271088f.png'
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_id_key" ON "Tournament"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_name_key" ON "Tournament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_id_key" ON "teams"("id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");
