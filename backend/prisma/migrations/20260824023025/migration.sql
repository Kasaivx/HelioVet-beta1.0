/*
  Warnings:

  - A unique constraint covering the columns `[cuid]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nid]` on the table `Clinic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `InvLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `MedicalRecord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nid]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `Appointment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Attachment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nid` to the `Clinic` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `InvLog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `MedicalRecord` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nid` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `Patient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cuid` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "nid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InvLog" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "nid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vet" ADD COLUMN     "nid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_cuid_key" ON "Appointment"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_cuid_key" ON "Attachment"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_nid_key" ON "Clinic"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "InvLog_cuid_key" ON "InvLog"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_cuid_key" ON "MedicalRecord"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_nid_key" ON "Owner"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cuid_key" ON "Patient"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_cuid_key" ON "Product"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
