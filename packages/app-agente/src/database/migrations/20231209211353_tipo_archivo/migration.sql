/*
  Warnings:

  - Added the required column `tipo` to the `archivo_digital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `archivo_digital` ADD COLUMN `tipo` VARCHAR(12) NOT NULL;
