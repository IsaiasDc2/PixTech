import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { popularSearches } from "@/data/catalog";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const go = (term: string) => {
    onClose();
    navigate(`/productos?q=${encodeURIComponent(term)}`);
  };
  return <div className="overlay" onMouseDown={onClose}>
    <div className="search-modal" onMouseDown={(e) => e.stopPropagation()}>
      <form className="search-input" onSubmit={(e) => { e.preventDefault(); go(q); }}>
        <Icon name="search" size={24} />
        <input autoFocus placeholder="¿Qué estás buscando?" value={q} onChange={(e) => setQ(e.target.value)} />
        <Button variant="icon" onClick={onClose} ariaLabel="Cerrar"><Icon name="close" /></Button>
      </form>
      <div className="search-body"><span className="eyebrow">Búsquedas populares</span>{popularSearches.map((item) => <button key={item} onClick={() => go(item)}><Icon name="arrow" size={16} />{item}</button>)}</div>
    </div>
  </div>;
}
