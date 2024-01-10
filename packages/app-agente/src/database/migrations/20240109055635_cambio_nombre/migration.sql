/*
  Warnings:

  - You are about to drop the `Mensaje` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Mensaje` DROP FOREIGN KEY `Mensaje_id_incidente_fkey`;

-- DropTable
DROP TABLE `Mensaje`;

-- CreateTable
CREATE TABLE `mensaje` (
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
ALTER TABLE `mensaje` ADD CONSTRAINT `mensaje_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;
