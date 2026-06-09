/**
 * Crea el bucket 'galeria', sube fotos reales de instalaciones (D:\INTALACIONES
 * y D:\Fotos pagina web) optimizadas, y las inserta en la tabla `gallery`.
 * Requiere que la tabla `gallery` exista (ejecutar antes supabase-gallery.sql).
 * Uso: node scripts/seed-gallery.mjs
 */
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

// Crear bucket (idempotente)
await supabase.storage.createBucket('galeria', { public: true }).catch(() => {})

const D = 'D:/'
// Selección curada de fotos reales de instalaciones [archivo, descripción]
const fotos = [
  ['INTALACIONES/Premolsa.jpg', 'Instalaciones PREMOLSA'],
  ['INTALACIONES/20170508_110329.jpg', 'Fábrica'],
  ['INTALACIONES/20170508_110418.jpg', 'Exterior de la fábrica'],
  ['INTALACIONES/20170508_110430.jpg', 'Zona de producción'],
  ['INTALACIONES/20150310_145812.jpg', 'Acopio de material'],
  ['INTALACIONES/20150310_145949.jpg', 'Almacén'],
  ['INTALACIONES/20150310_150010.jpg', 'Patio de fabricación'],
  ['INTALACIONES/20150310_150042.jpg', 'Producto terminado'],
  ['INTALACIONES/thumbnail_IMG_20200716_083850.jpg', 'Instalaciones'],
  ['INTALACIONES/thumbnail_IMG_20200716_083951.jpg', 'Bloques en palet'],
  ['INTALACIONES/thumbnail_IMG_20200716_084101.jpg', 'Zona de carga'],
  ['INTALACIONES/thumbnail_IMG_20200730_111957.jpg', 'Fabricación'],
  ['Fotos pagina web/thumbnail_IMG_20200730_112444.jpg', 'Producción de prefabricados'],
]

// ¿Ya hay filas? evitar duplicar
const { count } = await supabase.from('gallery').select('*', { count: 'exact', head: true })
if (count && count > 0) {
  console.log(`La galería ya tiene ${count} fotos. No se vuelve a seedear.`)
  process.exit(0)
}

let order = 1
for (const [src, caption] of fotos) {
  try {
    const buffer = await sharp(D + src)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
    const dest = `instalacion-${order}.jpg`
    const { error: upErr } = await supabase.storage.from('galeria').upload(dest, buffer, { contentType: 'image/jpeg', upsert: true })
    if (upErr) throw upErr
    const { data } = supabase.storage.from('galeria').getPublicUrl(dest)
    const { error: insErr } = await supabase.from('gallery').insert({ image_url: data.publicUrl, caption, order })
    if (insErr) throw insErr
    console.log(`✅ #${order} ${caption}`)
    order++
  } catch (e) {
    console.error(`❌ ${src}: ${e.message}`)
  }
}
console.log(`\n📸 Galería seedeada con ${order - 1} fotos.`)
