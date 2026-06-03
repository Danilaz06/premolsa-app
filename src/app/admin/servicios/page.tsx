import { createClient } from '@/lib/supabase/server'
import ServiciosAdmin from './ServiciosAdmin'

export default async function AdminServiciosPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*').order('order')
  return <ServiciosAdmin services={services ?? []} />
}
