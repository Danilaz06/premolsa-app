'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      setLoading(false)
      return
    }

    // Get role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    router.push(profile?.role === 'admin' ? '/admin' : '/area-cliente')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://premolsa.es/wp-content/uploads/2017/04/cropped-premolsa-logo-1-270x270.jpg"
            alt="PREMOLSA"
            className="w-16 h-16 rounded-xl object-cover mx-auto mb-4"
          />
          <h1 className="text-2xl font-black text-white">Acceso privado</h1>
          <p className="text-gray-400 text-sm mt-1">PREMOLSA – Área de clientes</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a56db] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1a56db] text-white font-semibold rounded-lg hover:bg-[#1341a8] transition-colors disabled:opacity-60"
          >
            {loading ? 'Accediendo…' : 'Entrar'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-5">
            ¿No tienes acceso?{' '}
            <a href="tel:976292347" className="text-[#1a56db] font-medium hover:underline">
              Contacta con nosotros
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
