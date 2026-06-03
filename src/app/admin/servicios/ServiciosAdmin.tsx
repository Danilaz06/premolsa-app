'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react'
import type { Service } from '@/lib/types'

interface Props { services: Service[] }
const empty = { title: '', description: '', icon: '', order: 0, visible: true }

export default function ServiciosAdmin({ services: initial }: Props) {
  const [services, setServices] = useState(initial)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const openNew = () => { setForm(empty); setEditing(null); setOpen(true) }
  const openEdit = (s: Service) => {
    setForm({ title: s.title, description: s.description, icon: s.icon ?? '', order: s.order, visible: s.visible })
    setEditing(s.id); setOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { title: form.title, description: form.description, icon: form.icon || null, order: Number(form.order), visible: form.visible }
    if (editing) {
      await supabase.from('services').update(payload).eq('id', editing)
    } else {
      await supabase.from('services').insert(payload)
    }
    setOpen(false); setLoading(false); router.refresh()
    const { data } = await supabase.from('services').select('*').order('order')
    if (data) setServices(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return
    await supabase.from('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const toggleVisible = async (s: Service) => {
    await supabase.from('services').update({ visible: !s.visible }).eq('id', s.id)
    setServices(prev => prev.map(x => x.id === s.id ? { ...x, visible: !x.visible } : x))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Servicios</h1>
          <p className="text-gray-500 text-sm">{services.length} servicios</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#1a56db] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1341a8]">
          <Plus size={16} /> Añadir servicio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(s => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4">
            {s.icon && <span className="text-2xl">{s.icon}</span>}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900">{s.title}</div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.description}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => toggleVisible(s)} className={`p-1.5 rounded-lg ${s.visible ? 'text-green-600' : 'text-gray-400'}`}>{s.visible ? <Eye size={16}/> : <EyeOff size={16}/>}</button>
              <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-[#1a56db] rounded-lg"><Pencil size={16}/></button>
              <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-lg">{editing ? 'Editar servicio' : 'Nuevo servicio'}</h2>
              <button onClick={() => setOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción *</label>
                <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] resize-none" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Icono (emoji)</label>
                  <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="🏗️" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Orden</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="vis" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} className="w-4 h-4" />
                <label htmlFor="vis" className="text-sm font-medium text-gray-700">Visible</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-semibold text-gray-600">Cancelar</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">{loading ? 'Guardando…' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
