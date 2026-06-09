'use client'
import { useState } from 'react'
import type { GalleryItem } from '@/lib/types'

export default function GaleriaGrid({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!items.length) {
    return <p className="text-center text-gray-400 py-16">Próximamente fotos de nuestras instalaciones.</p>
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setLightbox(i)}
            className="aspect-[4/3] overflow-hidden rounded-xl group block relative"
          >
            <img src={p.image_url} alt={p.caption ?? ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            {p.caption && (
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium p-3 pt-8 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                {p.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none" onClick={() => setLightbox(null)}>×</button>
          <button className="absolute left-4 text-white/70 hover:text-white text-4xl" onClick={e => { e.stopPropagation(); setLightbox(v => v !== null ? (v - 1 + items.length) % items.length : null) }}>‹</button>
          <img src={items[lightbox].image_url} alt={items[lightbox].caption ?? ''} className="max-w-[90vw] max-h-[88vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 text-white/70 hover:text-white text-4xl" onClick={e => { e.stopPropagation(); setLightbox(v => v !== null ? (v + 1) % items.length : null) }}>›</button>
          {items[lightbox].caption && <div className="absolute bottom-5 text-white/60 text-sm">{items[lightbox].caption}</div>}
        </div>
      )}
    </>
  )
}
