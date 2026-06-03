'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/productos', label: 'Productos' },
  { href: '/galeria', label: 'Galería' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/95 backdrop-blur-md border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://premolsa.es/wp-content/uploads/2017/04/cropped-premolsa-logo-1-270x270.jpg"
            alt="PREMOLSA"
            className="w-11 h-11 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[#1a56db] font-black text-lg leading-none tracking-wide">PREMOLSA</span>
            <span className="text-gray-500 text-[10px] font-medium tracking-wider">Prefabricados y Moldeados S.A.</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.href
                  ? 'bg-blue-50 text-[#1a56db]'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-[#1a56db]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-1 px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Área clientes
          </Link>
          <Link
            href="/contacto"
            className="ml-1 px-4 py-2 bg-[#1a56db] text-white text-sm font-semibold rounded-lg hover:bg-[#1341a8] transition-colors"
          >
            Solicitar presupuesto
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium ${
                pathname === l.href ? 'bg-blue-50 text-[#1a56db]' : 'text-gray-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Área clientes
          </Link>
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-3 bg-[#1a56db] text-white text-sm font-semibold rounded-lg text-center"
          >
            Solicitar presupuesto
          </Link>
        </div>
      )}
    </header>
  )
}
