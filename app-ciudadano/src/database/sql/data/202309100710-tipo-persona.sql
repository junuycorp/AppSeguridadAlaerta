SET IDENTITY_INSERT dbo.tipo_persona ON 

INSERT INTO dbo.tipo_persona 
(id_tipo_persona, des_tipo_persona) VALUES
(1, 'NATURAL'),
(2, 'JURIDICA');

SET IDENTITY_INSERT dbo.tipo_persona OFF
