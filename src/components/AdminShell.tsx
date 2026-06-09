'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import { LayoutDashboard, Package, Wrench, Users, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/servicios', label: 'Servicios', icon: Wrench },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
]

export default function AdminShell({
  children,
  userName,
}: {
  children: React.ReactNode
  userName: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-[#1a56db] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-2 truncate">{userName}</div>
        <LogoutButton />
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar móvil */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-gray-900 text-white flex items-center px-4 gap-3">
        <button onClick={() => setOpen(true)} aria-label="Abrir menú" className="p-1.5 -ml-1.5">
          <Menu size={22} />
        </button>
        <span className="font-black text-sm">PREMOLSA</span>
        <span className="text-[10px] text-gray-400">Panel Admin</span>
      </header>

      {/* Sidebar escritorio (fijo) */}
      <aside className="hidden md:flex w-60 bg-gray-900 text-white flex-col fixed top-0 bottom-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Sidebar móvil (drawer) */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="relative w-64 max-w-[80%] bg-gray-900 text-white flex flex-col">
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={22} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Contenido */}
      <main className="md:ml-60 min-h-screen pt-14 md:pt-0">{children}</main>
    </div>
  )
}
