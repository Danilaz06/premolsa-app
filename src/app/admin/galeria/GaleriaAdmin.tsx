'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import FileUpload from '@/components/FileUpload'
import { Trash2, ArrowUp, ArrowDown, ImagePlus, X, Loader2 } from 'lucide-react'
import type { GalleryItem } from '@/lib/types'

export default function GaleriaAdmin({ items: initial }: { items: GalleryItem[] }) {
  const [items, setItems] = useState(initial)
  const [adding, setAdding] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [saving, setSaving] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const supabase = createClient()

  const reload = async () => {
    const { data } = await supabase.from('gallery').select('*').order('order')
    if (data) setItems(data)
  }

  const handleAdd = async () => {
    if (!newUrl) return
    setSaving(true)
    const maxOrder = items.length ? Math.max(...items.map(i => i.order)) : 0
    await supabase.from('gallery').insert({ image_url: newUrl, caption: newCaption || null, order: maxOrder + 1 })
    setNewUrl(''); setNewCaption(''); setAdding(false); setSaving(false)
    reload()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta foto de la galería?')) return
    setBusy(id)
    await supabase.from('gallery').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
    setBusy(null)
  }

  // Intercambia el orden con el vecino (arriba/abajo)
  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const a = items[index]
    const b = items[target]
    setBusy(a.id)
    // Intercambiar valores de order
    await Promise.all([
      supabase.from('gallery').update({ order: b.order }).eq('id', a.id),
      supabase.from('gallery').update({ order: a.order }).eq('id', b.id),
    ])
    const next = [...items]
    next[index] = b
    next[target] = a
    setItems(next)
    setBusy(null)
  }

  const updateCaption = async (id: string, caption: string) => {
    await supabase.from('gallery').update({ caption: caption || null }).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, caption } : i))
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Galería</h1>
          <p className="text-gray-500 text-sm">{items.length} fotos · se muestran en la web por orden</p>
        </div>
        <button onClick={() => setAdding(true)} className="flex items-center justify-center gap-2 bg-[#15803d] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#166534] transition-colors">
          <ImagePlus size={16} /> Añadir foto
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <ImagePlus size={48} className="mx-auto mb-4 opacity-30" />
          <p>Aún no hay fotos en la galería.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img src={item.image_url} alt={item.caption ?? ''} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{i + 1}</span>
                {busy === item.id && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#15803d]" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <input
                  defaultValue={item.caption ?? ''}
                  onBlur={e => updateCaption(item.id, e.target.value)}
                  placeholder="Descripción (opcional)"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-[#15803d]"
                />
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 disabled:opacity-40" title="Subir">
                    <ArrowUp size={14} />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 disabled:opacity-40" title="Bajar">
                    <ArrowDown size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center text-red-500 border border-red-200 rounded-lg py-2 px-3 hover:bg-red-50" title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal añadir */}
      {adding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-lg">Añadir foto a la galería</h2>
              <button onClick={() => setAdding(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <FileUpload bucket="galeria" kind="image" label="Foto de instalaciones" value={newUrl} onChange={setNewUrl} />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción (opcional)</label>
                <input value={newCaption} onChange={e => setNewCaption(e.target.value)} placeholder="Ej. Zona de fabricación" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#15803d]" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setAdding(false)} className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-semibold text-gray-600">Cancelar</button>
                <button onClick={handleAdd} disabled={!newUrl || saving} className="flex-1 bg-[#15803d] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50">
                  {saving ? 'Guardando…' : 'Añadir a la galería'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
