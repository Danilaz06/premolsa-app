import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function ClienteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('full_name, email, role').eq('id', user.id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-4 fixed top-0 left-0 right-0 z-40 shadow-sm">
        <Link href="/" className="flex items-center gap-2.5 mr-auto">
          <img src="/logo-premolsa-opt.png" alt="PREMOLSA" className="h-8 w-auto" />
          <span className="font-black text-[#1a56db] hidden sm:block">PREMOLSA</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link href="/area-cliente" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#1a56db] hover:bg-blue-50 rounded-lg transition-colors">
            Fichas técnicas
          </Link>
        </nav>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-sm text-gray-500 hidden sm:block">{profile?.full_name || profile?.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="pt-16 min-h-screen">{children}</main>
    </div>
  )
}
