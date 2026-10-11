import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import useCartStore from "@/store/cartStore";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isCartOpen);
  const cerrar = useCartStore((s) => s.cerrarCarrito);
  const carrito = useCartStore((s) => s.carrito);
  const aumentar = useCartStore((s) => s.aumentarCantidad);
  const disminuir = useCartStore((s) => s.disminuirCantidad);
  const eliminar = useCartStore((s) => s.eliminarDelCarrito);
  const total = useCartStore((s) => s.getTotal());
  const count = useCartStore((s) => s.getCantidadTotal());
  const navigate = useNavigate();
  if (!isOpen) return null;

  return <div className="overlay" onMouseDown={cerrar}>
    <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
      <div className="drawer-head"><div><span className="eyebrow">Tu selección</span><h2>Carrito <small>({count})</small></h2></div><Button variant="icon" onClick={cerrar} ariaLabel="Cerrar carrito"><Icon name="close" /></Button></div>
      <div className="cart-items">
        {carrito.length === 0 ? <div className="empty"><Icon name="bag" size={42} /><h3>Tu carrito está vacío</h3><p>Descubrí productos elegidos para tu próximo setup.</p><Button onClick={cerrar}>Explorar productos</Button></div> :
          carrito.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><span>{item.brand}</span><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><div className="quantity"><button onClick={() => disminuir(item.id)}><Icon name="minus" size={15} /></button><span>{item.cantidad}</span><button onClick={() => aumentar(item.id)}><Icon name="plus" size={15} /></button><button className="remove" onClick={() => eliminar(item.id)}><Icon name="trash" size={16} /></button></div></div></div>)}
      </div>
      {count > 0 && <div className="cart-total"><div><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p>El envío se calcula en el siguiente paso.</p><Button onClick={() => { cerrar(); navigate("/checkout"); }}>Continuar compra <Icon name="arrow" size={18} /></Button><Button variant="ghost" onClick={cerrar}>Seguir comprando</Button></div>}
      <Link to="/carrito" onClick={cerrar} className="text-link" style={{ marginTop: 12 }}>Ver carrito completo</Link>
    </aside>
  </div>;
}
