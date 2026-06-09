-- =============================================
-- PREMOLSA – Seed de productos REALES con fichas técnicas
-- Ejecutar DESPUÉS de: schema + fixes RLS + storage + subida de assets
-- Las URLs apuntan a Supabase Storage (buckets públicos productos/ y fichas/)
-- =============================================

-- Limpia productos de ejemplo previos (opcional)
-- delete from public.products;

-- Helper: base de Storage
-- https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/{bucket}/{archivo}

insert into public.products (category_id, name, slug, description, specs, image_url, pdf_url, visible) values

-- ───────── BLOQUES DE HORMIGÓN (con ficha CE) ─────────
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque de hormigón 390×190×90',
  'bloque-hormigon-390x190x90',
  'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). 135 piezas por palet.',
  '{"Dimensiones":"390 × 190 × 90 mm","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"EI-60 (árido calizo)","Absorción de agua":"9,8 g/m²s","Variación por humedad":"0,36 mm/m","Densidad aparente seca":"1123 kg/m³","Densidad absoluta seca":"2174 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"1150 kg aprox.","Unidades por palet":"135","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/bloque-hormigon.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/bloque-390x190x90.pdf',
  true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque de hormigón 390×190×140',
  'bloque-hormigon-390x190x140',
  'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). 95 piezas por palet.',
  '{"Dimensiones":"390 × 190 × 140 mm","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"REI-90 (árido calizo)","Absorción de agua":"9,8 g/m²s","Variación por humedad":"0,58 mm/m","Densidad aparente seca":"948 kg/m³","Densidad absoluta seca":"2017 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"1050 kg aprox.","Unidades por palet":"95","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/bloque-hormigon.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/bloque-390x190x140.pdf',
  true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque de hormigón 390×190×190',
  'bloque-hormigon-390x190x190',
  'Bloque de hormigón vibroprensado para muros, columnas y particiones. Categoría D1. Marcado CE (0370). Excelente resistencia al fuego REI-180. 70 piezas por palet.',
  '{"Dimensiones":"390 × 190 × 190 mm","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"REI-180 (árido calizo)","Absorción de agua":"9,8 g/m²s","Variación por humedad":"0,58 mm/m","Densidad aparente seca":"829 kg/m³","Densidad absoluta seca":"1975 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"860 kg aprox.","Unidades por palet":"70","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/bloque-hormigon.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/bloque-390x190x190.pdf',
  true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque de hormigón hidrófugo 390×190×190',
  'bloque-hormigon-hidrofugo-390x190x190',
  'Bloque de hormigón hidrófugo para muros expuestos. Baja absorción de agua (<2 g/m²s). Categoría D1. Marcado CE (0370).',
  '{"Dimensiones":"390 × 190 × 190 mm","Tipo":"Hidrófugo","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"REI-180 (árido calizo)","Absorción de agua":"<2 g/m²s","Variación por humedad":"0,58 mm/m","Densidad aparente seca":"829 kg/m³","Densidad absoluta seca":"1975 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"860 kg aprox.","Unidades por palet":"70","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/bloque-hormigon.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/bloque-390x190x190-hidrofugo.pdf',
  true
),

-- ───────── DINTELES (con ficha CE) ─────────
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque dintel hidrófugo 390×190×140',
  'bloque-dintel-hidrofugo-390x190x140',
  'Bloque dintel hidrófugo en forma de U para zunchos y dinteles. Categoría D1. Marcado CE (0370). 85 piezas por palet.',
  '{"Dimensiones":"390 × 190 × 140 mm","Tipo":"Dintel hidrófugo","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"RE-90 (árido calizo)","Absorción de agua":"<2 g/m²s","Variación por humedad":"0,15 mm/m","Densidad aparente seca":"1284 kg/m³","Densidad absoluta seca":"2127 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"1150 kg aprox.","Unidades por palet":"85","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/dintel.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/dintel-390x190x140.pdf',
  true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Bloque dintel hidrófugo 390×190×190',
  'bloque-dintel-hidrofugo-390x190x190',
  'Bloque dintel hidrófugo en forma de U para zunchos y dinteles. Categoría D1. Marcado CE (0370). 60 piezas por palet.',
  '{"Dimensiones":"390 × 190 × 190 mm","Tipo":"Dintel hidrófugo","Categoría":"D1","Uso":"Muros, columnas y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"REI-180 (árido calizo)","Absorción de agua":"<2 g/m²s","Variación por humedad":"0,15 mm/m","Densidad aparente seca":"1284 kg/m³","Densidad absoluta seca":"2127 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"900 kg aprox.","Unidades por palet":"60","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/dintel.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/dintel-390x190x190.pdf',
  true
),

-- ───────── GERO (con ficha CE) ─────────
(
  (select id from public.categories where slug = 'albanileria'),
  'Gero de hormigón 250×100×120',
  'gero-hormigon-250x100x120',
  'Gero de hormigón para muros, tabiques y particiones. Excelente aislamiento acústico (Rw 51 dB). Categoría D1. Marcado CE (0370). 280 piezas por palet.',
  '{"Dimensiones":"250 × 100 × 120 mm","Categoría":"D1","Uso":"Muros, tabiques y particiones","Resistencia a compresión":">6 N/mm²","Reacción al fuego":"Clase A1","Resistencia al fuego":"REI-120 (árido calizo)","Aislamiento acústico":"Rw (C;Ctr)=51(0;-1) dB","Absorción de agua":"<13%","Variación por humedad":"0,76 mm/m","Densidad aparente seca":"1335 kg/m³","Densidad absoluta seca":"2013 kg/m³","Resistencia hielo-deshielo":"Sin deterioro","Peso del palet":"1000 kg aprox.","Unidades por palet":"280","Normativa":"EN 771-3:2011+A1:2016"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/gero.jpg',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/fichas/gero-250x100x120.pdf',
  true
),

-- ───────── PRODUCTOS CON FOTO (sin ficha individual) ─────────
(
  (select id from public.categories where slug = 'forjados'),
  'Semivigueta armada',
  'semivigueta-armada',
  'Semivigueta armada de hormigón para forjados unidireccionales. Cálculo de estructuras personalizado.',
  '{"Material":"Hormigón armado","Aplicación":"Forjados unidireccionales","Servicio":"Cálculo de estructuras incluido"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/semivigueta.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'forjados'),
  'Bovedilla de hormigón',
  'bovedilla-hormigon',
  'Bovedilla de hormigón para forjados. Disponible también en arlita y porexpán.',
  '{"Material":"Hormigón (también arlita y porexpán)","Aplicación":"Forjados unidireccionales"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/bovedilla.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'forjados'),
  'Vigueta pretensada',
  'vigueta-pretensada',
  'Vigueta pretensada para forjados de mayor luz y resistencia.',
  '{"Material":"Hormigón pretensado","Aplicación":"Forjados unidireccionales"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/vigueta-pretensada.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'forjados'),
  'Placas alveolares',
  'placas-alveolares',
  'Placas alveolares de hormigón pretensado para forjados de gran luz.',
  '{"Material":"Hormigón pretensado","Aplicación":"Forjados de gran luz"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/placas-alveolares.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Placa de tejado / valla',
  'placa-tejado-valla',
  'Placas de hormigón para tejado o cerramiento de valla. Varios formatos disponibles.',
  '{"Material":"Hormigón","Formatos":"150×50, 200×50 cm","Aplicación":"Tejado y cerramientos"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/placa-tejado.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Dados de hormigón antivehículo',
  'dados-hormigon',
  'Dados de hormigón para impedir el paso de vehículos. También piezas de contrapeso.',
  '{"Material":"Hormigón","Aplicación":"Control de acceso de vehículos / contrapeso"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/dados.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'albanileria'),
  'Albardilla',
  'albardilla',
  'Albardilla de hormigón para remate y protección de muros frente al agua.',
  '{"Material":"Hormigón","Aplicación":"Remate de muros"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/albardilla.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'hierro'),
  'Ferralla',
  'ferralla',
  'Ferralla y armaduras de hierro para forjado a medida.',
  '{"Material":"Acero corrugado","Aplicación":"Armaduras a medida"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/ferralla.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'hierro'),
  'Celosía electrosoldada',
  'celosia-electrosoldada',
  'Celosía electrosoldada para refuerzo de forjados y muros.',
  '{"Material":"Acero electrosoldado","Aplicación":"Refuerzo estructural"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/celosia.jpg',
  null, true
),
(
  (select id from public.categories where slug = 'accesorios'),
  'Separadores de plástico',
  'separadores-plastico',
  'Separadores de plástico para forjados y losas. Garantizan el recubrimiento correcto de las armaduras.',
  '{"Material":"Plástico","Aplicación":"Recubrimiento de armaduras en forjados y losas"}',
  'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public/productos/separador.jpg',
  null, true
);
