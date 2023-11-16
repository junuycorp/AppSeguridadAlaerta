-- AlterTable
ALTER TABLE `cuenta_usuario` MODIFY `correo` VARCHAR(35) NULL,
    MODIFY `numero_celular` VARCHAR(11) NULL;

-- AlterTable
ALTER TABLE `menu_acceso` ADD COLUMN `estado_registro` BOOLEAN NOT NULL DEFAULT true;
