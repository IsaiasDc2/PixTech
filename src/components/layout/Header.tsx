import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import useCartStore from "@/store/cartStore";
import useFavoritesStore from "@/store/favoritesStore";

export default function Header({ onSearch }: { onSearch: () => void }) {
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const count = useCartStore((s) => s.carrito.reduce((a, i) => a + i.cantidad, 0));
  const abrirCarrito = useCartStore((s) => s.abrirCarrito);
  const favCount = useFavoritesStore((s) => s.ids.length);
  const navigate = useNavigate();

  return <>
    <div className="announcement">Envíos a todo el país · Asesoramiento especializado</div>
    <header className="header">
      <div className="header-inner">
        <button className="mobile-trigger" onClick={() => setMobileMenu(true)} aria-label="Abrir menú"><Icon name="menu" /></button>
        <Link className="logo" to="/" aria-label="Pixtech inicio">PIX<span>TECH</span><i /></Link>
        <nav className="desktop-nav">
          <Link to="/">Inicio</Link>
          <button onClick={() => setCategoryMenu(!categoryMenu)}>Productos <Icon name="chevron" size={15} /></button>
          <Link to="/productos">Componentes</Link>
          <Link to="/productos?categoria=gaming">Gaming</Link>
          <Link to="/productos">Periféricos</Link>
          <Link className="nav-accent" to="/productos?ofertas=1">Ofertas</Link>
          <Link to="/armar">Armar PC</Link>
        </nav>
        <button className="search-trigger" onClick={onSearch}><Icon name="search" /><span>Buscar productos, marcas...</span><kbd>⌘ K</kbd></button>
        <div className="header-actions">
          <Button variant="icon" ariaLabel="Mi cuenta" onClick={() => navigate("/cuenta")}><Icon name="user" /></Button>
          <Button variant="icon" ariaLabel="Favoritos" onClick={() => navigate("/cuenta?tab=favoritos")}><Icon name="heart" /><span className="desktop-only">{favCount || ""}</span></Button>
          <Button variant="icon" onClick={abrirCarrito} ariaLabel="Carrito"><Icon name="bag" /><span className="count">{count}</span></Button>
        </div>
      </div>
      {categoryMenu && <div className="mega-menu">
        <div><span className="eyebrow">Explorá por categoría</span><h3>Todo para tu próximo equipo.</h3></div>
        {[["Componentes", "cpu", "/productos"], ["Computación", "refresh", "/productos"], ["Gaming", "headset", "/productos?categoria=gaming"], ["Armar PC", "arrow", "/armar"]].map(([group, icon, to]) =>
          <Link key={group} to={to} onClick={() => setCategoryMenu(false)}><Icon name={icon as "cpu"} /><span>{group}<small>Ver productos</small></span><Icon name="arrow" size={18} /></Link>
        )}
      </div>}
    </header>
    {mobileMenu && <div className="fullscreen-panel">
      <div className="panel-head"><Link className="logo" to="/">PIX<span>TECH</span><i /></Link><Button variant="icon" onClick={() => setMobileMenu(false)} ariaLabel="Cerrar"><Icon name="close" /></Button></div>
      <nav>{[["Inicio", "/"], ["Productos", "/productos"], ["Armar PC", "/armar"], ["Carrito", "/carrito"], ["Mi cuenta", "/cuenta"], ["Ofertas", "/productos?ofertas=1"]].map(([label, to], index) => <Link to={to} onClick={() => setMobileMenu(false)} key={label}><span>0{index + 1}</span>{label}<Icon name="arrow" /></Link>)}</nav>
    </div>}
  </>;
}
