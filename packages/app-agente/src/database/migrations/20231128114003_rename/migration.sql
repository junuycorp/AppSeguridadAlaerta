/*
  Warnings:

  - You are about to drop the `IncidenteSereno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `IncidenteSereno` DROP FOREIGN KEY `IncidenteSereno_id_incidente_fkey`;

-- DropForeignKey
ALTER TABLE `IncidenteSereno` DROP FOREIGN KEY `IncidenteSereno_id_sereno_fkey`;

-- DropTable
DROP TABLE `IncidenteSereno`;

-- CreateTable
CREATE TABLE `incidente_sereno` (
    `id_incidente` INTEGER NOT NULL,
    `id_sereno` VARCHAR(20) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_incidente`, `id_sereno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `incidente_sereno` ADD CONSTRAINT `incidente_sereno_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `incidente_sereno` ADD CONSTRAINT `incidente_sereno_id_sereno_fkey` FOREIGN KEY (`id_sereno`) REFERENCES `cuenta_usuario`(`nro_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
