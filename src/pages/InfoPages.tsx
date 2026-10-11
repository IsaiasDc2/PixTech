import { Link } from "react-router-dom";

export function AboutPage() {
  return <section className="section"><h1>Quiénes somos</h1><p>PixTech: tecnología que acompaña tus ideas.</p><Link to="/productos">Ver productos</Link></section>;
}

export function ContactPage() {
  return <section className="section"><h1>Contacto</h1><p>Escribinos: te responde un especialista real.</p></section>;
}

export function NotFoundPage() {
  return <section className="section"><h1>404 — No encontramos esa página</h1><Link to="/">Volver al inicio</Link></section>;
}

export function PaymentResultPage({ tipo }: { tipo: "exito" | "pendiente" | "fallido" }) {
  const titles = { exito: "¡Pago acreditado!", pendiente: "Pago pendiente", fallido: "El pago no se completó" };
  return <section className="section"><h1>{titles[tipo]}</h1><p>Consultá el estado real en <code>/api/checkout/estado/:id</code>.</p><Link to="/">Volver al inicio</Link></section>;
}
