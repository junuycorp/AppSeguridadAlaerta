/*
  Warnings:

  - The primary key for the `informe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idIncidente` on the `informe` table. All the data in the column will be lost.
  - You are about to drop the column `idInforme` on the `informe` table. All the data in the column will be lost.
  - Added the required column `id_incidente` to the `informe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_informe` to the `informe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `informe_idIncidente_fkey`;

-- AlterTable
ALTER TABLE `informe` DROP PRIMARY KEY,
    DROP COLUMN `idIncidente`,
    DROP COLUMN `idInforme`,
    ADD COLUMN `id_incidente` INTEGER NOT NULL,
    ADD COLUMN `id_informe` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_informe`);

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;
