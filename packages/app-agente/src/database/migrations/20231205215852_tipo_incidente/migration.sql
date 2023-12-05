/*
  Warnings:

  - Added the required column `tipo` to the `incidente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `incidente` ADD COLUMN `tipo` VARCHAR(20) NOT NULL;
