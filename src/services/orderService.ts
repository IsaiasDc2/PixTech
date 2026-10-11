import { supabase } from "@/lib/supabaseClient";

// Copia directa de hefestotech orderService.js → TypeScript.
// El cliente NUNCA envía precios: solo producto_id + cantidad.
const API_BASE = String(
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const sesionToken = async (): Promise<string> => {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? "";
  } catch {
    return "";
  }
};

const backend = async <T>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> => {
  const t = await sesionToken();
  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_BASE}${path}`, {
      method: opts.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
      },
      body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    });
  } catch {
    throw new Error("Sin conexión con el backend.");
  }
  let datos: Record<string, string> = {};
  try {
    datos = await respuesta.json();
  } catch {
    datos = {};
  }
  if (!respuesta.ok) throw new Error(datos?.detail || `Error ${respuesta.status}`);
  return datos as T;
};

export interface CheckoutPayload {
  items: { producto_id: number; cantidad: number }[];
  nombre: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  envio: "estandar" | "express";
  cupon_codigo?: string;
}

export const crearCheckout = (payload: CheckoutPayload) =>
  backend<{ orden_id: string; init_point: string; total_centavos: number; expira_at: string; acceso_token: string }>(
    "/api/checkout/crear",
    { method: "POST", body: payload }
  );

export const obtenerEstadoCheckout = (ordenId: string, accesoToken = "") => {
  const q = accesoToken ? `?token=${encodeURIComponent(accesoToken)}` : "";
  return backend<{ orden_id: string; estado: string; total_centavos: number }>(
    `/api/checkout/estado/${encodeURIComponent(ordenId)}${q}`
  );
};

export const obtenerEstadoPedido = (ordenId: string, token = "") =>
  obtenerEstadoCheckout(ordenId, token).then((o) => ({
    id: o.orden_id,
    total: (o.total_centavos ?? 0) / 100,
    estado: o.estado === "pagada" ? "pagado" : o.estado,
  }));

export const reintentarPago = (ordenId: string, token = "") => {
  const q = token ? `?token=${encodeURIComponent(token)}` : "";
  return backend<{ init_point: string }>(
    `/api/checkout/${encodeURIComponent(ordenId)}/reintentar${q}`,
    { method: "POST" }
  ).then((d) => ({ link_pago: d.init_point }));
};

export const esUrlMP = (url: string) => {
  try {
    const u = new URL(url);
    return /mercadopago\.com(\.ar)?$|mercadolibre\.com$/.test(u.hostname) && u.protocol === "https:";
  } catch {
    return false;
  }
};
