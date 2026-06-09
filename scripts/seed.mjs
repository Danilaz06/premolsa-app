/**
 * Carga los productos reales en la tabla `products` (idempotente via upsert por slug).
 * Uso: node scripts/seed.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n').filter(l => l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const BASE = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`

// slug de categoría -> id
const { data: cats, error: catErr } = await supabase.from('categories').select('id, slug')
if (catErr) { console.error('Error leyendo categorías:', catErr.message); process.exit(1) }
const cat = Object.fromEntries(cats.map(c => [c.slug, c.id]))

const P = (n, mm, extra) => ({
  Dimensiones: mm, Categoría: 'D1', Uso: 'Muros, columnas y particiones',
  'Resistencia a compresión': '>6 N/mm²', 'Reacción al fuego': 'Clase A1',
  'Resistencia hielo-deshielo': 'Sin deterioro', Normativa: 'EN 771-3:2011+A1:2016', ...extra,
})

const products = [
  { c: 'albanileria', name: 'Bloque de hormigón 390×190×90', slug: 'bloque-hormigon-390x190x90',
    desc: 'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). 135 piezas por palet.',
    specs: P(0, '390 × 190 × 90 mm', { 'Resistencia al fuego': 'EI-60 (árido calizo)', 'Absorción de agua': '9,8 g/m²s', 'Variación por humedad': '0,36 mm/m', 'Densidad aparente seca': '1123 kg/m³', 'Densidad absoluta seca': '2174 kg/m³', 'Peso del palet': '1150 kg aprox.', 'Unidades por palet': '135' }),
    img: `${BASE}/productos/bloque-hormigon.jpg`, pdf: `${BASE}/fichas/bloque-390x190x90.pdf` },
  { c: 'albanileria', name: 'Bloque de hormigón 390×190×140', slug: 'bloque-hormigon-390x190x140',
    desc: 'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). 95 piezas por palet.',
    specs: P(0, '390 × 190 × 140 mm', { 'Resistencia al fuego': 'REI-90 (árido calizo)', 'Absorción de agua': '9,8 g/m²s', 'Variación por humedad': '0,58 mm/m', 'Densidad aparente seca': '948 kg/m³', 'Densidad absoluta seca': '2017 kg/m³', 'Peso del palet': '1050 kg aprox.', 'Unidades por palet': '95' }),
    img: `${BASE}/productos/bloque-hormigon.jpg`, pdf: `${BASE}/fichas/bloque-390x190x140.pdf` },
  { c: 'albanileria', name: 'Bloque de hormigón 390×190×190', slug: 'bloque-hormigon-390x190x190',
    desc: 'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). Excelente resistencia al fuego REI-180. 70 piezas por palet.',
    specs: P(0, '390 × 190 × 190 mm', { 'Resistencia al fuego': 'REI-180 (árido calizo)', 'Absorción de agua': '9,8 g/m²s', 'Variación por humedad': '0,58 mm/m', 'Densidad aparente seca': '829 kg/m³', 'Densidad absoluta seca': '1975 kg/m³', 'Peso del palet': '860 kg aprox.', 'Unidades por palet': '70' }),
    img: `${BASE}/productos/bloque-hormigon.jpg`, pdf: `${BASE}/fichas/bloque-390x190x190.pdf` },
  { c: 'albanileria', name: 'Bloque de hormigón hidrófugo 390×190×190', slug: 'bloque-hormigon-hidrofugo-390x190x190',
    desc: 'Bloque de hormigón hidrófugo para muros expuestos. Baja absorción de agua (<2 g/m²s). Categoría D1. Marcado CE (0370).',
    specs: P(0, '390 × 190 × 190 mm', { Tipo: 'Hidrófugo', 'Resistencia al fuego': 'REI-180 (árido calizo)', 'Absorción de agua': '<2 g/m²s', 'Variación por humedad': '0,58 mm/m', 'Densidad aparente seca': '829 kg/m³', 'Densidad absoluta seca': '1975 kg/m³', 'Peso del palet': '860 kg aprox.', 'Unidades por palet': '70' }),
    img: `${BASE}/productos/bloque-hormigon.jpg`, pdf: `${BASE}/fichas/bloque-390x190x190-hidrofugo.pdf` },
  { c: 'albanileria', name: 'Bloque dintel hidrófugo 390×190×140', slug: 'bloque-dintel-hidrofugo-390x190x140',
    desc: 'Bloque dintel hidrófugo en forma de U para zunchos y dinteles. Categoría D1. Marcado CE (0370). 85 piezas por palet.',
    specs: P(0, '390 × 190 × 140 mm', { Tipo: 'Dintel hidrófugo', 'Resistencia al fuego': 'RE-90 (árido calizo)', 'Absorción de agua': '<2 g/m²s', 'Variación por humedad': '0,15 mm/m', 'Densidad aparente seca': '1284 kg/m³', 'Densidad absoluta seca': '2127 kg/m³', 'Peso del palet': '1150 kg aprox.', 'Unidades por palet': '85' }),
    img: `${BASE}/productos/dintel.jpg`, pdf: `${BASE}/fichas/dintel-390x190x140.pdf` },
  { c: 'albanileria', name: 'Bloque dintel hidrófugo 390×190×190', slug: 'bloque-dintel-hidrofugo-390x190x190',
    desc: 'Bloque dintel hidrófugo en forma de U para zunchos y dinteles. Categoría D1. Marcado CE (0370). 60 piezas por palet.',
    specs: P(0, '390 × 190 × 190 mm', { Tipo: 'Dintel hidrófugo', 'Resistencia al fuego': 'REI-180 (árido calizo)', 'Absorción de agua': '<2 g/m²s', 'Variación por humedad': '0,15 mm/m', 'Densidad aparente seca': '1284 kg/m³', 'Densidad absoluta seca': '2127 kg/m³', 'Peso del palet': '900 kg aprox.', 'Unidades por palet': '60' }),
    img: `${BASE}/productos/dintel.jpg`, pdf: `${BASE}/fichas/dintel-390x190x190.pdf` },
  { c: 'albanileria', name: 'Gero de hormigón 250×100×120', slug: 'gero-hormigon-250x100x120',
    desc: 'Gero de hormigón para muros, tabiques y particiones. Excelente aislamiento acústico (Rw 51 dB). Categoría D1. Marcado CE (0370). 280 piezas por palet.',
    specs: { Dimensiones: '250 × 100 × 120 mm', Categoría: 'D1', Uso: 'Muros, tabiques y particiones', 'Resistencia a compresión': '>6 N/mm²', 'Reacción al fuego': 'Clase A1', 'Resistencia al fuego': 'REI-120 (árido calizo)', 'Aislamiento acústico': 'Rw (C;Ctr)=51(0;-1) dB', 'Absorción de agua': '<13%', 'Variación por humedad': '0,76 mm/m', 'Densidad aparente seca': '1335 kg/m³', 'Densidad absoluta seca': '2013 kg/m³', 'Resistencia hielo-deshielo': 'Sin deterioro', 'Peso del palet': '1000 kg aprox.', 'Unidades por palet': '280', Normativa: 'EN 771-3:2011+A1:2016' },
    img: `${BASE}/productos/gero.jpg`, pdf: `${BASE}/fichas/gero-250x100x120.pdf` },
  { c: 'forjados', name: 'Semivigueta armada', slug: 'semivigueta-armada', desc: 'Semivigueta armada de hormigón para forjados unidireccionales. Cálculo de estructuras personalizado.', specs: { Material: 'Hormigón armado', Aplicación: 'Forjados unidireccionales', Servicio: 'Cálculo de estructuras incluido' }, img: `${BASE}/productos/semivigueta.jpg`, pdf: null },
  { c: 'forjados', name: 'Bovedilla de hormigón', slug: 'bovedilla-hormigon', desc: 'Bovedilla de hormigón para forjados. Disponible también en arlita y porexpán.', specs: { Material: 'Hormigón (también arlita y porexpán)', Aplicación: 'Forjados unidireccionales' }, img: `${BASE}/productos/bovedilla.jpg`, pdf: null },
  { c: 'forjados', name: 'Vigueta pretensada', slug: 'vigueta-pretensada', desc: 'Vigueta pretensada para forjados de mayor luz y resistencia.', specs: { Material: 'Hormigón pretensado', Aplicación: 'Forjados unidireccionales' }, img: `${BASE}/productos/vigueta-pretensada.jpg`, pdf: null },
  { c: 'forjados', name: 'Placas alveolares', slug: 'placas-alveolares', desc: 'Placas alveolares de hormigón pretensado para forjados de gran luz.', specs: { Material: 'Hormigón pretensado', Aplicación: 'Forjados de gran luz' }, img: `${BASE}/productos/placas-alveolares.jpg`, pdf: null },
  { c: 'albanileria', name: 'Placa de tejado / valla', slug: 'placa-tejado-valla', desc: 'Placas de hormigón para tejado o cerramiento de valla. Varios formatos disponibles.', specs: { Material: 'Hormigón', Formatos: '150×50, 200×50 cm', Aplicación: 'Tejado y cerramientos' }, img: `${BASE}/productos/placa-tejado.jpg`, pdf: null },
  { c: 'albanileria', name: 'Dados de hormigón antivehículo', slug: 'dados-hormigon', desc: 'Dados de hormigón para impedir el paso de vehículos. También piezas de contrapeso.', specs: { Material: 'Hormigón', Aplicación: 'Control de acceso de vehículos / contrapeso' }, img: `${BASE}/productos/dados.jpg`, pdf: null },
  { c: 'albanileria', name: 'Albardilla', slug: 'albardilla', desc: 'Albardilla de hormigón para remate y protección de muros frente al agua.', specs: { Material: 'Hormigón', Aplicación: 'Remate de muros' }, img: `${BASE}/productos/albardilla.jpg`, pdf: null },
  { c: 'hierro', name: 'Ferralla', slug: 'ferralla', desc: 'Ferralla y armaduras de hierro para forjado a medida.', specs: { Material: 'Acero corrugado', Aplicación: 'Armaduras a medida' }, img: `${BASE}/productos/ferralla.jpg`, pdf: null },
  { c: 'hierro', name: 'Celosía electrosoldada', slug: 'celosia-electrosoldada', desc: 'Celosía electrosoldada para refuerzo de forjados y muros.', specs: { Material: 'Acero electrosoldado', Aplicación: 'Refuerzo estructural' }, img: `${BASE}/productos/celosia.jpg`, pdf: null },
  { c: 'accesorios', name: 'Separadores de plástico', slug: 'separadores-plastico', desc: 'Separadores de plástico para forjados y losas. Garantizan el recubrimiento correcto de las armaduras.', specs: { Material: 'Plástico', Aplicación: 'Recubrimiento de armaduras en forjados y losas' }, img: `${BASE}/productos/separador.jpg`, pdf: null },
]

let ok = 0
for (const p of products) {
  const row = { category_id: cat[p.c], name: p.name, slug: p.slug, description: p.desc, specs: p.specs, image_url: p.img, pdf_url: p.pdf, visible: true }
  const { error } = await supabase.from('products').upsert(row, { onConflict: 'slug' })
  if (error) console.error(`❌ ${p.name}: ${error.message}`)
  else { ok++; console.log(`✅ ${p.name}`) }
}
console.log(`\n📦 ${ok}/${products.length} productos cargados.`)
