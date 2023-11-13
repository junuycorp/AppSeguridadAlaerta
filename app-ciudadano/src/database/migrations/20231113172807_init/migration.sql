-- CreateTable
CREATE TABLE `configuracion` (
    `clave` VARCHAR(50) NOT NULL,
    `valor` VARCHAR(200) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`clave`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuenta_usuario` (
    `nro_documento` VARCHAR(20) NOT NULL,
    `contrasena` VARCHAR(128) NOT NULL,
    `correo` VARCHAR(35) NOT NULL,
    `numero_celular` VARCHAR(11) NOT NULL,
    `correo_verificado` BOOLEAN NOT NULL DEFAULT false,
    `celular_verificado` BOOLEAN NOT NULL DEFAULT false,
    `pregunta_secreta` VARCHAR(60) NULL,
    `respuesta` VARCHAR(60) NULL,
    `contrasena_old` VARCHAR(128) NULL,
    `perfil_codigo` INTEGER NOT NULL,
    `estado_registro` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cuenta_usuario_correo_key`(`correo`),
    UNIQUE INDEX `cuenta_usuario_numero_celular_key`(`numero_celular`),
    PRIMARY KEY (`nro_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lista_menu` (
    `menu_codigo` VARCHAR(6) NOT NULL,
    `perfil_codigo` INTEGER NOT NULL,
    `nivel_acceso` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_codigo`, `perfil_codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_acceso` (
    `menu_codigo` VARCHAR(6) NOT NULL,
    `nombre` VARCHAR(60) NOT NULL,
    `descripcion` VARCHAR(150) NOT NULL,
    `sub_sistema` VARCHAR(60) NOT NULL,
    `nivel` INTEGER NOT NULL,
    `tipo_modulo` VARCHAR(60) NULL,
    `ruta` VARCHAR(100) NULL,
    `icono` VARCHAR(60) NULL,
    `ambito_acceso` VARCHAR(15) NULL,
    `mostrar_en_menu` BOOLEAN NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nacionalidad` (
    `id_nacionalidad` INTEGER NOT NULL AUTO_INCREMENT,
    `cod_plame` VARCHAR(4) NULL,
    `pais` VARCHAR(50) NULL,

    UNIQUE INDEX `nacionalidad_cod_plame_key`(`cod_plame`),
    PRIMARY KEY (`id_nacionalidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfil` (
    `perfil_codigo` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil_nombre` VARCHAR(100) NULL,
    `descripcion` VARCHAR(200) NULL,
    `icono` VARCHAR(20) NULL,
    `estado_registro` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`perfil_codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persona` (
    `nro_documento` VARCHAR(20) NOT NULL,
    `id_tipo_documento` INTEGER NOT NULL,
    `id_tipo_persona` INTEGER NOT NULL,
    `razon_social` VARCHAR(70) NOT NULL,
    `nombres` VARCHAR(30) NULL,
    `apellido_paterno` VARCHAR(25) NULL,
    `apellido_materno` VARCHAR(25) NULL,
    `fecha_nacimiento` DATE NULL,
    `sexo` VARCHAR(1) NULL,
    `codigo_ubigeo` VARCHAR(6) NULL,
    `id_nacionalidad` INTEGER NULL,
    `estado_registro` BOOLEAN NOT NULL DEFAULT true,
    `usuario_creador` VARCHAR(20) NULL,
    `usuario_modificador` VARCHAR(20) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`nro_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id_tipo_documento` INTEGER NOT NULL AUTO_INCREMENT,
    `des_tipo_documento` VARCHAR(35) NULL,
    `id_tipo_persona` INTEGER NULL,

    PRIMARY KEY (`id_tipo_documento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_persona` (
    `id_tipo_persona` INTEGER NOT NULL AUTO_INCREMENT,
    `des_tipo_persona` VARCHAR(10) NULL,

    PRIMARY KEY (`id_tipo_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ubigeo` (
    `codigo_ubigeo` VARCHAR(6) NOT NULL,
    `distrito` VARCHAR(50) NULL,
    `provincia` VARCHAR(50) NULL,
    `departamento` VARCHAR(50) NULL,
    `cod_distrito` VARCHAR(2) NULL,
    `cod_provincia` VARCHAR(2) NULL,
    `cod_departamento` VARCHAR(2) NULL,

    PRIMARY KEY (`codigo_ubigeo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cuenta_usuario` ADD CONSTRAINT `cuenta_usuario_nro_documento_fkey` FOREIGN KEY (`nro_documento`) REFERENCES `persona`(`nro_documento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cuenta_usuario` ADD CONSTRAINT `cuenta_usuario_perfil_codigo_fkey` FOREIGN KEY (`perfil_codigo`) REFERENCES `perfil`(`perfil_codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lista_menu` ADD CONSTRAINT `lista_menu_menu_codigo_fkey` FOREIGN KEY (`menu_codigo`) REFERENCES `menu_acceso`(`menu_codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lista_menu` ADD CONSTRAINT `lista_menu_perfil_codigo_fkey` FOREIGN KEY (`perfil_codigo`) REFERENCES `perfil`(`perfil_codigo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persona` ADD CONSTRAINT `persona_codigo_ubigeo_fkey` FOREIGN KEY (`codigo_ubigeo`) REFERENCES `ubigeo`(`codigo_ubigeo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persona` ADD CONSTRAINT `persona_id_nacionalidad_fkey` FOREIGN KEY (`id_nacionalidad`) REFERENCES `nacionalidad`(`id_nacionalidad`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persona` ADD CONSTRAINT `persona_id_tipo_documento_fkey` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id_tipo_documento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `persona` ADD CONSTRAINT `persona_id_tipo_persona_fkey` FOREIGN KEY (`id_tipo_persona`) REFERENCES `tipo_persona`(`id_tipo_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tipo_documento` ADD CONSTRAINT `tipo_documento_id_tipo_persona_fkey` FOREIGN KEY (`id_tipo_persona`) REFERENCES `tipo_persona`(`id_tipo_persona`) ON DELETE SET NULL ON UPDATE CASCADE;
