import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import useCartStore from "@/store/cartStore";

const UMBRAL_ENVIO_GRATIS = 150000;

export default function CartPage() {
  const carrito = useCartStore((s) => s.carrito);
  const aumentar = useCartStore((s) => s.aumentarCantidad);
  const disminuir = useCartStore((s) => s.disminuirCantidad);
  const eliminar = useCartStore((s) => s.eliminarDelCarrito);
  const total = useCartStore((s) => s.getTotal());
  const navigate = useNavigate();
  const falta = Math.max(0, UMBRAL_ENVIO_GRATIS - total);

  return <section className="section">
    <h1>Carrito</h1>
    {falta > 0
      ? <p>Te faltan {formatPrice(falta)} para el envío gratis.</p>
      : <p>Tenés envío gratis. 🎉</p>}
    <div className="progress" style={{ maxWidth: 480 }}><i style={{ width: `${Math.min(100, (total / UMBRAL_ENVIO_GRATIS) * 100)}%` }} /></div>
    {carrito.length === 0
      ? <div className="empty"><Icon name="bag" size={42} /><h3>Tu carrito está vacío</h3><Button onClick={() => navigate("/productos")}>Explorar productos</Button></div>
      : <>
        {carrito.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><span>{item.brand}</span><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><div className="quantity"><button onClick={() => disminuir(item.id)}><Icon name="minus" size={15} /></button><span>{item.cantidad}</span><button onClick={() => aumentar(item.id)}><Icon name="plus" size={15} /></button><button className="remove" onClick={() => eliminar(item.id)}><Icon name="trash" size={16} /></button></div></div></div>)}
        <div className="cart-total" style={{ maxWidth: 480 }}><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><Button onClick={() => navigate("/checkout")}>Ir al checkout <Icon name="arrow" size={18} /></Button><Link to="/productos">Seguir comprando</Link></div>
      </>}
  </section>;
}
