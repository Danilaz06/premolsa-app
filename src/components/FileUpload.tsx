'use client'
import { useRef, useState } from 'react'
import { Upload, FileText, X, Loader2, CheckCircle2 } from 'lucide-react'

interface Props {
  bucket: 'productos' | 'fichas' | 'obras'
  kind: 'image' | 'pdf'
  value: string
  onChange: (url: string) => void
  label: string
}

// Redimensiona y comprime imágenes en el navegador antes de subir
async function optimizeImage(file: File): Promise<Blob> {
  const img = await createImageBitmap(file)
  const maxW = 1400
  const scale = Math.min(1, maxW / img.width)
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
  return new Promise(res => canvas.toBlob(b => res(b!), 'image/jpeg', 0.85))
}

export default function FileUpload({ bucket, kind, value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done'>('idle')
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setError('')
    setStatus('uploading')
    try {
      let body: Blob = file
      let filename = file.name

      if (kind === 'image') {
        if (!file.type.startsWith('image/')) throw new Error('Selecciona un archivo de imagen.')
        body = await optimizeImage(file)
        filename = file.name.replace(/\.[^.]+$/, '') + '.jpg'
      } else if (file.type !== 'application/pdf') {
        throw new Error('Selecciona un archivo PDF.')
      }

      const fd = new FormData()
      fd.append('file', body, filename)
      fd.append('bucket', bucket)

      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al subir')

      onChange(json.url)
      setStatus('done')
    } catch (e: unknown) {
      const err = e as { message?: string }
      setError(err.message ?? 'Error al subir el archivo.')
      setStatus('idle')
    }
  }

  const clear = () => {
    onChange('')
    setStatus('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept={kind === 'image' ? 'image/*' : 'application/pdf'}
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {/* Vista previa si ya hay archivo */}
      {value && status !== 'uploading' ? (
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-gray-50">
          {kind === 'image' ? (
            <img src={value} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <FileText className="text-red-500" size={24} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-medium text-green-700">
              <CheckCircle2 size={15} /> Archivo subido
            </p>
            <a href={value} target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#1a56db] truncate block">
              Ver archivo
            </a>
          </div>
          <button type="button" onClick={() => inputRef.current?.click()} className="text-xs font-medium text-[#1a56db] hover:underline px-2">
            Cambiar
          </button>
          <button type="button" onClick={clear} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Quitar">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === 'uploading'}
          className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-6 text-gray-500 hover:border-[#1a56db] hover:text-[#1a56db] hover:bg-blue-50/40 transition-colors disabled:opacity-60"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm font-medium">Subiendo…</span>
            </>
          ) : (
            <>
              <Upload size={24} />
              <span className="text-sm font-medium">
                {kind === 'image' ? 'Subir foto desde tu dispositivo' : 'Subir PDF desde tu dispositivo'}
              </span>
              <span className="text-xs text-gray-400">{kind === 'image' ? 'JPG, PNG, WEBP' : 'Archivo PDF'}</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
