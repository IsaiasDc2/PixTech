import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "search" | "user" | "heart" | "bag" | "menu" | "close" | "arrow"
  | "chevron" | "truck" | "shield" | "card" | "headset" | "refresh"
  | "cpu" | "check" | "plus" | "minus" | "trash" | "send";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    shield: <path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Zm-3 9 2 2 4-5" />,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 14h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8a7 7 0 0 1 11.5-2L20 8M4 16l2.4 2a7 7 0 0 0 11.5-2" /></>,
    cpu: <><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M9 2v3m3-3v3m3-3v3M9 19v3m3-3v3m3-3v3M2 9h3m-3 3h3m-3 3h3m14-6h3m-3 3h3m-3 3h3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    send: <><path d="m21 3-7 18-4-7-7-4 18-7Z" /><path d="m10 14 4-4" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", className = "", onClick, ariaLabel }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "icon";
  className?: string; onClick?: () => void; ariaLabel?: string;
}) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} aria-label={ariaLabel}>{children}</button>;
}

function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="section-title">
    <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
    {action}
  </div>;
}

const categories = [
  { title: "Placas de video", image: "https://images.unsplash.com/photo-1555618254-84e2cf498b01?auto=format&fit=crop&w=700&q=85" },
  { title: "Procesadores", image: "https://images.unsplash.com/photo-1739168283356-d1b9bd1c0954?auto=format&fit=crop&w=700&q=85" },
  { title: "Motherboards", image: "https://images.unsplash.com/photo-1613483187550-1458bbdb0996?auto=format&fit=crop&w=700&q=85" },
  { title: "Gaming", image: "https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=700&q=85" },
];

const products = [
  { id: 1, brand: "ASUS", name: "GeForce RTX 4070 Super Dual OC", specs: "12GB GDDR6X · PCIe 4.0 · DLSS 3", price: 899999, old: 969999, installments: "12 cuotas de $108.749", stock: "En stock", image: "https://images.unsplash.com/photo-1555618254-84e2cf498b01?auto=format&fit=crop&w=700&q=90" },
  { id: 2, brand: "AMD", name: "Ryzen 7 7800X3D AM5", specs: "8 núcleos · 16 hilos · hasta 5.0GHz", price: 649990, installments: "6 cuotas de $129.998", stock: "Stock inmediato", image: "https://images.unsplash.com/photo-1739168283356-d1b9bd1c0954?auto=format&fit=crop&w=700&q=90" },
  { id: 3, brand: "ASUS", name: "ROG Strix B650E-F Gaming WiFi", specs: "AM5 · DDR5 · WiFi 6E · PCIe 5.0", price: 429999, installments: "12 cuotas de $51.958", stock: "En stock", image: "https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&w=700&q=90" },
  { id: 4, brand: "NVIDIA", name: "GeForce RTX 4080 Founders Edition", specs: "16GB GDDR6X · Ray tracing · DLSS 3", price: 1499990, installments: "6 cuotas de $299.998", stock: "Últimas unidades", image: "https://images.unsplash.com/photo-1669480380840-d638e8d28f4b?auto=format&fit=crop&w=700&q=90" },
];

const formatPrice = (value: number) => `$ ${value.toLocaleString("es-AR")}`;

function ProductCard({ product, favorite, onFavorite, onAdd }: {
  product: typeof products[number]; favorite: boolean; onFavorite: () => void; onAdd: () => void;
}) {
  return <article className="product-card">
    <div className="product-image">
      {product.old && <span className="discount">-7%</span>}
      <Button variant="icon" className={favorite ? "is-favorite" : ""} onClick={onFavorite} ariaLabel="Guardar en favoritos">
        <Icon name="heart" />
      </Button>
      <img src={product.image} alt={product.name} />
    </div>
    <div className="product-content">
      <span className="brand">{product.brand}</span>
      <h3>{product.name}</h3>
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

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 });
  const [builder, setBuilder] = useState("Rendimiento");

  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((item) => item.id === Number(id));
    return sum + (product?.price ?? 0) * qty;
  }, 0), [cart]);

  const addToCart = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    setCartOpen(true);
  };
  const updateCart = (id: number, amount: number) => {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] ?? 0) + amount };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  return <div className="app">
    <div className="announcement">Envíos a todo el país · Asesoramiento especializado</div>
    <header className="header">
      <div className="header-inner">
        <button className="mobile-trigger" onClick={() => setMobileMenu(true)} aria-label="Abrir menú"><Icon name="menu" /></button>
        <a className="logo" href="#top" aria-label="Pixtech inicio">PIX<span>TECH</span><i /></a>
        <nav className="desktop-nav">
          <a href="#top">Inicio</a>
          <button onClick={() => setCategoryMenu(!categoryMenu)}>Productos <Icon name="chevron" size={15} /></button>
          <a href="#categories">Componentes</a>
          <a href="#featured">Gaming</a>
          <a href="#featured">Periféricos</a>
          <a className="nav-accent" href="#offers">Ofertas</a>
        </nav>
        <button className="search-trigger" onClick={() => setSearchOpen(true)}><Icon name="search" /><span>Buscar productos, marcas...</span><kbd>⌘ K</kbd></button>
        <div className="header-actions">
          <Button variant="icon" ariaLabel="Mi cuenta"><Icon name="user" /></Button>
          <Button variant="icon" ariaLabel="Favoritos"><Icon name="heart" /><span className="desktop-only">{favorites.length || ""}</span></Button>
          <Button variant="icon" onClick={() => setCartOpen(true)} ariaLabel="Carrito"><Icon name="bag" /><span className="count">{count}</span></Button>
        </div>
      </div>
      {categoryMenu && <div className="mega-menu">
        <div><span className="eyebrow">Explorá por categoría</span><h3>Todo para tu próximo equipo.</h3></div>
        {["Componentes", "Computación", "Gaming", "Accesorios"].map((group, index) =>
          <a key={group} href="#categories" onClick={() => setCategoryMenu(false)}><Icon name={index === 0 ? "cpu" : index === 1 ? "refresh" : index === 2 ? "headset" : "arrow"} /><span>{group}<small>Ver productos</small></span><Icon name="arrow" size={18} /></a>
        )}
      </div>}
    </header>

    <main id="top">
      <section className="hero">
        <img className="hero-bg" src="https://images.unsplash.com/photo-1769353785928-e6ccc4b9e635?auto=format&fit=crop&w=1800&q=90" alt="Componentes de una PC gaming iluminados en azul" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="hero-label">NUEVA GENERACIÓN · SERIE RTX 40</span>
          <h1>Potencia para<br />lo que viene.</h1>
          <p>Hardware elegido para crear, competir y llevar tus ideas más lejos.</p>
          <div className="hero-actions">
            <Button onClick={() => document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" })}>Explorar productos <Icon name="arrow" size={18} /></Button>
            <Button variant="secondary" onClick={() => document.querySelector("#offers")?.scrollIntoView({ behavior: "smooth" })}>Ver ofertas</Button>
          </div>
        </div>
        <div className="hero-meta"><span>PIXTECH SELECT</span><span>01 / 03</span></div>
      </section>

      <section className="section category-section" id="categories">
        <SectionTitle eyebrow="Encontrá tu categoría" title="Todo lo que tu setup necesita." action={<a className="text-link" href="#featured">Ver todas <Icon name="arrow" size={17} /></a>} />
        <div className="category-grid">
          {categories.map((category, index) => <a className={`category-card category-${index + 1}`} href="#featured" key={category.title}>
            <img src={category.image} alt="" />
            <div><span>0{index + 1}</span><h3>{category.title}</h3><i><Icon name="arrow" size={18} /></i></div>
          </a>)}
        </div>
        <div className="category-pills">
          {["Memorias RAM", "SSD y almacenamiento", "Notebooks", "Monitores"].map((item) => <a href="#featured" key={item}>{item}<Icon name="arrow" size={16} /></a>)}
        </div>
      </section>

      <section className="section products-section" id="featured">
        <SectionTitle eyebrow="Selección Pixtech" title="Elegí tu próximo upgrade." action={<div className="slider-buttons"><Button variant="icon" ariaLabel="Anterior">←</Button><Button variant="icon" ariaLabel="Siguiente">→</Button></div>} />
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)}
            onFavorite={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}
            onAdd={() => addToCart(product.id)} />)}
        </div>
      </section>

      <section className="offer-section" id="offers">
        <div className="offer-copy">
          <span className="eyebrow light">PIXTECH WEEK</span>
          <h2>Menos espera.<br />Más rendimiento.</h2>
          <p>Precios especiales en una selección de componentes y periféricos. Promociones sujetas a disponibilidad.</p>
          <Button variant="secondary">Descubrir ofertas <Icon name="arrow" size={18} /></Button>
        </div>
        <div className="offer-stat"><strong>12</strong><span>cuotas<br />disponibles*</span></div>
        <p className="offer-note">*Según producto y medio de pago seleccionado.</p>
      </section>

      <section className="section builder-section">
        <div className="builder-head">
          <div><span className="eyebrow">Configurador inteligente</span><h2>Armá tu PC.<br />A tu manera.</h2></div>
          <p>Elegí cada componente y nosotros te ayudamos a comprobar que todo funcione en conjunto.</p>
        </div>
        <div className="builder-layout">
          <div className="builder-options">
            <div className="builder-tabs">
              {["Esencial", "Rendimiento", "Extremo"].map((item) => <button className={builder === item ? "active" : ""} onClick={() => setBuilder(item)} key={item}>{item}</button>)}
            </div>
            {["Procesador", "Motherboard", "Memoria RAM", "Tarjeta gráfica", "Almacenamiento", "Fuente y gabinete"].map((item, index) =>
              <button className="component-row" key={item}>
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
            <Button>Continuar configuración <Icon name="arrow" size={18} /></Button>
            <Button variant="ghost">Guardar configuración</Button>
          </aside>
        </div>
      </section>

      <section className="benefits">
        {[
          ["card", "Pagos protegidos", "Operaciones procesadas de forma segura."],
          ["shield", "Garantía oficial", "Según las condiciones de cada producto."],
          ["truck", "Envíos nacionales", "Opciones calculadas según tu código postal."],
          ["headset", "Asesoramiento real", "Especialistas para ayudarte a elegir."],
        ].map(([icon, title, text]) => <div className="benefit" key={title}>
          <Icon name={icon as IconName} size={25} /><div><h3>{title}</h3><p>{text}</p></div>
        </div>)}
      </section>
    </main>

    <footer>
      <div className="footer-main">
        <div className="footer-brand"><a className="logo light-logo" href="#top">PIX<span>TECH</span><i /></a><p>Tecnología que acompaña tus ideas.</p><div className="socials"><span>IG</span><span>YT</span><span>X</span></div></div>
        {[
          ["Productos", "Componentes", "Notebooks", "Monitores", "Periféricos"],
          ["Ayuda", "Preguntas frecuentes", "Envíos y entregas", "Garantías", "Devoluciones"],
          ["Pixtech", "Quiénes somos", "Contacto", "Términos", "Privacidad"],
        ].map(([title, ...links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.map((link) => <a href="#top" key={link}>{link}</a>)}</div>)}
        <div className="newsletter"><h3>Recibí novedades.</h3><p>Productos, lanzamientos y oportunidades seleccionadas.</p><div><input aria-label="Email" placeholder="tu@email.com" /><Button variant="icon" ariaLabel="Suscribirme"><Icon name="arrow" /></Button></div><small>Al suscribirte aceptás nuestra política de privacidad.</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Pixtech. Todos los derechos reservados.</span><span>Diseñado para quienes piden más.</span></div>
    </footer>

    {mobileMenu && <div className="fullscreen-panel">
      <div className="panel-head"><a className="logo" href="#top">PIX<span>TECH</span><i /></a><Button variant="icon" onClick={() => setMobileMenu(false)} ariaLabel="Cerrar"><Icon name="close" /></Button></div>
      <nav>{["Inicio", "Productos", "Componentes", "Gaming", "Periféricos", "Ofertas"].map((item, index) => <a href={index ? "#featured" : "#top"} onClick={() => setMobileMenu(false)} key={item}><span>0{index + 1}</span>{item}<Icon name="arrow" /></a>)}</nav>
    </div>}

    {searchOpen && <div className="overlay" onMouseDown={() => setSearchOpen(false)}>
      <div className="search-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="search-input"><Icon name="search" size={24} /><input autoFocus placeholder="¿Qué estás buscando?" /><Button variant="icon" onClick={() => setSearchOpen(false)} ariaLabel="Cerrar"><Icon name="close" /></Button></div>
        <div className="search-body"><span className="eyebrow">Búsquedas populares</span>{["RTX 4070 Super", "Ryzen 7", "Monitor 144 Hz", "SSD NVMe"].map((item) => <button key={item}><Icon name="arrow" size={16} />{item}</button>)}</div>
      </div>
    </div>}

    {cartOpen && <div className="overlay" onMouseDown={() => setCartOpen(false)}>
      <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-head"><div><span className="eyebrow">Tu selección</span><h2>Carrito <small>({count})</small></h2></div><Button variant="icon" onClick={() => setCartOpen(false)} ariaLabel="Cerrar carrito"><Icon name="close" /></Button></div>
        <div className="cart-items">
          {Object.entries(cart).length === 0 ? <div className="empty"><Icon name="bag" size={42} /><h3>Tu carrito está vacío</h3><p>Descubrí productos elegidos para tu próximo setup.</p><Button onClick={() => setCartOpen(false)}>Explorar productos</Button></div> :
            Object.entries(cart).map(([id, qty]) => {
              const product = products.find((item) => item.id === Number(id))!;
              return <div className="cart-item" key={id}><img src={product.image} alt="" /><div><span>{product.brand}</span><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong><div className="quantity"><button onClick={() => updateCart(product.id, -1)}><Icon name="minus" size={15} /></button><span>{qty}</span><button onClick={() => updateCart(product.id, 1)}><Icon name="plus" size={15} /></button><button className="remove" onClick={() => updateCart(product.id, -qty)}><Icon name="trash" size={16} /></button></div></div></div>;
            })}
        </div>
        {count > 0 && <div className="cart-total"><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><p>El envío se calcula en el siguiente paso.</p><Button>Continuar compra <Icon name="arrow" size={18} /></Button><Button variant="ghost" onClick={() => setCartOpen(false)}>Seguir comprando</Button></div>}
      </aside>
    </div>}

    <button className={`support-trigger ${supportOpen ? "open" : ""}`} onClick={() => setSupportOpen(!supportOpen)} aria-label="Abrir soporte"><Icon name={supportOpen ? "close" : "headset"} /></button>
    {supportOpen && <aside className="support-panel">
      <div className="support-head"><span><i /> Soporte en línea</span><h3>Hola, ¿cómo podemos ayudarte?</h3></div>
      <div className="support-links">{["Seguir mi pedido", "Consulta sobre un producto", "Envíos y devoluciones"].map((item) => <button key={item}>{item}<Icon name="arrow" size={17} /></button>)}</div>
      <div className="support-message"><input placeholder="Escribí tu consulta..." aria-label="Consulta" /><Button variant="icon" ariaLabel="Enviar"><Icon name="send" size={18} /></Button></div>
    </aside>}
  </div>;
}

export default App;
