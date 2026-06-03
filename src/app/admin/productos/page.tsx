import { createClient } from '@/lib/supabase/server'
import ProductosAdmin from './ProductosAdmin'

export default async function AdminProductosPage() {
  const supabase = await createClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*, category:categories(name)').order('name'),
    supabase.from('categories').select('*').order('order'),
  ])
  return <ProductosAdmin products={products ?? []} categories={categories ?? []} />
}
