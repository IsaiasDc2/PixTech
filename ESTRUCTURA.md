# PixTech — Ecommerce (diseño PixTech + componentes HefestoTech)

## Estructura

```
PixTech/
  backend/               # FastAPI (copia de hefestotech/backend, renombrado a PixTech)
    main.py              # App + CORS (5173 + 8443) + /api/chat (asistente Pix)
    admin_api.py         # Panel /api/admin/* (productos, stock, pedidos, reclamos, cupones, banners…)
    checkout_api.py      # Checkout servidor + webhook Mercado Pago
    comprobantes.py      # Comprobante + PDF
    pagos_mp.py          # Legacy de referencia
    requirements.txt
    .env.example
    README.md
  src/                   # Frontend React 19 + TS + Router + Zustand (diseño PixTech intacto)
    App.tsx              # Router (/, /productos, /producto/:id, /carrito, /checkout, /cuenta, /armar, /admin…)
    main.tsx             # BrowserRouter
    index.css            # Diseño PixTech (tokens --blue #175cff, Inter+Manrope) + estilos de páginas nuevas
    data/catalog.ts      # Productos + categorías (fallback local si no hay Supabase)
    lib/format.ts        # formatPrice es-AR + normalizeText
    lib/supabaseClient.ts# Cliente Supabase (usa .env.local, error claro si falta)
    store/cartStore.ts   # = hefestotech cartStore.js (persist pixtech-carrito + drawer)
    store/favoritesStore.ts # Favoritos persistentes
    services/productService.ts # = hefestotech (Supabase con fallback local)
    services/orderService.ts   # = hefestotech (checkout servidor, nunca precios del cliente)
    components/ui/       # Icon, Button, SectionTitle (estética PixTech original)
    components/layout/   # Layout, Header, Footer, CartDrawer, SearchModal, SupportWidget
    components/product/  # ProductCard (diseño PixTech + fav + link a detalle)
    components/home/     # Hero, CategoryGrid, OfferSection, BuilderSection
    pages/               # Home, Catalog (filtros+q+categoría+ofertas+orden), ProductDetail,
                         # Cart (umbral envío gratis $150k), Checkout (servidor+MP),
                         # Account (favoritos), Builder (wizard 6 pasos), Admin (resumen API), Info
  .env.example           # VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_API_URL
```

## Qué se copió de hefestotech

- Backend completo: mismos endpoints, modelos, dinero en centavos, envío gratis ≥$150k, webhook HMAC + idempotencia, rate-limits, RLS por JWT.
- Frontend: rutas (`App.jsx` → `App.tsx`), `cartStore` (persist + drawer), `productService`/`orderService`, catálogo con búsqueda/filtros/orden, detalle, carrito lateral + página, checkout servidor con validación `esUrlMP`, cuenta/favoritos, armador (wizard), admin (resumen de endpoints), asistente `/api/chat` en el widget de soporte.
- Lo que NO se copió: el tema oscuro HefestoTech (índigo/latón/Oswald). Se respetó el diseño PixTech claro (azul #175cff, Manrope, cards blancas, radius 20px).

## Run

Frontend:
```bash
npm install
npm run dev   # puerto 8443 (ver vite.config.ts)
```

Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Env:
- Frontend: copiar `.env.example` a `.env.local` (Supabase + `VITE_API_URL=http://127.0.0.1:8000`).
- Backend: copiar `backend/.env.example` a `backend/.env` (Supabase service_role solo acá, MP tokens, `FRONTEND_URL=http://localhost:8443`).

## Verificado

- `npm run build` ✓ (Vite 8, 100 módulos)
- `python -m py_compile` backend ✓
