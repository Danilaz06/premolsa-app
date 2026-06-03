'use client'
import { useState } from 'react'

const photos = [
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110329.jpg', alt: 'Instalaciones exteriores' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110418.jpg', alt: 'Exterior de la fábrica' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110528.jpg', alt: 'Prefabricados de hormigón' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_110851.jpg', alt: 'Zona de fabricación' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111045.jpg', alt: 'Empaquetado de producto' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111248.jpg', alt: 'Zona de empaquetado' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111307.jpg', alt: 'Producto terminado' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111612.jpg', alt: 'Almacén' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111858.jpg', alt: 'Descarga en obra' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_111953.jpg', alt: 'Depósitos' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/20170508_112321.jpg', alt: 'Proceso de soldadura' },
  { src: 'https://premolsa.es/wp-content/uploads/2017/04/satelite-1.jpg', alt: 'Vista aérea instalaciones' },
]

export default function GaleriaPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-300 bg-blue-300/15 px-3 py-1 rounded-full mb-4">Instalaciones</span>
          <h1 className="text-4xl font-black mb-4">Galería</h1>
          <p className="text-white/70 text-lg">Conoce nuestras instalaciones y proceso de fabricación.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="aspect-[4/3] overflow-hidden rounded-xl group block"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <button
            className="absolute left-4 text-white/70 hover:text-white text-4xl"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null) }}
          >
            ‹
          </button>
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-w-[90vw] max-h-[88vh] rounded-lg object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white/70 hover:text-white text-4xl"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % photos.length : null) }}
          >
            ›
          </button>
          <div className="absolute bottom-5 text-white/50 text-sm">{lightbox + 1} / {photos.length} — {photos[lightbox].alt}</div>
        </div>
      )}
    </>
  )
}
