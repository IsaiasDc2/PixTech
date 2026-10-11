export interface Product {
  id: number;
  brand: string;
  name: string;
  nombre?: string;
  marca?: string;
  categoria?: string;
  categorySlug?: string;
  specs: string;
  price: number;
  precio?: number;
  old?: number | null;
  precio_con_descuento?: number | null;
  descuento_porcentaje?: number;
  installments: string;
  stock: string;
  stockCount?: number;
  image: string;
  imagen?: string;
  destacado?: boolean;
  envio_gratis?: boolean;
}

export interface Category {
  title: string;
  slug: string;
  image: string;
}

export const categories: Category[] = [
  { title: "Placas de video", slug: "placas-de-video", image: "https://images.unsplash.com/photo-1555618254-84e2cf498b01?auto=format&fit=crop&w=700&q=85" },
  { title: "Procesadores", slug: "procesadores", image: "https://images.unsplash.com/photo-1739168283356-d1b9bd1c0954?auto=format&fit=crop&w=700&q=85" },
  { title: "Motherboards", slug: "motherboards", image: "https://images.unsplash.com/photo-1613483187550-1458bbdb0996?auto=format&fit=crop&w=700&q=85" },
  { title: "Gaming", slug: "gaming", image: "https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=700&q=85" },
];

export const categoryPills = ["Memorias RAM", "SSD y almacenamiento", "Notebooks", "Monitores"];

export const products: Product[] = [
  { id: 1, brand: "ASUS", name: "GeForce RTX 4070 Super Dual OC", specs: "12GB GDDR6X · PCIe 4.0 · DLSS 3", price: 899999, old: 969999, installments: "12 cuotas de $108.749", stock: "En stock", stockCount: 12, categorySlug: "placas-de-video", categoria: "Placas de video", destacado: true, image: "https://images.unsplash.com/photo-1555618254-84e2cf498b01?auto=format&fit=crop&w=700&q=90" },
  { id: 2, brand: "AMD", name: "Ryzen 7 7800X3D AM5", specs: "8 núcleos · 16 hilos · hasta 5.0GHz", price: 649990, installments: "6 cuotas de $129.998", stock: "Stock inmediato", stockCount: 8, categorySlug: "procesadores", categoria: "Procesadores", destacado: true, image: "https://images.unsplash.com/photo-1739168283356-d1b9bd1c0954?auto=format&fit=crop&w=700&q=90" },
  { id: 3, brand: "ASUS", name: "ROG Strix B650E-F Gaming WiFi", specs: "AM5 · DDR5 · WiFi 6E · PCIe 5.0", price: 429999, installments: "12 cuotas de $51.958", stock: "En stock", stockCount: 15, categorySlug: "motherboards", categoria: "Motherboards", image: "https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&w=700&q=90" },
  { id: 4, brand: "NVIDIA", name: "GeForce RTX 4080 Founders Edition", specs: "16GB GDDR6X · Ray tracing · DLSS 3", price: 1499990, installments: "6 cuotas de $299.998", stock: "Últimas unidades", stockCount: 3, categorySlug: "placas-de-video", categoria: "Placas de video", destacado: true, image: "https://images.unsplash.com/photo-1669480380840-d638e8d28f4b?auto=format&fit=crop&w=700&q=90" },
  { id: 5, brand: "Corsair", name: "Vengeance DDR5 32GB 6000MHz", specs: "2x16GB · CL30 · XMP 3.0", price: 189999, installments: "12 cuotas de $22.958", stock: "En stock", stockCount: 20, categorySlug: "gaming", categoria: "Memorias RAM", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=700&q=90" },
  { id: 6, brand: "Samsung", name: "990 Pro 2TB NVMe Gen4", specs: "7450 MB/s · PCIe 4.0 · TLC", price: 249990, installments: "12 cuotas de $30.208", stock: "En stock", stockCount: 18, categorySlug: "gaming", categoria: "SSD y almacenamiento", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=700&q=90" },
  { id: 7, brand: "Logitech", name: "G Pro X Superlight 2", specs: "61g · HERO2 · 32K DPI · Wireless", price: 199999, installments: "6 cuotas de $39.999", stock: "En stock", stockCount: 25, categorySlug: "gaming", categoria: "Periféricos", destacado: true, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=90" },
  { id: 8, brand: "LG", name: "UltraGear 27\" QHD 165Hz", specs: "Nano IPS · 1ms · HDR10 · G-Sync", price: 549999, old: 599999, installments: "12 cuotas de $66.458", stock: "En stock", stockCount: 6, categorySlug: "gaming", categoria: "Monitores", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=90" },
];

export const popularSearches = ["RTX 4070 Super", "Ryzen 7", "Monitor 144 Hz", "SSD NVMe"];

export const getProduct = (id: number | string) =>
  products.find((p) => p.id === Number(id));

export const priceOf = (p: Product) => p.precio_con_descuento ?? p.price ?? p.precio ?? 0;
