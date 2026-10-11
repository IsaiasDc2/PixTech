import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { products, type Product } from "@/data/catalog";

// Misma API que hefestotech productService.js.
// Si Supabase no está configurado, usa el catálogo local (PixTech design intacto).
export const normalizarProducto = (p: Record<string, unknown> = {}): Product => {
  const precio = Number((p.precio ?? p.price ?? 0) as number);
  const descuento = Number((p.descuento_porcentaje ?? 0) as number);
  const conDescuento =
    p.precio_con_descuento != null
      ? Number(p.precio_con_descuento)
      : descuento > 0
        ? Math.round(precio * (1 - descuento / 100))
        : precio;
  return {
    id: Number(p.id),
    brand: String(p.marca ?? p.brand ?? ""),
    name: String(p.nombre ?? p.name ?? ""),
    specs: String(p.specs ?? p.descripcion ?? ""),
    price: precio,
    old: (p.old as number | undefined) ?? null,
    precio_con_descuento: conDescuento,
    descuento_porcentaje: descuento,
    installments: String(p.installments ?? p.cuotas_texto ?? ""),
    stock: Number(p.stock ?? 0) > 0 ? "En stock" : "Sin stock",
    stockCount: Number(p.stock ?? 0),
    image: String(p.imagen ?? p.image ?? ""),
    categoria: String(p.categoria ?? "General"),
    destacado: Boolean(p.destacado),
    envio_gratis: Boolean(p.envio_gratis),
  };
};

export const precioFinal = (producto: Partial<Product> = {}) => {
  if (producto.precio_con_descuento != null) return Number(producto.precio_con_descuento);
  const descuento = Number(producto.descuento_porcentaje ?? 0);
  const precio = Number(producto.price ?? producto.precio ?? 0);
  if (descuento > 0) return Math.round(precio * (1 - descuento / 100));
  return precio;
};

export const obtenerProductos = async (): Promise<Product[]> => {
  if (!isSupabaseConfigured) return products;
  const { data, error } = await supabase.from("productos").select("*").eq("activo", true);
  if (error) throw new Error(error.message);
  const lista = (Array.isArray(data) ? data : []).map(normalizarProducto);
  return lista.length ? lista : products;
};

export const obtenerProductoPorId = async (id: number | string): Promise<Product> => {
  if (!isSupabaseConfigured) {
    const local = products.find((p) => p.id === Number(id));
    if (!local) throw new Error("Producto no encontrado");
    return local;
  }
  const { data, error } = await supabase.from("productos").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return normalizarProducto(data);
};

export const buscarProductos = async (query: string): Promise<Product[]> => {
  const q = String(query ?? "").replace(/[%_,*()"'\\;!]/g, "").trim();
  if (!q) return obtenerProductos();
  if (!isSupabaseConfigured) {
    const n = q.toLowerCase();
    return products.filter((p) =>
      `${p.brand} ${p.name} ${p.specs}`.toLowerCase().includes(n)
    );
  }
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .or(`nombre.ilike.%${q}%,descripcion.ilike.%${q}%,marca.ilike.%${q}%`);
  if (error) throw new Error(error.message);
  return (Array.isArray(data) ? data : []).map(normalizarProducto);
};
