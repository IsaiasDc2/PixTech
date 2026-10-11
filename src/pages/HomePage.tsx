import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import OfferSection from "@/components/home/OfferSection";
import BuilderSection, { benefitItems } from "@/components/home/BuilderSection";
import Icon from "@/components/ui/Icon";
import { products } from "@/data/catalog";
import useCartStore from "@/store/cartStore";

export default function HomePage() {
  const agregar = useCartStore((s) => s.agregarAlCarrito);
  return <>
    <Hero />
    <CategoryGrid />
    <section className="section products-section" id="featured">
      <SectionTitle eyebrow="Selección Pixtech" title="Elegí tu próximo upgrade." action={<div className="slider-buttons"><Button variant="icon" ariaLabel="Anterior">←</Button><Button variant="icon" ariaLabel="Siguiente">→</Button></div>} />
      <div className="product-grid">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onAdd={() => agregar(p)} />)}
      </div>
      <div style={{ marginTop: 24 }}><Link className="text-link" to="/productos">Ver catálogo completo <Icon name="arrow" size={17} /></Link></div>
    </section>
    <OfferSection />
    <BuilderSection />
    <section className="benefits">
      {benefitItems.map(([icon, title, text]) => <div className="benefit" key={title}>
        <Icon name={icon} size={25} /><div><h3>{title}</h3><p>{text}</p></div>
      </div>)}
    </section>
  </>;
}
