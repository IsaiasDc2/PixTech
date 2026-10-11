import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/catalog";
import useFavoritesStore from "@/store/favoritesStore";

export default function ProductCard({ product, onAdd }: {
  product: Product; onAdd: () => void;
}) {
  const favorite = useFavoritesStore((s) => s.esFavorito(product.id));
  const alternar = useFavoritesStore((s) => s.alternar);
  return <article className="product-card">
    <div className="product-image">
      {product.old && <span className="discount">-7%</span>}
      <Button variant="icon" className={favorite ? "is-favorite" : ""} onClick={() => alternar(product.id)} ariaLabel="Guardar en favoritos">
        <Icon name="heart" />
      </Button>
      <Link to={`/producto/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
    </div>
    <div className="product-content">
      <span className="brand">{product.brand}</span>
      <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
      <p className="specs">{product.specs}</p>
      <span className="stock"><i />{product.stock}</span>
      <div className="price-wrap">
        {product.old && <del>{formatPrice(product.old)}</del>}
        <strong>{formatPrice(product.price)}</strong>
        <small>{product.installments}</small>
      </div>
      <Button onClick={onAdd}>Agregar al carrito <Icon name="bag" size={18} /></Button>
    </div>
  </article>;
}
