import { productos as fotos } from '@/lib/assets'

const destacados = [
  { img: fotos.bloque, name: 'Bloque de hormigón' },
  { img: fotos.gero, name: 'Gero de hormigón' },
  { img: fotos.bovedilla, name: 'Bovedilla' },
  { img: fotos.semivigueta, name: 'Semivigueta armada' },
  { img: fotos.dintel, name: 'Dintel' },
  { img: fotos.placaTejado, name: 'Placa de tejado' },
  { img: fotos.ferralla, name: 'Ferralla' },
  { img: fotos.dados, name: 'Dados antivehículo' },
]

const categories = [
  {
    id: 'forjados',
    title: 'Forjados y estructura',
    icon: '🏗️',
    items: ['Forjados de diferentes tipos','Semivigueta armada','Bovedillas de hormigón','Bovedillas de arlita','Bovedillas de porexpán','Bovedillas para vigueta pretensada','Planchas bajo jácena de porexpán (rotura de puente térmico)','Casetón reticular de hormigón','Casetón reticular de arlita','Casetón reticular de porexpán','Viguetas tubulares','Placas alveolares','Vigas para placa de valla'],
  },
  {
    id: 'albanileria',
    title: 'Albañilería y bloques',
    icon: '🧱',
    items: ['Bloques de hormigón prensado','Gero de hormigón','Placas de tejado','Placas de valla','Dados de hormigón antivehículo','Piezas de contrapeso'],
  },
  {
    id: 'hierro',
    title: 'Hierro y ferralla',
    icon: '⚙️',
    items: ['Hierro para forjado','Ferralla','Celosía electrosoldada','Mallazo electrosoldado'],
  },
  {
    id: 'accesorios',
    title: 'Accesorios',
    icon: '🔧',
    items: ['Separadores de plástico para forjado','Separadores de plástico para losas'],
  },
]

export default function ProductosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-300/15 px-3 py-1 rounded-full mb-4">Catálogo completo</span>
          <h1 className="text-4xl font-black mb-4">Nuestros productos</h1>
          <p className="text-white/70 text-lg">Todo lo que necesitas para el forjado y la tabiquería. Suministro directo con Marcado CE.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {destacados.map(p => (
              <div key={p.name} className="group rounded-xl overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="px-3 py-2.5 text-center text-sm font-semibold text-gray-700">{p.name}</div>
              </div>
            ))}
          </div>

          <div className="space-y-14">
            {categories.map(cat => (
              <div key={cat.id} id={cat.id}>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-blue-50">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">{cat.icon}</div>
                  <h2 className="text-xl font-black text-gray-900">{cat.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.items.map(item => (
                    <div key={item} className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:border-[#1a56db] hover:bg-blue-50 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#1a56db] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1341a8] to-[#1a56db] py-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">¿Necesitas presupuesto?</h2>
            <p className="text-blue-100 text-lg">Cuéntanos tu proyecto y te damos precio sin compromiso.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/contacto" className="px-7 py-3.5 bg-white text-[#1a56db] font-semibold rounded-lg hover:bg-gray-100 transition-colors">Solicitar presupuesto</a>
            <a href="https://wa.me/34678379129" target="_blank" rel="noopener" className="px-7 py-3.5 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
