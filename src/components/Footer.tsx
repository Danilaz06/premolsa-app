import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="inline-block bg-white rounded-lg px-4 py-3 mb-4">
              <img src="/logo-premolsa-opt.png" alt="PREMOLSA" className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-4">Prefabricados y Moldeados S.L.<br />Fabricantes de hormigón desde 1967.</p>
            <a
              href="https://wa.me/34678379129"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-[#25d366] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1db954] transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {[['/', 'Inicio'], ['/empresa', 'Nuestra empresa'], ['/productos', 'Productos'], ['/obras', 'Obras'], ['/galeria', 'Galería'], ['/contacto', 'Contacto']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Productos</h4>
            <ul className="space-y-2.5">
              {[['Forjados y estructura', '#forjados'], ['Albañilería y bloques', '#albanileria'], ['Hierro y ferralla', '#hierro'], ['Accesorios', '#accesorios']].map(([label, hash]) => (
                <li key={hash}><Link href={`/productos${hash}`} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Contacto</h4>
            <address className="not-italic space-y-3 text-sm">
              <p>Camino Vado s/n, esq. Ronda Hispanidad<br />50014 Zaragoza</p>
              <p><a href="tel:976292347" className="hover:text-white transition-colors">976 292 347</a></p>
              <p><a href="mailto:angelpremolsa@hotmail.com" className="hover:text-white transition-colors">angelpremolsa@hotmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">&copy; 2024 PREMOLSA – Prefabricados y Moldeados S.L.</p>
          <nav className="flex gap-5 items-center">
            {[['Aviso legal', '/aviso-legal'], ['Privacidad', '/politica-privacidad'], ['Cookies', '/politica-cookies']].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{label}</Link>
            ))}
            <Link href="/login" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/30">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Área clientes
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
