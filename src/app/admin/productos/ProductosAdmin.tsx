'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react'
import type { Product, Category } from '@/lib/types'
import PdfViewer from '@/components/PdfViewer'

interface Props { products: Product[]; categories: Category[] }

const emptyForm = { name: '', slug: '', description: '', category_id: '', image_url: '', pdf_url: '', visible: true, specs: '{}' }

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

export default function ProductosAdmin({ products: initial, categories }: Props) {
  const [products, setProducts] = useState(initial)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); setError('') }
  const openEdit = (p: Product) => {
    setForm({ name: p.name, slug: p.slug, description: p.description ?? '', category_id: p.category_id, image_url: p.image_url ?? '', pdf_url: p.pdf_url ?? '', visible: p.visible, specs: JSON.stringify(p.specs ?? {}, null, 2) })
    setEditing(p.id); setOpen(true); setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    let specs: Record<string,string> = {}
    try { specs = JSON.parse(form.specs) } catch { setError('El campo Especificaciones no es JSON válido.'); setLoading(false); return }

    const payload = { name: form.name, slug: form.slug || slugify(form.name), description: form.description || null, category_id: form.category_id, image_url: form.image_url || null, pdf_url: form.pdf_url || null, visible: form.visible, specs }

    if (editing) {
      const { error: err } = await supabase.from('products').update(payload).eq('id', editing)
      if (err) { setError(err.message); setLoading(false); return }
    } else {
      const { error: err } = await supabase.from('products').insert(payload)
      if (err) { setError(err.message); setLoading(false); return }
    }
    setOpen(false); setLoading(false); router.refresh()
    // optimistic update
    const { data } = await supabase.from('products').select('*, category:categories(name)').order('name')
    if (data) setProducts(data as Product[])
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const toggleVisible = async (p: Product) => {
    await supabase.from('products').update({ visible: !p.visible }).eq('id', p.id)
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, visible: !x.visible } : x))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Productos</h1>
          <p className="text-gray-500 text-sm">{products.length} productos en total</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#1a56db] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1341a8] transition-colors">
          <Plus size={16} /> Añadir producto
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Categoría</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">PDF</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Visible</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} className={`border-b border-gray-100 ${i%2===0?'bg-white':'bg-gray-50/50'}`}>
                <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-5 py-3 text-gray-500">{(p as any).category?.name ?? '—'}</td>
                <td className="px-5 py-3">
                  {p.pdf_url ? <PdfViewer url={p.pdf_url} title={p.name} variant="compact" label="Ver PDF" /> : <span className="text-xs text-gray-400">—</span>}
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => toggleVisible(p)} className={`p-1.5 rounded-lg transition-colors ${p.visible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                    {p.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </td>
                <td className="px-5 py-3 flex items-center gap-1 justify-end">
                  <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-lg">{editing ? 'Editar producto' : 'Nuevo producto'}</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] font-mono" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
                <select required value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]">
                  <option value="">Seleccionar…</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL imagen</label>
                <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL PDF (Supabase Storage)</label>
                <input value={form.pdf_url} onChange={e => setForm(f => ({ ...f, pdf_url: e.target.value }))} placeholder="https://…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Especificaciones técnicas (JSON)</label>
                <textarea value={form.specs} onChange={e => setForm(f => ({ ...f, specs: e.target.value }))} rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-[#1a56db] resize-none" placeholder={'{\n  "Peso": "15 kg/m²",\n  "Resistencia": "25 MPa"\n}'} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="visible" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} className="w-4 h-4" />
                <label htmlFor="visible" className="text-sm font-medium text-gray-700">Visible para clientes</label>
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancelar</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1341a8] disabled:opacity-60">{loading ? 'Guardando…' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
