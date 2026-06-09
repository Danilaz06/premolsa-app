# PREMOLSA — Plataforma web

Web corporativa + área privada de clientes + panel de administración para **PREMOLSA (Prefabricados y Moldeados, S.L.)**, fabricante de prefabricados de hormigón en Zaragoza desde 1967.

> **Este README es el documento maestro del proyecto.** Se actualiza con cada cambio que hacemos. Si retomas el proyecto, empieza leyendo este archivo de arriba a abajo.

---

## 📌 Estado actual del proyecto

| Fase | Estado |
|------|--------|
| Web pública (Next.js) | ✅ Desplegada |
| Auth con roles (cliente/admin) | ✅ Funcionando |
| Panel admin (CRUD productos/servicios/usuarios) | ✅ Funcionando |
| Área cliente (fichas técnicas) | ✅ Funcionando |
| Despliegue en Vercel | ✅ Activo |
| Base de datos Supabase | ✅ Configurada |
| Logo oficial PH integrado | ✅ Hecho |
| Sección Obras/Proyectos | ✅ Hecho |
| Catálogo con fotos reales | ✅ Hecho |
| Seed de productos reales con fichas | ✅ Cargado (17 productos) |
| Subida de assets a Supabase Storage | ✅ Hecho (29 archivos) |

**URL de producción:** https://premolsa-app.vercel.app
**Repo GitHub:** https://github.com/Danilaz06/premolsa-app

---

## 🏢 Datos oficiales de la empresa

> ⚠️ **CORRECCIÓN IMPORTANTE:** Las fichas técnicas oficiales (rev. 2025) confirman que la razón social es **S.L.**, no S.A. como figuraba en el brief inicial. Usar siempre **S.L.**

| Campo | Valor |
|-------|-------|
| Razón social | **Prefabricados y Moldeados, S.L.** (PREMOLSA) |
| CIF | B50091479 |
| Fundación | 1967 (+55 años de experiencia) |
| Sector | Fabricación de prefabricados de hormigón |
| Especialidad pionera | Vigas y bovedillas |
| Marcado CE — organismo notificado | **0370** |
| Dirección | Cno. del Vado, s/n (glorieta Hispanidad) — 50014 Zaragoza |
| Teléfono | 976 292 347 |
| WhatsApp | 678 379 129 |
| Email | angelpremolsa@hotmail.com |
| Web antigua | https://premolsa.es |
| Coordenadas | lat 41.656722, lng -0.852474 |
| Google Maps | https://maps.google.com/?q=41.656722,-0.852474 |

**Clientes objetivo:** constructores, promotores, albañiles y almacenes de construcción.

**Propuesta de valor:**
- Servicio personalizado de cálculo de estructuras
- Cumplimiento de normativa Marcado CE (organismo 0370)
- Calidad y servicio a precio competitivo
- Suministro en obra a medida del ritmo del cliente

---

## 🧱 Stack técnico

- **Framework:** Next.js 15 (App Router, `src/` dir, TypeScript)
- **Estilos:** Tailwind CSS v4
- **Backend / DB / Auth / Storage:** Supabase (PostgreSQL + RLS)
- **Iconos:** lucide-react
- **Tipografía:** Inter (cuerpo) + Montserrat (titulares)
- **Hosting:** Vercel (deploy automático al hacer push a `master`)

### Variables de entorno

`.env.local` (local) y **Vercel → Settings → Environment Variables** (producción):

```
NEXT_PUBLIC_SUPABASE_URL=https://swcmkxrwtxxctjehrwuc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # ⚠️ NECESARIA para crear/eliminar usuarios desde el admin
```

> La `SUPABASE_SERVICE_ROLE_KEY` se obtiene en Supabase → Settings → API → `service_role`. Es secreta, NO debe llevar el prefijo `NEXT_PUBLIC_`.

---

## 🗂️ Estructura del proyecto

```
premolsa-app/
├── src/
│   ├── app/
│   │   ├── (public)/              ← Web pública (con Header/Footer/WhatsApp)
│   │   │   ├── page.tsx           ← Inicio (hero, valores, productos, galería, CTA)
│   │   │   ├── empresa/
│   │   │   ├── productos/
│   │   │   ├── galeria/
│   │   │   └── contacto/
│   │   ├── login/                 ← Acceso unificado (cliente + admin)
│   │   ├── area-cliente/          ← Privado: fichas técnicas (rol client/admin)
│   │   │   ├── page.tsx
│   │   │   └── productos/[slug]/  ← Ficha técnica individual + descarga PDF
│   │   ├── admin/                 ← Privado: panel admin (solo rol admin)
│   │   │   ├── page.tsx           ← Dashboard
│   │   │   ├── productos/         ← CRUD productos
│   │   │   ├── servicios/         ← CRUD servicios
│   │   │   └── usuarios/          ← Crear/eliminar clientes
│   │   ├── api/admin/
│   │   │   ├── create-user/       ← API route (usa service role key)
│   │   │   └── delete-user/
│   │   └── layout.tsx
│   ├── components/                ← Header, Footer, WhatsAppFAB, LogoutButton
│   ├── lib/
│   │   ├── supabase/              ← client.ts, server.ts
│   │   └── types.ts
│   └── middleware.ts              ← Protección de rutas + redirección por rol
├── supabase-schema.sql            ← Schema inicial (tablas, trigger, datos ejemplo)
├── supabase-fix-rls.sql           ← Fix políticas RLS (INSERT necesita WITH CHECK)
├── supabase-fix-profiles-rls.sql  ← Fix recursión infinita en políticas de profiles
└── README.md                      ← Este archivo
```

---

## 🔐 Sistema de usuarios y roles

- **No hay registro público.** Solo el admin crea cuentas de cliente desde el panel.
- **Roles:**
  - `client` → accede a `/area-cliente` (fichas técnicas descargables)
  - `admin` → accede a `/admin` (CRUD completo) y a todo lo del cliente
- El `middleware.ts` protege las rutas y redirige según rol tras el login.
- Al crear un usuario en Supabase Auth, un **trigger** crea automáticamente su fila en `profiles` con rol `client` por defecto.

### Cómo crear el primer admin
1. Supabase → Authentication → Users → Add user (con "Auto Confirm User").
2. Supabase → Table Editor → `profiles` → cambiar `role` de ese usuario a `admin`.

---

## 🗄️ Base de datos (Supabase)

### Tablas
- **`profiles`** — `id` (=auth.users.id), `email`, `full_name`, `role`, `created_at`
- **`categories`** — `id`, `name`, `slug`, `icon`, `order`
- **`products`** — `id`, `category_id`, `name`, `slug`, `description`, `specs` (JSONB), `pdf_url`, `image_url`, `visible`, `created_at`
- **`services`** — `id`, `title`, `description`, `icon`, `order`, `visible`

### Orden de ejecución de los SQL
1. `supabase-schema.sql` (crea todo + datos de ejemplo)
2. `supabase-fix-rls.sql` (corrige políticas de escritura)
3. `supabase-fix-profiles-rls.sql` (corrige recursión en profiles)

> **Nota sobre `specs`:** es un JSON `{ "parámetro": "valor" }` que alimenta la tabla de especificaciones técnicas en la ficha del producto. Ver formato real en la sección "Fichas técnicas reales".

---

## 📦 Catálogo de productos (completo)

**Forjados y estructura:** forjados de varios tipos, semivigueta armada, bovedillas (hormigón/arlita/porexpán), bovedillas para vigueta pretensada, planchas bajo jácena de porexpán (rotura de puente térmico), casetón reticular (hormigón/arlita/porexpán), viguetas tubulares, placas alveolares, vigas para placa de valla.

**Albañilería y bloques:** bloques de hormigón prensado, gero de hormigón, placas de tejado/valla, dados antivehículo, piezas de contrapeso, dinteles, albardillas, plaquetas.

**Hierro y ferralla:** hierro para forjado, ferralla, celosía electrosoldada, mallazo electrosoldado.

**Accesorios:** separadores de plástico para forjado y losas.

---

## 📁 Assets reales disponibles (en `D:\`)

Material fotográfico y documental real de la empresa, pendiente de integrar en la app.

### `D:\FICHAS\` — Fichas técnicas oficiales (PDF, rev. 2025)
9 fichas con Marcado CE 0370. Formato: parámetro / valor declarado / norma de referencia.
- Gero de hormigón 250×100×120
- Bloque 390×190×90 (+ hidrófugo)
- Bloque 390×190×140 (+ hidrófugo)
- Bloque 390×190×190 (+ hidrófugo)
- Dintel 390×190×140 (hidrófugo)
- Dintel 390×190×190 (hidrófugo)

### `D:\MATERIALES\` — Fotos reales de producto (30 archivos)
Bloques, bovedilla, gero, dados, placas de tejado, semivigueta, dintel, albardilla, plaqueta, separador, VP11, etc. Fondo limpio, aptas para catálogo.

### `D:\OBRAS\` — Proyectos reales ejecutados (6 archivos)
- Almozara 2000 — 23 viviendas de protección oficial
- Almozara 2000 — Residencial Reina Isabel
- Almozara 2000 — Lagos de Coronas
- LOBE E10
- Foto de estructura
> 💡 Oportunidad: crear una sección "Obras / Proyectos" para dar credibilidad.

### `D:\INTALACIONES\` — Fotos de instalaciones (25 archivos)
Fábrica, centro de transformación ENDESA, emplazamiento, exteriores (2015, 2017, 2020).

### `D:\LOGOS\` — Logotipos oficiales
- `LOGO.PNG` — logo "PΗ" texturizado blanco/negro (oficial)
- `LOGO VERDE.png` — versión verde
- `Premolsa sello.jpg`, `Premolsa logo.jpg`

### `D:\Fotos pagina web\` — Selección para web (18 archivos)
Incluye ferralla, celosía, render generado y fotos WhatsApp recientes (2026).

---

## 📋 Fichas técnicas reales (datos extraídos)

Datos comunes a todos los bloques: Categoría D1, MUROS/COLUMNAS/PARTICIONES, resistencia a compresión >6 N/mm², adherencia 0,15 N/mm², reacción al fuego Clase A1, resistencia hielo-deshielo "Sin deterioro".

| Producto | Peso palet | Uds/palet | Absorción agua | Variac. humedad | Dens. aparente | Dens. absoluta | Resist. fuego |
|----------|-----------|-----------|----------------|-----------------|----------------|----------------|---------------|
| Bloque 390×190×90 | 1150 kg | 135 | 9,8 g/m²s | 0,36 mm/m | 1123 kg/m³ | 2174 kg/m³ | EI-60 |
| Bloque 390×190×140 | 1050 kg | 95 | 9,8 g/m²s | 0,58 mm/m | 948 kg/m³ | 2017 kg/m³ | REI-90 |
| Bloque 390×190×190 | 860 kg | 70 | 9,8 g/m²s | 0,58 mm/m | 829 kg/m³ | 1975 kg/m³ | REI-180 |
| Bloques hidrófugos | (igual) | (igual) | **<2 g/m²s** | (igual) | (igual) | (igual) | (igual) |
| Dintel 390×190×140 hidróf. | 1150 kg | 85 | <2 g/m²s | 0,15 mm/m | 1284 kg/m³ | 2127 kg/m³ | RE-90 |
| Dintel 390×190×190 hidróf. | 900 kg | 60 | <2 g/m²s | 0,15 mm/m | 1284 kg/m³ | 2127 kg/m³ | REI-180 |
| Gero 250×100×120 | 1000 kg | 280 | <13% | 0,76 mm/m | 1335 kg/m³ | 2013 kg/m³ | REI-120 + Rw 51 dB |

Normas: EN 771-3:2011+A1:2016, EN 13369 Anexo F, EN 772-14:2002, EN 772-13:2000, EN 772-18:2000, CTE DB-SI Anejo F.

---

## 🚀 Comandos

```bash
npm run dev      # desarrollo en localhost:3000
npm run build    # build de producción
npm run start    # servir build
git push         # → Vercel despliega automáticamente
```

---

## 🖼️ Procedimiento para subir los assets reales a Storage

Los buckets de Storage son **públicos**, por lo que las URLs son predecibles y el seed/código ya las referencian. Pasos para activar las fotos y fichas reales:

1. **Crear buckets:** ejecutar `supabase-storage.sql` en Supabase SQL Editor.
2. **Service key (temporal):** añadir a `.env.local` la línea
   `SUPABASE_SERVICE_ROLE_KEY=<service_role de Supabase → Settings → API>`
   (este archivo está en `.gitignore`, no se sube a git).
3. **Subir assets:** `node scripts/upload-assets.mjs`
   (optimiza imágenes con sharp y sube fotos de producto, fichas PDF y obras).
4. **Cargar productos reales:** ejecutar `supabase-seed-real.sql` en Supabase SQL Editor.

Scripts y archivos relacionados:
- `scripts/optimize-logo.mjs` — optimiza el logo oficial (ya ejecutado → `public/logo-premolsa-opt.png`).
- `scripts/upload-assets.mjs` — sube assets a Storage; genera `scripts/asset-urls.json`.
- `src/lib/assets.ts` — URLs de Storage usadas por las páginas públicas (productos y obras).
- `supabase-storage.sql` — buckets `productos`, `fichas`, `obras` + políticas.
- `supabase-seed-real.sql` — productos reales con specs de las fichas + URLs.

---

## 📝 Registro de cambios (changelog)

### 2026-06-09 (tarde) — Datos reales e identidad
- ✅ Corregida razón social **S.A. → S.L.** en header, footer y empresa.
- ✅ Logo oficial **PH** optimizado (2 MB → 76 KB) e integrado en header, footer, login, admin y área cliente.
- ✅ Nueva sección **Obras** (`/obras`) con 6 proyectos reales (Almozara 2000, LOBE) + enlace en menú y footer.
- ✅ **Catálogo público con fotos reales**: home y página de productos usan las fotos reales (vía `src/lib/assets.ts`).
- ✅ Creado `supabase-storage.sql` (buckets) y `scripts/upload-assets.mjs` (subida + optimización).
- ✅ Creado `supabase-seed-real.sql` con 18 productos reales: 7 con ficha técnica CE (bloques, dinteles, gero) y specs exactas, + bovedilla, semivigueta, vigueta pretensada, placas alveolares, placa tejado, dados, albardilla, ferralla, celosía, separadores.
- ✅ Creado este README maestro.
- ✅ **29 assets subidos** a Supabase Storage (14 fotos producto, 9 fichas PDF, 6 obras) vía `scripts/upload-assets.mjs`.
- ✅ **17 productos reales cargados** en BD vía `scripts/seed.mjs` (upsert idempotente por slug).
- ✅ Fotos de producto, obras y fichas PDF verificadas online (HTTP 200).
- ℹ️ `scripts/seed.mjs` es ahora la fuente de verdad del seed (alternativa a `supabase-seed-real.sql`). Para recargar: `node scripts/seed.mjs`.

### 2026-06-09 (mañana) — Base del proyecto
- ✅ Migración de HTML estático a Next.js 15 + Supabase + Tailwind.
- ✅ Web pública completa (inicio, empresa, productos, galería, contacto).
- ✅ Auth con roles, área cliente y panel admin (CRUD productos/servicios/usuarios).
- ✅ Desplegado en Vercel + repo en GitHub.
- ✅ Fix: eliminado `page.tsx` por defecto de create-next-app que tapaba la home.
- ✅ Añadido enlace "Área clientes" en header y footer.
- ✅ Fixes RLS: políticas de escritura (WITH CHECK) y recursión en `profiles`.
- ✅ Analizado todo el material real de `D:\` (fichas, fotos, obras, logos).
- ✅ Creado este README maestro.
- ⚠️ Detectado: la razón social correcta es **S.L.** (no S.A.).
- 🔄 Pendiente: integrar datos reales (productos con specs de fichas, fotos, obras, logo oficial).
