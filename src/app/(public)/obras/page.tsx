import Link from 'next/link'
import { obras } from '@/lib/assets'
import { MapPin } from 'lucide-react'

export const metadata = {
  title: 'Obras y proyectos – PREMOLSA',
  description: 'Algunas de las obras y promociones en las que PREMOLSA ha suministrado prefabricados de hormigón en Zaragoza y Aragón.',
}

export default function ObrasPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-300/15 px-3 py-1 rounded-full mb-4">Proyectos</span>
          <h1 className="text-4xl font-black mb-4">Obras realizadas</h1>
          <p className="text-white/70 text-lg">Más de medio siglo suministrando prefabricados de hormigón a las principales promociones de Zaragoza y Aragón.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {obras.map(obra => (
              <article key={obra.title} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={obra.img} alt={obra.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-2.5 py-1 rounded-full mb-3">{obra.type}</span>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{obra.title}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={14} /> {obra.location}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-3">¿Tu obra es la siguiente?</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">Te asesoramos en el cálculo de estructuras y te suministramos el material en obra al ritmo que necesites.</p>
            <Link href="/contacto" className="inline-block px-7 py-3.5 bg-[#1a56db] text-white font-semibold rounded-lg hover:bg-[#1341a8] transition-colors">
              Solicitar presupuesto
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
