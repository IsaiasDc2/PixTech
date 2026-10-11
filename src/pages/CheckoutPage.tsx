import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { crearCheckout, esUrlMP } from "@/services/orderService";
import useCartStore from "@/store/cartStore";

export default function CheckoutPage() {
  const carrito = useCartStore((s) => s.carrito);
  const vaciar = useCartStore((s) => s.vaciarCarrito);
  const total = useCartStore((s) => s.getTotal());
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", direccion: "", ciudad: "", codigo_postal: "", envio: "estandar" as "estandar" | "express", cupon: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!carrito.length) { setError("El carrito está vacío."); return; }
    setBusy(true);
    try {
      const data = await crearCheckout({
        items: carrito.map((i) => ({ producto_id: i.id, cantidad: i.cantidad })),
        nombre: form.nombre, email: form.email, direccion: form.direccion,
        ciudad: form.ciudad, codigo_postal: form.codigo_postal, envio: form.envio,
        ...(form.cupon ? { cupon_codigo: form.cupon } : {}),
      });
      if (!esUrlMP(data.init_point)) throw new Error("Link de pago inválido.");
      sessionStorage.setItem(`ck_token_${data.orden_id}`, data.acceso_token);
      vaciar();
      window.location.href = data.init_point;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear el checkout.");
    } finally {
      setBusy(false);
    }
  };

  return <section className="section checkout-layout">
    <div>
      <h1>Checkout</h1>
      <p>El total real lo calcula el servidor. Lo que ves acá es estimado.</p>
      <form onSubmit={submit} className="checkout-form">
        <input placeholder="Nombre completo" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
        <input placeholder="Dirección" value={form.direccion} onChange={(e) => set("direccion", e.target.value)} required />
        <input placeholder="Ciudad" value={form.ciudad} onChange={(e) => set("ciudad", e.target.value)} required />
        <input placeholder="Código postal" value={form.codigo_postal} onChange={(e) => set("codigo_postal", e.target.value)} required />
        <select value={form.envio} onChange={(e) => set("envio", e.target.value)} aria-label="Envío">
          <option value="estandar">Envío estándar</option>
          <option value="express">Envío express</option>
        </select>
        <input placeholder="Cupón (opcional)" value={form.cupon} onChange={(e) => set("cupon", e.target.value)} />
        {error && <p role="alert">{error}</p>}
        <Button type="submit">Pagar {formatPrice(total)} <Icon name="arrow" size={18} /></Button>
        <Button variant="ghost" onClick={() => navigate("/carrito")}>Volver al carrito</Button>
      </form>
      {busy && <p>Creando orden en el servidor…</p>}
    </div>
    <aside className="build-summary">
      <div className="summary-top"><span>Resumen</span></div>
      {carrito.map((i) => <div key={i.id} className="summary-line"><span>{i.name} × {i.cantidad}</span><strong>{formatPrice(i.price * i.cantidad)}</strong></div>)}
      <div className="estimated"><span>Total estimado</span><strong>{formatPrice(total)}</strong></div>
    </aside>
  </section>;
}
