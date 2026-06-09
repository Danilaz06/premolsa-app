'use client'
import { useState, useEffect } from 'react'
import { FileText, Download, ExternalLink, X } from 'lucide-react'

interface Props {
  url: string
  title?: string
  /** Estilo del botón que abre el visor */
  variant?: 'primary' | 'outline' | 'compact'
  label?: string
}

export default function PdfViewer({ url, title = 'Ficha técnica', variant = 'primary', label }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const btnClass =
    variant === 'primary'
      ? 'w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#15803d] px-4 py-2 rounded-lg hover:bg-[#166534] transition-colors'
      : variant === 'outline'
      ? 'w-full flex items-center justify-center gap-2 text-sm font-medium text-[#15803d] border border-[#15803d] px-4 py-2 rounded-lg hover:bg-green-50 transition-colors'
      : 'flex items-center gap-1 text-sm font-medium text-[#15803d] hover:underline'

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnClass}>
        <FileText size={variant === 'compact' ? 14 : 16} />
        {label ?? 'Ver ficha técnica'}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex flex-col"
          onClick={() => setOpen(false)}
        >
          {/* Barra superior */}
          <div
            className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm"
            onClick={e => e.stopPropagation()}
          >
            <FileText size={20} className="text-[#15803d] flex-shrink-0" />
            <span className="font-semibold text-gray-900 truncate flex-1">{title}</span>

            <a
              href={url}
              target="_blank"
              rel="noopener"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#15803d] px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink size={16} /> Abrir
            </a>
            <a
              href={url}
              download
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#15803d] px-3 py-1.5 rounded-lg hover:bg-[#166534] transition-colors"
              title="Descargar PDF"
            >
              <Download size={16} /> <span className="hidden sm:inline">Descargar</span>
            </a>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cerrar (Esc)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Documento */}
          <div className="flex-1 p-2 sm:p-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <iframe
              src={`${url}#view=FitH`}
              title={title}
              className="w-full h-full rounded-lg bg-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
