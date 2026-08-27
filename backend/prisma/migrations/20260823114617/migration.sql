/*
  Warnings:

  - You are about to drop the column `medthod` on the `InvLog` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeek` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `idCardUrl` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `licenseUrl` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Clinic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clinicname` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCardUrl` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseUrl` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `InvLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClinicStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'SUNDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterEnum
ALTER TYPE "AppointmentStatus" ADD VALUE 'INPROGRESS';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'CLINIC';

-- DropForeignKey
ALTER TABLE "Vet" DROP CONSTRAINT "Vet_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "Vet" DROP CONSTRAINT "Vet_userId_fkey";

-- DropIndex
DROP INDEX "Vet_userId_key";

-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "clinicname" TEXT NOT NULL,
ADD COLUMN     "idCardUrl" TEXT NOT NULL,
ADD COLUMN     "licenseUrl" TEXT NOT NULL,
ADD COLUMN     "status" "ClinicStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InvLog" DROP COLUMN "medthod",
ADD COLUMN     "method" "ActionMethod" NOT NULL,
ALTER COLUMN "changedAmount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "minimumStock" INTEGER NOT NULL DEFAULT 5,
ALTER COLUMN "qr" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vet" DROP COLUMN "dayOfWeek",
DROP COLUMN "endTime",
DROP COLUMN "idCardUrl",
DROP COLUMN "latitude",
DROP COLUMN "licenseUrl",
DROP COLUMN "longitude",
DROP COLUMN "startTime",
DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "fullName" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "clinicId" DROP NOT NULL;

-- DropEnum
DROP TYPE "VetStatus";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clinicId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingSchedule" (
    "id" SERIAL NOT NULL,
    "clinicid" INTEGER NOT NULL,
    "WorkingDays" "DayOfWeek" NOT NULL,
    "StartTime" TIME NOT NULL,
    "EndTime" TIME NOT NULL,

    CONSTRAINT "WorkingSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_clinicId_key" ON "Location"("clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_userId_key" ON "Clinic"("userId");

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingSchedule" ADD CONSTRAINT "WorkingSchedule_clinicid_fkey" FOREIGN KEY ("clinicid") REFERENCES "Clinic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vet" ADD CONSTRAINT "Vet_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
