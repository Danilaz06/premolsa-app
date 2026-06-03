import Link from 'next/link'

const timeline = [
  { year: '1967', title: 'Fundación de PREMOLSA', desc: 'Nace Prefabricados y Moldeados S.A. en Zaragoza, pionera en la fabricación de vigas y bovedillas de hormigón en Aragón.' },
  { year: '80s', title: 'Expansión del catálogo', desc: 'Ampliamos la gama con bloques de hormigón, ferralla y accesorios para cubrir todas las necesidades de la obra.' },
  { year: '90s', title: 'Modernización', desc: 'Inversión en maquinaria y procesos de fabricación para aumentar capacidad y mejorar la calidad del producto.' },
  { year: 'CE', title: 'Marcado CE', desc: 'Obtenemos la certificación de Marcado CE, cumpliendo con todas las exigencias de la normativa europea de construcción.' },
  { year: 'Hoy', title: '+55 años de experiencia', desc: 'Seguimos en Zaragoza con el mismo compromiso de calidad y servicio personalizado.' },
]

export default function EmpresaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-300/15 px-3 py-1 rounded-full mb-4">Quiénes somos</span>
          <h1 className="text-4xl font-black mb-4">Nuestra empresa</h1>
          <p className="text-white/70 text-lg">Más de 55 años fabricando prefabricados de hormigón con calidad y servicio cercano.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-5">Pioneros desde 1967</h2>
              <p className="text-gray-600 leading-relaxed mb-4">PREMOLSA nació en Zaragoza en 1967 con una visión clara: fabricar prefabricados de hormigón de calidad superior a un precio justo. Fuimos pioneros en la fabricación de vigas y bovedillas en Aragón.</p>
              <p className="text-gray-600 leading-relaxed mb-4">A lo largo de estos años hemos crecido junto a nuestros clientes —constructores, promotores, albañiles y almacenes de construcción— adaptándonos a sus necesidades.</p>
              <p className="text-gray-600 leading-relaxed">Hoy ofrecemos un catálogo completo que abarca todos los elementos necesarios para el forjado y la tabiquería, con suministro directo en obra.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src="https://premolsa.es/wp-content/uploads/2017/04/premolsa-prefabricados-1-0.jpg" alt="PREMOLSA" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src="https://premolsa.es/wp-content/uploads/2017/04/20170508_110418.jpg" alt="Exterior fábrica" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-black text-gray-900 mb-5">Marcado CE y cálculo de estructuras</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Todos nuestros productos cumplen con la normativa europea de Marcado CE, garantizando estándares de seguridad y calidad que protegen al constructor y al usuario final.</p>
              <p className="text-gray-600 leading-relaxed">Además, ofrecemos un servicio personalizado de cálculo de estructuras: analizamos las necesidades de tu obra y recomendamos la solución óptima.</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-3 py-1 rounded-full mb-3">Historia</span>
              <h2 className="text-3xl font-black text-gray-900">Nuestra trayectoria</h2>
            </div>
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#1a56db] text-white flex items-center justify-center font-black text-xs flex-shrink-0">{item.year}</div>
                  <div className="pt-2">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1341a8] to-[#1a56db] py-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">¿Tienes un proyecto?</h2>
            <p className="text-blue-100 text-lg">Contacta y te ayudamos a calcular lo que necesitas.</p>
          </div>
          <Link href="/contacto" className="px-7 py-3.5 bg-white text-[#1a56db] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Solicitar presupuesto
          </Link>
        </div>
      </section>
    </>
  )
}
