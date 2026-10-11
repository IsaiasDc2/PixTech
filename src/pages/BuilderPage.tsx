import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/catalog";
import useCartStore from "@/store/cartStore";

// Armador simplificado con el diseño PixTech (wizard de 6 pasos).
// El motor completo de compatibilidad vive en hefestotech/src/armador/ (motor.js, adaptar.js).
const STEPS = ["Procesador", "Motherboard", "Memoria RAM", "Tarjeta gráfica", "Almacenamiento", "Fuente y gabinete"];

export default function BuilderPage() {
  const [paso, setPaso] = useState(0);
  const [build, setBuild] = useState<Record<number, number>>({});
  const agregarTodo = useCartStore((s) => s.agregarAlCarrito);

  const elegir = (id: number) => setBuild((b) => ({ ...b, [paso]: id }));
  const elegidos = Object.values(build).map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const total = elegidos.reduce((a, p) => a + p.price, 0);

  return <section className="section">
    <span className="eyebrow">Configurador inteligente</span>
    <h1>Armá tu PC. A tu manera.</h1>
    <p>Paso {paso + 1} de {STEPS.length}: {STEPS[paso]}</p>
    <div className="builder-tabs" style={{ maxWidth: 640 }}>
      {STEPS.map((s, i) => <button key={s} className={paso === i ? "active" : ""} onClick={() => setPaso(i)}>{i + 1}. {s}</button>)}
    </div>
    <div className="product-grid" style={{ marginTop: 24 }}>
      {products.map((p) => <div key={p.id} style={{ outline: build[paso] === p.id ? "2px solid var(--blue)" : "none", borderRadius: 20 }}>
        <ProductCard product={p} onAdd={() => elegir(p.id)} />
      </div>)}
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
      <button className="btn btn-ghost" disabled={paso === 0} onClick={() => setPaso((p) => p - 1)}>Atrás</button>
      {paso < STEPS.length - 1
        ? <button className="btn btn-primary" onClick={() => setPaso((p) => p + 1)}>Siguiente</button>
        : <button className="btn btn-primary" onClick={() => elegidos.forEach(agregarTodo)}>Agregar todo al carrito (${total.toLocaleString("es-AR")})</button>}
    </div>
  </section>;
}
