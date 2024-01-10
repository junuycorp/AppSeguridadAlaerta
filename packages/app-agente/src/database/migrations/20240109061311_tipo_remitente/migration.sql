/*
  Warnings:

  - Added the required column `tipoRemitente` to the `mensaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mensaje` ADD COLUMN `tipoRemitente` ENUM('ciudadano', 'sereno') NOT NULL;
