SET IDENTITY_INSERT dbo.perfil ON 
INSERT INTO dbo.perfil
(perfil_codigo,perfil_nombre, descripcion, icono, estado_registro, fecha_creacion, fecha_modificacion) VALUES
  (1,'Usuario', 'Acceso al sistema', null, 1, getdate(), getdate())
SET IDENTITY_INSERT dbo.perfil OFF
