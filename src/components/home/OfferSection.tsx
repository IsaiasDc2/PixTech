import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function OfferSection() {
  return <section className="offer-section" id="offers">
    <div className="offer-copy">
      <span className="eyebrow light">PIXTECH WEEK</span>
      <h2>Menos espera.<br />Más rendimiento.</h2>
      <p>Precios especiales en una selección de componentes y periféricos. Promociones sujetas a disponibilidad.</p>
      <Button variant="secondary">Descubrir ofertas <Icon name="arrow" size={18} /></Button>
    </div>
    <div className="offer-stat"><strong>12</strong><span>cuotas<br />disponibles*</span></div>
    <p className="offer-note">*Según producto y medio de pago seleccionado.</p>
  </section>;
}
