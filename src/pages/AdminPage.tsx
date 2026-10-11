export default function AdminPage() {
  return <section className="section">
    <span className="eyebrow">Admin</span>
    <h1>Panel PixTech</h1>
    <p>El panel completo (productos, stock, pedidos, reclamos, cupones, banners, reportes) vive en el backend <code>/api/admin/*</code>.</p>
    <ul>
      <li><code>GET /api/admin/resumen</code> — productos activos, bajo stock, pendientes</li>
      <li><code>CRUD /api/admin/productos</code> — con papelera y lotes</li>
      <li><code>POST /api/admin/stock/ajustar</code> — RPC <code>adjust_stock</code></li>
      <li><code>GET /api/admin/pedidos</code> + cambio de estado con versión optimista</li>
      <li><code>/api/admin/cupones, /banners, /auditoria, /reportes/ventas</code></li>
    </ul>
    <p>Conectá el frontend admin de hefestotech (<code>pages/Admin/</code>) cuando tengas <code>VITE_API_URL</code> + JWT de Supabase con rol owner/admin.</p>
  </section>;
}
