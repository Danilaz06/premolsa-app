// Reemplaza la paleta azul corporativa por verde en todo src/
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Orden importante: cadenas más específicas primero (blue-500 antes que blue-50)
const map = [
  ['#1a56db', '#15803d'],   // principal -> green-700
  ['#1341a8', '#166534'],   // hover/dark -> green-800
  ['#e8f0fe', '#dcfce7'],   // light bg -> green-100
  ['blue-950', 'green-950'],
  ['blue-900', 'green-900'],
  ['blue-700', 'green-700'],
  ['blue-500', 'green-600'],
  ['blue-300', 'green-300'],
  ['blue-100', 'green-100'],
  ['blue-50', 'green-50'],
]

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(name)) {
      let txt = readFileSync(p, 'utf8')
      const before = txt
      for (const [a, b] of map) txt = txt.split(a).join(b)
      if (txt !== before) { writeFileSync(p, txt); console.log('✓', p.replace(/.*src/, 'src')) }
    }
  }
}

walk('src')
console.log('Recoloreado a verde.')
