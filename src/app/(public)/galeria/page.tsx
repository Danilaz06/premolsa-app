import { createClient } from '@/lib/supabase/server'
import GaleriaGrid from './GaleriaGrid'

export const metadata = {
  title: 'Galería – PREMOLSA',
  description: 'Instalaciones, fábrica y proceso de fabricación de PREMOLSA en Zaragoza.',
}

export default async function GaleriaPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('gallery').select('*').order('order')

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-green-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-300 bg-green-300/15 px-3 py-1 rounded-full mb-4">Instalaciones</span>
          <h1 className="text-4xl font-black mb-4">Galería</h1>
          <p className="text-white/70 text-lg">Conoce nuestras instalaciones y proceso de fabricación.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <GaleriaGrid items={items ?? []} />
        </div>
      </section>
    </>
  )
}
