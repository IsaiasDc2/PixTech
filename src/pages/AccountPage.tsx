import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { products } from "@/data/catalog";
import useCartStore from "@/store/cartStore";
import useFavoritesStore from "@/store/favoritesStore";

export default function AccountPage() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "cuenta";
  const ids = useFavoritesStore((s) => s.ids);
  const agregar = useCartStore((s) => s.agregarAlCarrito);
  const favs = products.filter((p) => ids.includes(p.id));

  return <section className="section">
    <h1>Mi cuenta</h1>
    <div className="builder-tabs" style={{ maxWidth: 480 }}>
      {[["cuenta", "Cuenta"], ["favoritos", "Favoritos"], ["pedidos", "Pedidos"]].map(([v, l]) =>
        <button key={v} className={tab === v ? "active" : ""} onClick={() => setParams({ tab: v })}>{l}</button>)}
    </div>
    {tab === "favoritos" && <>
      {favs.length === 0 ? <p>Todavía no guardaste favoritos.</p> :
        <div className="product-grid">{favs.map((p) => <ProductCard key={p.id} product={p} onAdd={() => agregar(p)} />)}</div>}
    </>}
    {tab === "cuenta" && <p>Iniciá sesión con Supabase para ver tu perfil. Configurá <code>VITE_SUPABASE_URL</code> en <code>.env.local</code>.</p>}
    {tab === "pedidos" && <p>Tus pedidos aparecerán acá cuando completes una compra con Mercado Pago.</p>}
    <div style={{ marginTop: 24 }}><Button variant="ghost" onClick={() => setParams({ tab: "favoritos" })}>Ver favoritos ({ids.length})</Button></div>
  </section>;
}
