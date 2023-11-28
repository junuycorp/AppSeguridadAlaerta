-- CreateTable
CREATE TABLE `incidente` (
    `id_incidente` INTEGER NOT NULL AUTO_INCREMENT,
    `id_denunciante` VARCHAR(20) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `longitud` VARCHAR(191) NOT NULL,
    `latitud` VARCHAR(191) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_incidente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `archivo_digital` (
    `id_archivo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_incidente` INTEGER NOT NULL,
    `ruta` VARCHAR(35) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_archivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IncidenteSereno` (
    `id_incidente` INTEGER NOT NULL,
    `id_sereno` VARCHAR(20) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_incidente`, `id_sereno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `archivo_digital` ADD CONSTRAINT `archivo_digital_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenteSereno` ADD CONSTRAINT `IncidenteSereno_id_incidente_fkey` FOREIGN KEY (`id_incidente`) REFERENCES `incidente`(`id_incidente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IncidenteSereno` ADD CONSTRAINT `IncidenteSereno_id_sereno_fkey` FOREIGN KEY (`id_sereno`) REFERENCES `cuenta_usuario`(`nro_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
