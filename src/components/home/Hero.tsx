import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  const go = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  return <section className="hero">
    <img className="hero-bg" src="https://images.unsplash.com/photo-1769353785928-e6ccc4b9e635?auto=format&fit=crop&w=1800&q=90" alt="Componentes de una PC gaming iluminados en azul" />
    <div className="hero-shade" />
    <div className="hero-copy">
      <span className="hero-label">NUEVA GENERACIÓN · SERIE RTX 40</span>
      <h1>Potencia para<br />lo que viene.</h1>
      <p>Hardware elegido para crear, competir y llevar tus ideas más lejos.</p>
      <div className="hero-actions">
        <Button onClick={() => go("#featured")}>Explorar productos <Icon name="arrow" size={18} /></Button>
        <Button variant="secondary" onClick={() => go("#offers")}>Ver ofertas</Button>
      </div>
    </div>
    <div className="hero-meta"><span>PIXTECH SELECT</span><span>01 / 03</span></div>
  </section>;
}
