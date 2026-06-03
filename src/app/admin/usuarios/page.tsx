import { createClient } from '@/lib/supabase/server'
import UsuariosAdmin from './UsuariosAdmin'

export default async function AdminUsuariosPage() {
  const supabase = await createClient()
  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false })
  return <UsuariosAdmin users={users ?? []} />
}
