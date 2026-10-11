# PixTech · Backend (FastAPI)

Estructura heredada de HefestoTech, renombrada a PixTech. Sin cambios de lógica.

```
backend/
  main.py          # App FastAPI + CORS + /api/chat + /api/productos (legacy CSV)
  admin_api.py     # Panel admin /api/admin/* + /api/buscar (1075 líneas)
  checkout_api.py  # Checkout servidor + webhook Mercado Pago (878 líneas)
  comprobantes.py  # Comprobante + PDF manual sin deps
  pagos_mp.py      # Módulo legacy de referencia (no lo dupliques)
  requirements.txt # fastapi, httpx, uvicorn, pandas, python-dotenv, google-genai, mercadopago
  .env.example     # Keys a completar (nunca commitear .env real)
```

## Endpoints

- `GET /` → healthcheck
- `POST /api/chat` → asistente Pix (rate 20/min/IP, Gemini opcional)
- `POST /api/checkout/crear` → crea orden (precios/stock desde DB, nunca del cliente)
- `GET /api/checkout/estado/{orden_id}?token=` → estado real
- `POST /api/webhooks/mercadopago` → webhook MP con HMAC + idempotencia
- `POST /api/checkout/liberar-expiradas` → cron cada ~10min (expira 60min)
- `POST /api/checkout/{id}/reintentar` → regenera link de pago
- `GET /api/comprobantes/{id}` + `/pdf` → comprobante con token
- `GET /api/admin/*` → resumen, productos, stock, pedidos, reclamos, cupones, banners, auditoría, reportes
- `GET /api/buscar?q=` → RPC `buscar_productos`

## Dinero

Siempre en **centavos enteros** (`_a_centavos` / `_a_pesos`).
Envío: gratis ≥ $150.000, estándar $5.000, express $12.000.

## Env

Copiar `.env.example` a `.env` y completar:

```
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
MERCADOPAGO_ACCESS_TOKEN, MP_WEBHOOK_SECRET
FRONTEND_URL (http://localhost:8443 en dev PixTech), BACKEND_URL
TIENDA_NOMBRE, TIENDA_CUIT, TIENDA_DIRECCION, TIENDA_EMAIL, TIENDA_TELEFONO
```

## Run

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Migraciones Supabase

Aplicar en orden las de `hefestotech/supabase/migrations/`:
`001_productos` → `002_ordenes` → `003_negocio` → `005_admin_infra` → `006_checkout_servidor` (+ specs).
La `004_checkout_real` queda legacy.

## Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` solo backend, nunca al front.
- Admin valida JWT contra Supabase Auth + rol en `perfiles`, niega por defecto.
- Webhook fail-closed sin `MP_WEBHOOK_SECRET`, verifica `x-signature` HMAC + monto + currency ARS.
