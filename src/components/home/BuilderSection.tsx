import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";

const STEPS = ["Procesador", "Motherboard", "Memoria RAM", "Tarjeta gráfica", "Almacenamiento", "Fuente y gabinete"];

export default function BuilderSection() {
  const [builder, setBuilder] = useState("Rendimiento");
  const navigate = useNavigate();
  return <section className="section builder-section">
    <div className="builder-head">
      <div><span className="eyebrow">Configurador inteligente</span><h2>Armá tu PC.<br />A tu manera.</h2></div>
      <p>Elegí cada componente y nosotros te ayudamos a comprobar que todo funcione en conjunto.</p>
    </div>
    <div className="builder-layout">
      <div className="builder-options">
        <div className="builder-tabs">
          {["Esencial", "Rendimiento", "Extremo"].map((item) => <button className={builder === item ? "active" : ""} onClick={() => setBuilder(item)} key={item}>{item}</button>)}
        </div>
        {STEPS.map((item, index) =>
          <button className="component-row" key={item} onClick={() => navigate("/armar")}>
            <span className="component-number">0{index + 1}</span>
            <span><strong>{item}</strong><small>{index < 2 ? "Componente sugerido disponible" : "Elegir componente"}</small></span>
            <Icon name={index < 2 ? "check" : "plus"} />
          </button>
        )}
      </div>
      <aside className="build-summary">
        <div className="summary-top"><span>Tu configuración</span><span className="compatibility"><Icon name="check" size={14} /> Compatible</span></div>
        <div className="pc-visual"><Icon name="cpu" size={80} /><span>PIXTECH / {builder.toUpperCase()}</span></div>
        <div className="summary-line"><span>Componentes seleccionados</span><strong>2 de 8</strong></div>
        <div className="progress"><i /></div>
        <div className="estimated"><span>Total estimado</span><strong>{builder === "Esencial" ? "$ 684.990" : builder === "Extremo" ? "$ 3.849.990" : "$ 1.249.990"}</strong><small>El total se actualiza con tu selección</small></div>
        <Button onClick={() => navigate("/armar")}>Continuar configuración <Icon name="arrow" size={18} /></Button>
        <Button variant="ghost">Guardar configuración</Button>
      </aside>
    </div>
  </section>;
}

export const benefitItems: [IconName, string, string][] = [
  ["card", "Pagos protegidos", "Operaciones procesadas de forma segura."],
  ["shield", "Garantía oficial", "Según las condiciones de cada producto."],
  ["truck", "Envíos nacionales", "Opciones calculadas según tu código postal."],
  ["headset", "Asesoramiento real", "Especialistas para ayudarte a elegir."],
];
