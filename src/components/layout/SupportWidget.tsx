import { useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const API = String((import.meta.env.VITE_API_URL as string | undefined) ?? "http://127.0.0.1:8000").replace(/\/+$/, "");

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const send = async () => {
    const texto = input.trim();
    if (!texto || busy) return;
    setInput("");
    setLog((l) => [...l, `Vos: ${texto}`]);
    setBusy(true);
    try {
      const r = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });
      const d = await r.json();
      setLog((l) => [...l, `Pix: ${d.respuesta ?? "Sin respuesta."}`]);
    } catch {
      setLog((l) => [...l, "Pix: Sin conexión con el backend."]);
    } finally {
      setBusy(false);
    }
  };

  return <>
    <button className={`support-trigger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Abrir soporte"><Icon name={open ? "close" : "headset"} /></button>
    {open && <aside className="support-panel">
      <div className="support-head"><span><i /> Soporte en línea</span><h3>Hola, ¿cómo podemos ayudarte?</h3></div>
      <div className="support-links">{["Seguir mi pedido", "Consulta sobre un producto", "Envíos y devoluciones"].map((item) => <button key={item}>{item}<Icon name="arrow" size={17} /></button>)}</div>
      {log.length > 0 && <div style={{ padding: "0 12px 12px", display: "grid", gap: 6, fontSize: 11 }}>{log.map((m, i) => <div key={i} style={{ background: "#f1f2f4", borderRadius: 8, padding: "8px 10px" }}>{m}</div>)}</div>}
      <div className="support-message"><input placeholder="Escribí tu consulta..." aria-label="Consulta" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} /><Button variant="icon" ariaLabel="Enviar" onClick={send}><Icon name="send" size={18} /></Button></div>
    </aside>}
  </>;
}
