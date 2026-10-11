import { Link, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";
import { getProduct, products } from "@/data/catalog";
import useCartStore from "@/store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProduct(Number(id));
  const agregar = useCartStore((s) => s.agregarAlCarrito);
  if (!product) return <section className="section"><h2>Producto no encontrado</h2><Link to="/productos">Volver al catálogo</Link></section>;

  return <section className="section">
    <p><Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> / {product.name}</p>
    <div className="detail-layout">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="brand">{product.brand}</span>
        <h1>{product.name}</h1>
        <p className="specs">{product.specs}</p>
        <span className="stock"><i />{product.stock}</span>
        <div className="price-wrap">
          {product.old && <del>{formatPrice(product.old)}</del>}
          <strong>{formatPrice(product.price)}</strong>
          <small>{product.installments}</small>
        </div>
        <Button onClick={() => agregar(product)}>Agregar al carrito <Icon name="bag" size={18} /></Button>
      </div>
    </div>
    <h2 style={{ marginTop: 48 }}>También te puede interesar</h2>
    <div className="product-grid">
      {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onAdd={() => agregar(p)} />)}
    </div>
  </section>;
}
