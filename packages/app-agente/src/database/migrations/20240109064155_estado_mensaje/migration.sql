/*
  Warnings:

  - The values [PENDIENTE] on the enum `mensaje_estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `mensaje` MODIFY `estado` ENUM('ENVIADO', 'RECIBIDO', 'LEIDO') NOT NULL;
