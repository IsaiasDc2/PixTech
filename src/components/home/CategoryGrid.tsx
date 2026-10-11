import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/ui/SectionTitle";
import { categories, categoryPills } from "@/data/catalog";

export default function CategoryGrid() {
  return <section className="section category-section" id="categories">
    <SectionTitle eyebrow="Encontrá tu categoría" title="Todo lo que tu setup necesita." action={<Link className="text-link" to="/productos">Ver todas <Icon name="arrow" size={17} /></Link>} />
    <div className="category-grid">
      {categories.map((c, i) => <Link className={`category-card category-${i + 1}`} to={`/productos?categoria=${c.slug}`} key={c.title}>
        <img src={c.image} alt="" loading="lazy" />
        <div><span>0{i + 1}</span><h3>{c.title}</h3><i><Icon name="arrow" size={18} /></i></div>
      </Link>)}
    </div>
    <div className="category-pills">
      {categoryPills.map((item) => <Link to={`/productos?q=${encodeURIComponent(item)}`} key={item}>{item}<Icon name="arrow" size={16} /></Link>)}
    </div>
  </section>;
}
