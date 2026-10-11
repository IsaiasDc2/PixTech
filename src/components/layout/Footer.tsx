import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  return <footer>
    <div className="footer-main">
      <div className="footer-brand"><Link className="logo light-logo" to="/">PIX<span>TECH</span><i /></Link><p>Tecnología que acompaña tus ideas.</p><div className="socials"><span>IG</span><span>YT</span><span>X</span></div></div>
      {[
        ["Productos", "Componentes", "Notebooks", "Monitores", "Periféricos"],
        ["Ayuda", "Preguntas frecuentes", "Envíos y entregas", "Garantías", "Devoluciones"],
        ["Pixtech", "Quiénes somos", "Contacto", "Términos", "Privacidad"],
      ].map(([title, ...links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.map((link) => <Link to="/" key={link}>{link}</Link>)}</div>)}
      <div className="newsletter"><h3>Recibí novedades.</h3><p>Productos, lanzamientos y oportunidades seleccionadas.</p><div><input aria-label="Email" placeholder="tu@email.com" /><Button variant="icon" ariaLabel="Suscribirme"><Icon name="arrow" /></Button></div><small>Al suscribirte aceptás nuestra política de privacidad.</small></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Pixtech. Todos los derechos reservados.</span><span>Diseñado para quienes piden más.</span></div>
  </footer>;
}
