# PixTech · Base de datos (Supabase) — igual esquema que HefestoTech

## Orden de aplicación (SQL Editor → New query → Run, en este orden)

En un proyecto **nuevo y vacío**:

1. `001_productos.sql` — `categorias`, `productos`, RLS lectura pública, bucket `productos`, seed 54 productos
2. `002_ordenes.sql` — `ordenes`, `orden_items` (RLS: cada usuario ve las suyas)
3. `003_negocio.sql` — `perfiles` (+ trigger auto-creación), `proveedores`, `producto_proveedor`, `movimientos_stock`, `favoritos`
4. `004_admin_roles.sql` — columna `perfiles.rol` + `is_admin()` / `has_permission()` v1 + escritura admin
5. `005_admin_infra.sql` — matriz `admin_permisos`, `audit_log`, `producto_lotes`, `notificaciones`, `buscar_productos()` (pg_trgm+unaccent), `cupones` + `aplicar_cupon()`, `cambiar_estado_pedido()`, `adjust_stock()`, `banners`, `reclamos`, `envios`, `whatsapp_cfg`
6. `005_product_specs.sql` — `product_specs` (specs verificadas para el Armador)
7. `006_checkout_servidor.sql` — checkout vigente: invitados (`user_id` nullable), columnas `mp_*`, `costo_envio_centavos`, `expira_at`, `acceso_token`; `eventos_webhook(fuente,evento_id)` + `comprobantes` 006
8. `006_specs_iniciales.sql` — specs inferidas (`verified=false`, idempotente por `ON CONFLICT`)
9. `007_nuevos_productos.sql` — productos + specs adicionales
10. `007_test_admin.sql` — solo agrega columnas `is_test_user` / `expires_at` (sin datos de prueba)

## ⚠️ NO aplicar `004_checkout_real.sql`

Es el checkout **legacy**: crea `eventos_webhook` y `comprobantes` con columnas
incompatibles con las que escribe `checkout_api.py` (`total_centavos`, `mp_payment_id`,
`fuente/evento_id`). Como ambos archivos usan `create table if not exists`, aplicar
004 antes que 006 dejaría las tablas con forma vieja y el webhook fallaría.
006 lo reemplaza por completo. Se conserva el archivo solo como referencia.

## Verificación

```sql
select table_name from information_schema.tables
where table_schema = 'public' order by 1;
-- Debe listar: admin_permisos, audit_log, banners, categorias, comprobantes,
-- cupones, envios, eventos_webhook, movimientos_stock, notificaciones, ordenes,
-- orden_items, perfiles, producto_lotes, producto_proveedor, product_specs,
-- productos, proveedores, reclamos (+ pedido_history si aplica)

select count(*) from productos;      -- 54 + nuevos de 007
select count(*) from product_specs;  -- > 0
```

Lectura pública (sin login) debe funcionar — es lo que usa el front sin Supabase configurado:

```
GET {SUPABASE_URL}/rest/v1/productos?select=*&activo=eq.true&limit=1
GET {SUPABASE_URL}/rest/v1/categorias?select=*
```
(con header `apikey: {ANON_KEY}`)

## Diferencia con HefestoTech

Mismo esquema y mismos seeds. Único cambio de código: `backend/comprobantes.py`
lee el esquema 006 vigente (HefestoTech lo tenía apuntando a columnas del 004
legacy que ya no se escriben: `numero`, `emitido_en`, `items_snapshot`,
`documento`, `provincia`).
