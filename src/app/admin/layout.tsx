import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import { LayoutDashboard, Package, Wrench, Users } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/servicios', label: 'Servicios', icon: Wrench },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role, full_name, email').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/area-cliente')

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col fixed top-0 bottom-0 left-0 z-40">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-white rounded-lg px-2 py-1.5">
              <img src="/logo-premolsa-opt.png" alt="PREMOLSA" className="h-6 w-auto" />
            </div>
            <div>
              <div className="text-sm font-black text-white">PREMOLSA</div>
              <div className="text-[10px] text-gray-400">Panel Admin</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-2 truncate">{profile?.full_name || profile?.email}</div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">{children}</main>
    </div>
  )
}
