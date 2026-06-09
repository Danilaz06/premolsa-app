// URLs de los assets reales alojados en Supabase Storage (buckets públicos)
const BASE = 'https://swcmkxrwtxxctjehrwuc.supabase.co/storage/v1/object/public'

export const productos = {
  bloque: `${BASE}/productos/bloque-hormigon.jpg`,
  bovedilla: `${BASE}/productos/bovedilla.jpg`,
  gero: `${BASE}/productos/gero.jpg`,
  dados: `${BASE}/productos/dados.jpg`,
  placaTejado: `${BASE}/productos/placa-tejado.jpg`,
  semivigueta: `${BASE}/productos/semivigueta.jpg`,
  dintel: `${BASE}/productos/dintel.jpg`,
  albardilla: `${BASE}/productos/albardilla.jpg`,
  plaqueta: `${BASE}/productos/plaqueta.jpg`,
  separador: `${BASE}/productos/separador.jpg`,
  viguetaPretensada: `${BASE}/productos/vigueta-pretensada.jpg`,
  placasAlveolares: `${BASE}/productos/placas-alveolares.jpg`,
  ferralla: `${BASE}/productos/ferralla.jpg`,
  celosia: `${BASE}/productos/celosia.jpg`,
}

export interface Obra {
  img: string
  title: string
  location: string
  type: string
}

export const obras: Obra[] = [
  { img: `${BASE}/obras/almozara-home.jpg`,         title: 'Residencial Almozara 2000', location: 'Zaragoza', type: 'Edificio de viviendas' },
  { img: `${BASE}/obras/almozara-reina-isabel.jpg`, title: 'Residencial Reina Isabel', location: 'Almozara 2000, Zaragoza', type: 'Promoción residencial' },
  { img: `${BASE}/obras/almozara-lagos-coronas.jpg`,title: 'Lagos de Coronas', location: 'Almozara 2000, Zaragoza', type: 'Promoción residencial' },
  { img: `${BASE}/obras/almozara-23-viviendas.jpg`, title: '23 Viviendas de Protección Oficial', location: 'Almozara 2000, Zaragoza', type: 'Vivienda protegida' },
  { img: `${BASE}/obras/lobe-e10.jpg`,              title: 'Promoción LOBE E-10', location: 'Zaragoza', type: 'Edificio residencial' },
  { img: `${BASE}/obras/estructura.jpg`,            title: 'Estructura de forjado', location: 'Zaragoza', type: 'Suministro de estructura' },
]
