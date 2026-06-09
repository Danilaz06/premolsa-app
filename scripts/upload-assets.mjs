/**
 * Sube los assets reales de PREMOLSA (D:\) a Supabase Storage.
 *
 * Uso:
 *   1. Añade SUPABASE_SERVICE_ROLE_KEY a .env.local (temporal, no se commitea)
 *   2. node scripts/upload-assets.mjs
 *   3. Copia las URLs que imprime al seed (supabase-seed-real.sql se genera solo)
 *
 * Optimiza imágenes con sharp (max 1200px, JPG 82%) y sube PDFs tal cual.
 */
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'

// Cargar .env.local manualmente
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY
if (!serviceKey) {
  console.error('❌ Falta SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}
const supabase = createClient(url, serviceKey)

const D = 'D:/'

// Mapeo curado: [origen, bucket, nombreDestino, optimizar?]
const assets = [
  // ---- PRODUCTOS (fotos reales) ----
  ['MATERIALES/BLOQUE.jpg',              'productos', 'bloque-hormigon.jpg', true],
  ['MATERIALES/BOVEDILLA.jpg',           'productos', 'bovedilla.jpg', true],
  ['MATERIALES/GERO.jpg',                'productos', 'gero.jpg', true],
  ['MATERIALES/DADOS.jpg',               'productos', 'dados.jpg', true],
  ['MATERIALES/PLACA TEJADO 200X50.jpeg','productos', 'placa-tejado.jpg', true],
  ['MATERIALES/SEMIVIGUETA 2.jpg',       'productos', 'semivigueta.jpg', true],
  ['MATERIALES/dintel.jpg',              'productos', 'dintel.jpg', true],
  ['MATERIALES/albardilla.jpg',          'productos', 'albardilla.jpg', true],
  ['MATERIALES/PLAQUETA.jpg',            'productos', 'plaqueta.jpg', true],
  ['MATERIALES/separadorcent.jpg',       'productos', 'separador.jpg', true],
  ['MATERIALES/VP11.jpg',                'productos', 'vigueta-pretensada.jpg', true],
  ['MATERIALES/fotos placas.jpg',        'productos', 'placas-alveolares.jpg', true],
  ['Fotos pagina web/ferralla.jpg',      'productos', 'ferralla.jpg', true],
  ['Fotos pagina web/celosilla.jpg',     'productos', 'celosia.jpg', true],

  // ---- FICHAS (PDF tal cual) ----
  ['FICHAS/Ficha bloque 390x190x90.pdf',           'fichas', 'bloque-390x190x90.pdf', false],
  ['FICHAS/Ficha bloque 390x190x90 hidrófugo.pdf', 'fichas', 'bloque-390x190x90-hidrofugo.pdf', false],
  ['FICHAS/Ficha bloque 390x190x140.pdf',          'fichas', 'bloque-390x190x140.pdf', false],
  ['FICHAS/Ficha bloque 390x190x140 hidrófugo.pdf','fichas', 'bloque-390x190x140-hidrofugo.pdf', false],
  ['FICHAS/Ficha bloque 390x190x190.pdf',          'fichas', 'bloque-390x190x190.pdf', false],
  ['FICHAS/Ficha bloque 390x190x190 hidrogugo.pdf','fichas', 'bloque-390x190x190-hidrofugo.pdf', false],
  ['FICHAS/Ficha dintel 390x190x140.pdf',          'fichas', 'dintel-390x190x140.pdf', false],
  ['FICHAS/Ficha dintel 390x190x190.pdf',          'fichas', 'dintel-390x190x190.pdf', false],
  ['FICHAS/Ficha Gero 250X120X100.pdf',            'fichas', 'gero-250x100x120.pdf', false],

  // ---- OBRAS (fotos reales) ----
  ['OBRAS/almozara2000-home-1-900x444.jpg',                          'obras', 'almozara-home.jpg', true],
  ['OBRAS/Almozara2000-residencial-reina-isabel-700x460.jpg',        'obras', 'almozara-reina-isabel.jpg', true],
  ['OBRAS/almozara2000-lagos-de-coronas.jpg',                        'obras', 'almozara-lagos-coronas.jpg', true],
  ['OBRAS/Almozara2000-23-viviendas-proteccion-oficial1-700x460.jpg','obras', 'almozara-23-viviendas.jpg', true],
  ['OBRAS/LOBE-E10.jpg',                                             'obras', 'lobe-e10.jpg', true],
  ['OBRAS/estructura.jpg',                                           'obras', 'estructura.jpg', true],
]

const results = {}

for (const [src, bucket, dest, optimize] of assets) {
  try {
    let buffer = readFileSync(D + src)
    let contentType = 'application/pdf'

    if (optimize) {
      buffer = await sharp(buffer)
        .rotate()
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer()
      contentType = 'image/jpeg'
    }

    const { error } = await supabase.storage.from(bucket).upload(dest, buffer, {
      contentType, upsert: true,
    })
    if (error) throw error

    const { data } = supabase.storage.from(bucket).getPublicUrl(dest)
    results[dest] = data.publicUrl
    console.log(`✅ ${bucket}/${dest}`)
  } catch (e) {
    console.error(`❌ ${src}: ${e.message}`)
  }
}

writeFileSync('scripts/asset-urls.json', JSON.stringify(results, null, 2))
console.log(`\n📦 ${Object.keys(results).length} assets subidos. URLs en scripts/asset-urls.json`)
