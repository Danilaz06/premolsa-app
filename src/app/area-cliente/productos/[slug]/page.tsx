import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PdfViewer from '@/components/PdfViewer'

export default async function ProductoFichaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .eq('slug', slug)
    .eq('visible', true)
    .single()

  if (!product) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/area-cliente" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a56db] mb-8 transition-colors">
        <ArrowLeft size={16} /> Volver a fichas técnicas
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="w-full h-60 object-cover" />
        )}
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              {product.category && (
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db] bg-blue-50 px-2.5 py-1 rounded-full">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl font-black text-gray-900 mt-3">{product.name}</h1>
            </div>
            {product.pdf_url && (
              <div className="flex-shrink-0">
                <PdfViewer url={product.pdf_url} title={product.name} label="Ver ficha técnica" />
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
          )}

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Especificaciones técnicas</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs as Record<string, string>).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-5 py-3 font-semibold text-gray-700 w-1/2">{key}</td>
                        <td className="px-5 py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
