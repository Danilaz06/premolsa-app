import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function sanitize(name: string) {
  return name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 50) || 'archivo'
}

const ALLOWED = ['productos', 'fichas', 'obras', 'galeria']

export async function POST(req: Request) {
  // Verificar que es admin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const fd = await req.formData()
  const file = fd.get('file') as File | null
  const bucket = String(fd.get('bucket') || '')
  if (!file) return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })
  if (!ALLOWED.includes(bucket)) return NextResponse.json({ error: 'Bucket no válido' }, { status: 400 })

  const isPdf = file.type === 'application/pdf'
  const ext = isPdf ? 'pdf' : 'jpg'
  const path = `${sanitize(file.name)}-${Date.now()}.${ext}`

  const { createClient: createAdminClient } = await import('@supabase/supabase-js')
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const buffer = Buffer.from(await file.arrayBuffer())
  const { error } = await admin.storage.from(bucket).upload(path, buffer, {
    contentType: file.type || 'application/octet-stream',
    upsert: true,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = admin.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
