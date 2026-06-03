import Link from 'next/link'

const features = [
  {
    icon: '⭐',
    title: 'Pioneros desde 1967',
    desc: 'Más de 55 años como especialistas en prefabricados de hormigón en Aragón.',
  },
  {
    icon: '✅',
    title: 'Marcado CE garantizado',
    desc: 'Todos nuestros productos cumplen la normativa europea de Marcado CE.',
  },
  {
    icon: '📐',
    title: 'Cálculo de estructuras',
    desc: 'Servicio personalizado de cálculo y asesoramiento técnico para tu obra.',
  },
  {
    icon: '💶',
    title: 'Precio competitivo',
    desc: 'Calidad de fabricante directo. Suministro en obra a tu ritmo.',
  },
]

const products = [
  {
    title: 'Forjados y estructura',
    img: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110528.jpg',
    items: ['Semivigueta armada', 'Bovedillas de hormigón, arlita y porexpán', 'Placas alveolares', 'Casetón reticular', 'Viguetas tubulares'],
    href: '/productos#forjados',
  },
  {
    title: 'Albañilería y bloques',
    img: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110851.jpg',
    items: ['Bloques de hormigón prensado', 'Gero de hormigón', 'Placas de tejado o valla', 'Dados antivehículo', 'Piezas de contrapeso'],
    href: '/productos#albanileria',
  },
  {
    title: 'Hierro y ferralla',
    img: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_112321.jpg',
    items: ['Hierro para forjado', 'Ferralla', 'Celosía electrosoldada', 'Mallazo electrosoldado'],
    href: '/productos#hierro',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src="https://premolsa.es/wp-content/uploads/2017/04/20170508_111612.jpg"
          alt="Instalaciones PREMOLSA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/60 to-blue-900/50" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 text-white">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/90 bg-white/15 border border-white/25 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Desde 1967 · Zaragoza
          </span>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.08] mb-6 max-w-2xl">
            Prefabricados de hormigón con{' '}
            <span className="text-blue-300">55 años de experiencia</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">
            Pioneros en vigas y bovedillas. Suministro en obra adaptado a tus ritmos,
            cálculo de estructuras personalizado y Marcado CE garantizado.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/contacto" className="px-7 py-3.5 bg-[#1a56db] text-white font-semibold rounded-lg hover:bg-[#1341a8] transition-colors text-base">
              Solicitar presupuesto
            </Link>
            <Link href="/productos" className="px-7 py-3.5 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-base">
              Ver productos
            </Link>
          </div>

          <div className="flex flex-wrap gap-10 pt-8 border-t border-white/20">
            {[{v:'+55', l:'años de experiencia'},{v:'CE',l:'Marcado CE'},{v:'100%',l:'Servicio personalizado'}].map(s => (
              <div key={s.v} className="flex flex-col">
                <strong className="text-3xl font-black">{s.v}</strong>
                <span className="text-sm text-white/65 mt-1">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-3 py-1 rounded-full mb-3">Nuestros valores</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">¿Por qué elegir PREMOLSA?</h2>
            <p className="text-gray-500 text-lg">Más de medio siglo fabricando prefabricados de hormigón con calidad, rigor y servicio cercano.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="border border-gray-200 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="text-3xl mb-5">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-3 py-1 rounded-full mb-3">Catálogo</span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Nuestros productos</h2>
            <p className="text-gray-500 text-lg">Todo lo que necesitas para el forjado y la tabiquería de tu obra en un solo lugar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {products.map(p => (
              <article key={p.title} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-7">
                  <h3 className="font-bold text-lg mb-4">{p.title}</h3>
                  <ul className="mb-5 space-y-1.5">
                    {p.items.map(i => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a56db] flex-shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <Link href={p.href} className="inline-flex items-center border border-[#1a56db] text-[#1a56db] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Ver más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/productos" className="px-8 py-3.5 bg-[#1a56db] text-white font-semibold rounded-lg hover:bg-[#1341a8] transition-colors">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-3 py-1 rounded-full mb-3">Instalaciones</span>
            <h2 className="text-3xl md:text-4xl font-black">Nuestras instalaciones</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'https://premolsa.es/wp-content/uploads/2017/04/20170508_110329.jpg',
              'https://premolsa.es/wp-content/uploads/2017/04/20170508_110418.jpg',
              'https://premolsa.es/wp-content/uploads/2017/04/20170508_111045.jpg',
              'https://premolsa.es/wp-content/uploads/2017/04/20170508_111858.jpg',
              'https://premolsa.es/wp-content/uploads/2017/04/20170508_111953.jpg',
              'https://premolsa.es/wp-content/uploads/2017/04/satelite-1.jpg',
            ].map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden aspect-[4/3] group">
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/galeria" className="px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#1a56db] hover:text-[#1a56db] transition-colors">
              Ver galería completa
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1341a8] to-[#1a56db] py-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">¿Tienes un proyecto en marcha?</h2>
            <p className="text-blue-100 text-lg">Contacta con nosotros y te ayudamos a calcular lo que necesitas.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contacto" className="px-7 py-3.5 bg-white text-[#1a56db] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Solicitar presupuesto
            </Link>
            <a href="tel:976292347" className="px-7 py-3.5 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              976 292 347
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
