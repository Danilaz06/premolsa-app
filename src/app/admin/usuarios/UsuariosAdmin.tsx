'use client'
import { useState } from 'react'
import { Plus, Trash2, X, Users } from 'lucide-react'
import type { Profile } from '@/lib/types'

interface Props { users: Profile[] }

export default function UsuariosAdmin({ users: initial }: Props) {
  const [users, setUsers] = useState(initial)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Error creando usuario'); setLoading(false); return }
    setSuccess(`Cliente ${email} creado correctamente.`)
    setUsers(prev => [data.profile, ...prev])
    setEmail(''); setFullName(''); setPassword('')
    setLoading(false)
    setTimeout(() => { setOpen(false); setSuccess('') }, 2000)
  }

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`¿Eliminar acceso de ${email}?`)) return
    await fetch('/api/admin/delete-user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Clientes</h1>
          <p className="text-gray-500 text-sm">{users.length} clientes con acceso</p>
        </div>
        <button onClick={() => { setOpen(true); setError(''); setSuccess('') }} className="flex items-center gap-2 bg-[#1a56db] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1341a8]">
          <Plus size={16} /> Crear cliente
        </button>
      </div>

      {!users.length ? (
        <div className="text-center py-20 text-gray-400">
          <Users size={48} className="mx-auto mb-4 opacity-30" />
          <p>Aún no hay clientes creados.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nombre</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Creado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`border-b border-gray-100 ${i%2===0?'bg-white':'bg-gray-50/50'}`}>
                  <td className="px-5 py-3 font-medium text-gray-900">{u.full_name ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-500">{u.email}</td>
                  <td className="px-5 py-3 text-gray-400">{new Date(u.created_at).toLocaleDateString('es-ES')}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => handleDelete(u.id, u.email)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-lg">Crear nuevo cliente</h2>
              <button onClick={() => setOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Empresa o persona" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña *</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Mínimo 8 caracteres" />
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              {success && <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-semibold text-gray-600">Cancelar</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[#1a56db] text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60">{loading ? 'Creando…' : 'Crear cliente'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
