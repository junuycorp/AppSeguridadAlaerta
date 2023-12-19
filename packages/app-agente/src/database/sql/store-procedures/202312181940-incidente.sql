-- Conteo de tipo incidentes por centro poblado
DROP PROCEDURE IF EXISTS spu_conteo_incidentes;
CREATE PROCEDURE spu_conteo_incidentes(IN centro_poblado_id INT)
BEGIN
  SELECT
    i.id_tipo_incidente as idTipoIncidente,
    ti.nombre AS nombreTipo,
    COUNT(i.id_tipo_incidente) AS cantidad
  FROM
    incidente i
    INNER JOIN tipo_incidente ti ON ti.id_tipo_incidente = i.id_tipo_incidente
  WHERE
    (centro_poblado_id = 0 AND i.id_centro_poblado IS NULL)
    OR (centro_poblado_id = -1 OR i.id_centro_poblado = centro_poblado_id)
  GROUP BY
    i.id_tipo_incidente;
END;
