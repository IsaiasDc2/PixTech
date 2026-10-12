-- PixTech · 008_indices.sql
-- Índice compuesto para GET /api/admin/productos
-- (backend/admin_api.py:listar_productos):
--   WHERE deleted_at IS NULL [AND nombre ILIKE '%q%']
--   ORDER BY nombre ASC LIMIT x OFFSET y
--
-- ORDEN CORRECTO: igualdad primero (deleted_at), después la columna del
-- ORDER BY (nombre). El planner recorre solo las filas visibles ya en
-- orden de nombre: sin nodo Sort y con LIMIT/OFFSET baratos.
-- También sirve a papelera=true
-- (WHERE deleted_at IS NOT NULL ... ORDER BY nombre ASC).
-- El filtro ILIKE '%q%' (comodín inicial) no usa btree; para eso ya existe
-- idx_productos_nombre_trgm (GIN trigram). Este índice cubre filtro+orden.
--
-- NOTA: btree indexa NULLs, así que `deleted_at IS NULL` sí usa el índice.

create index if not exists idx_productos_admin_lista
  on productos (deleted_at, nombre);

analyze productos;

-- ============ VERIFICACIÓN (solo lectura) ============
-- explain (costs off)
-- select * from productos
-- where deleted_at is null
-- order by nombre asc limit 50 offset 0;
-- Debe mostrar "Index Scan using idx_productos_admin_lista" y NO un nodo Sort.
