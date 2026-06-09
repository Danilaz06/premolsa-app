import { createClient } from '@/lib/supabase/server'
import GaleriaAdmin from './GaleriaAdmin'

export default async function AdminGaleriaPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('gallery').select('*').order('order')
  return <GaleriaAdmin items={items ?? []} />
}
