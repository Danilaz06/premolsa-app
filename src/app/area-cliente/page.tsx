import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import PdfViewer from '@/components/PdfViewer'

export default async function AreaClientePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, category:categories(name, slug)')
    .eq('visible', true)
    .order('name')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order')

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Fichas técnicas</h1>
        <p className="text-gray-500">Accede a la documentación técnica de todos nuestros productos.</p>
      </div>

      {!products?.length ? (
        <div className="text-center py-20 text-gray-400">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p>Aún no hay fichas disponibles.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {categories?.map(cat => {
            const catProducts = products?.filter(p => p.category_id === cat.id) ?? []
            if (!catProducts.length) return null
            return (
              <div key={cat.id}>
                <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catProducts.map(product => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-36 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/area-cliente/productos/${product.slug}`}
                          className="flex-1 text-center text-sm font-medium text-gray-600 border border-gray-200 py-2 rounded-lg hover:border-[#1a56db] hover:text-[#1a56db] transition-colors"
                        >
                          Detalles
                        </Link>
                        {product.pdf_url && (
                          <div className="flex-1">
                            <PdfViewer url={product.pdf_url} title={product.name} label="Ver ficha" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
