/*
  Warnings:

  - Added the required column `categoria` to the `archivo_digital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `archivo_digital` ADD COLUMN `categoria` VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE `informe` (
    `idInforme` INTEGER NOT NULL AUTO_INCREMENT,
    `idIncidente` INTEGER NOT NULL,
    `id_sereno` VARCHAR(20) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idInforme`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_idIncidente_fkey` FOREIGN KEY (`idIncidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_id_sereno_fkey` FOREIGN KEY (`id_sereno`) REFERENCES `cuenta_usuario`(`nro_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
