import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, Users, Wrench, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [{ count: products }, { count: services }, { count: users }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
  ])

  const stats = [
    { label: 'Productos', value: products ?? 0, icon: Package, href: '/admin/productos', color: 'bg-blue-500' },
    { label: 'Servicios', value: services ?? 0, icon: Wrench, href: '/admin/servicios', color: 'bg-emerald-500' },
    { label: 'Clientes', value: users ?? 0, icon: Users, href: '/admin/usuarios', color: 'bg-violet-500' },
  ]

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl font-black text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-10">Resumen del estado de PREMOLSA.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map(s => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex items-center gap-5"
          >
            <div className={`${s.color} text-white p-3 rounded-xl`}>
              <s.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="text-3xl font-black text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
            <ArrowRight size={18} className="text-gray-300" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Acciones rápidas</h2>
          <div className="space-y-2">
            <Link href="/admin/productos?new=1" className="flex items-center gap-2 text-sm text-[#1a56db] hover:underline">
              <Package size={16} /> Añadir nuevo producto
            </Link>
            <Link href="/admin/servicios?new=1" className="flex items-center gap-2 text-sm text-[#1a56db] hover:underline">
              <Wrench size={16} /> Añadir nuevo servicio
            </Link>
            <Link href="/admin/usuarios?new=1" className="flex items-center gap-2 text-sm text-[#1a56db] hover:underline">
              <Users size={16} /> Crear nuevo cliente
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Web pública</h2>
          <p className="text-sm text-gray-500 mb-4">Ver cómo ven los visitantes la web de PREMOLSA.</p>
          <Link href="/" target="_blank" className="text-sm text-[#1a56db] hover:underline flex items-center gap-1">
            Abrir web →
          </Link>
        </div>
      </div>
    </div>
  )
}
