/*
  Warnings:

  - You are about to drop the column `fecha_modificacion` on the `incidente` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `incidente` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creacion` on the `incidente_sereno` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_modificacion` on the `incidente_sereno` table. All the data in the column will be lost.
  - Added the required column `id_tipo_incidente` to the `incidente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `incidente` DROP COLUMN `fecha_modificacion`,
    DROP COLUMN `tipo`,
    ADD COLUMN `fecha_finalizacion` DATETIME(3) NULL,
    ADD COLUMN `fecha_recepcion` DATETIME(3) NULL,
    ADD COLUMN `id_centro_poblado` INTEGER NULL,
    ADD COLUMN `id_tipo_incidente` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `incidente_sereno` DROP COLUMN `fecha_creacion`,
    DROP COLUMN `fecha_modificacion`,
    ADD COLUMN `fecha_asignacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `tipo_incidente` (
    `id_tipo_incidente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(35) NOT NULL,
    `descripcion` TEXT NULL,
    `color_marcador` VARCHAR(9) NOT NULL DEFAULT '#cb273a',

    PRIMARY KEY (`id_tipo_incidente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centro_poblado` (
    `id_centro_poblado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(40) NOT NULL,
    `ubicacion` VARCHAR(100) NULL,
    `extension` VARCHAR(50) NULL,

    PRIMARY KEY (`id_centro_poblado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `incidente` ADD CONSTRAINT `incidente_id_centro_poblado_fkey` FOREIGN KEY (`id_centro_poblado`) REFERENCES `centro_poblado`(`id_centro_poblado`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidente` ADD CONSTRAINT `incidente_id_tipo_incidente_fkey` FOREIGN KEY (`id_tipo_incidente`) REFERENCES `tipo_incidente`(`id_tipo_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;
