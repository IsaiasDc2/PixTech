import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { products } from "@/data/catalog";
import { normalizeText } from "@/lib/format";
import useCartStore from "@/store/cartStore";

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const [orden, setOrden] = useState("relevancia");
  const q = params.get("q") ?? "";
  const categoria = params.get("categoria") ?? "";
  const soloOfertas = params.get("ofertas") === "1";
  const agregar = useCartStore((s) => s.agregarAlCarrito);

  const lista = useMemo(() => {
    let out = [...products];
    if (soloOfertas) out = out.filter((p) => p.old);
    if (categoria) out = out.filter((p) => p.categorySlug === categoria || p.categoria === categoria);
    if (q) {
      const n = normalizeText(q);
      out = out.filter((p) => normalizeText(`${p.brand} ${p.name} ${p.specs}`).includes(n));
    }
    if (orden === "menor") out.sort((a, b) => a.price - b.price);
    if (orden === "mayor") out.sort((a, b) => b.price - a.price);
    return out;
  }, [q, categoria, soloOfertas, orden]);

  return <section className="section products-section">
    <SectionTitle eyebrow="Catálogo" title={soloOfertas ? "Ofertas Pixtech." : "Todos los productos."} />
    <div className="catalog-filters">
      <input placeholder="Buscar…" value={q} onChange={(e) => setParams((p) => { const n = new URLSearchParams(p); e.target.value ? n.set("q", e.target.value) : n.delete("q"); return n; })} aria-label="Buscar" />
      <select value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar">
        <option value="relevancia">Relevancia</option>
        <option value="menor">Menor precio</option>
        <option value="mayor">Mayor precio</option>
      </select>
      <span>{lista.length} productos</span>
      {(q || categoria || soloOfertas) && <button onClick={() => setParams({})}>Limpiar</button>}
    </div>
    <div className="product-grid">
      {lista.map((p) => <ProductCard key={p.id} product={p} onAdd={() => agregar(p)} />)}
    </div>
    {lista.length === 0 && <p>No encontramos productos con esos filtros.</p>}
  </section>;
}
