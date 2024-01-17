-- CreateTable
CREATE TABLE `comunicado` (
    `id_comunicado` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('alerta', 'noticia', 'recomendacion') NOT NULL,
    `mensaje` TEXT NOT NULL,
    `id_remitente` VARCHAR(8) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_comunicado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comunicado` ADD CONSTRAINT `comunicado_id_remitente_fkey` FOREIGN KEY (`id_remitente`) REFERENCES `cuenta_usuario`(`nro_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
