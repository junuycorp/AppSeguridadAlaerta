/*
  Warnings:

  - You are about to alter the column `estado` on the `incidente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `subestado` on the `incidente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `incidente` MODIFY `estado` ENUM('PENDIENTE', 'RECIBIDO', 'ASIGNADO', 'TERMINADO') NOT NULL DEFAULT 'PENDIENTE',
    MODIFY `subestado` ENUM('ARCHIVADO', 'DERIVADO', 'DENUNCIADO', 'ATENDIDO') NULL;

-- CreateTable
CREATE TABLE `Mensaje` (
    `id_mensaje` INTEGER NOT NULL AUTO_INCREMENT,
    `id_incidente` INTEGER NOT NULL,
    `id_remitente` VARCHAR(20) NOT NULL,
    `id_destinatario` VARCHAR(20) NOT NULL,
    `mensaje` TEXT NOT NULL,
    `estado` ENUM('ENVIADO', 'PENDIENTE') NOT NULL,
    `fecha_envio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_mensaje`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;
