'use client'
import { useState } from 'react'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', email: '', tipo: '', mensaje: '', privacidad: false })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true); setLoading(false)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-green-950 py-24 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-300 bg-green-300/15 px-3 py-1 rounded-full mb-4">Estamos aquí</span>
          <h1 className="text-4xl font-black mb-4">Contacto</h1>
          <p className="text-white/70 text-lg">Solicita presupuesto o visítanos en Zaragoza.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-14">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-8">¿Cómo contactarnos?</h2>
            {[
              { icon: '📞', label: 'Teléfono', value: '976 292 347', href: 'tel:976292347' },
              { icon: '💬', label: 'WhatsApp', value: '678 379 129', href: 'https://wa.me/34678379129' },
              { icon: '✉️', label: 'Email', value: 'angelpremolsa@hotmail.com', href: 'mailto:angelpremolsa@hotmail.com' },
              { icon: '📍', label: 'Dirección', value: 'Camino Vado s/n, esq. Ronda Hispanidad\n50014 Zaragoza', href: 'https://maps.google.com/?q=41.656722,-0.852474' },
              { icon: '🕐', label: 'Horario', value: 'Lunes a viernes: 8:00 – 18:00 h', href: null },
            ].map(item => (
              <div key={item.label} className="flex gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="text-sm text-gray-500 hover:text-[#15803d] whitespace-pre-line transition-colors">{item.value}</a>
                  ) : (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            <a href="https://maps.google.com/?q=41.656722,-0.852474" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-[#15803d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#166534] transition-colors mt-2 mb-6">
              📍 Cómo llegar
            </a>

            <div className="rounded-xl overflow-hidden border border-gray-200 mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.7!2d-0.852474!3d41.656722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM5JzI0LjIiTiAwwrA1MScwOC45Ilc!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                className="w-full h-56 border-0"
                loading="lazy"
                title="Ubicación PREMOLSA"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-black text-gray-900 mb-6">Solicitar presupuesto</h2>
            {sent ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-500 text-sm">Nos pondremos en contacto contigo en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                    <input required value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Empresa</label>
                    <input value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono *</label>
                    <input required type="tel" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de consulta</label>
                  <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d]">
                    <option value="">Seleccionar…</option>
                    <option>Forjados y estructura</option>
                    <option>Albañilería y bloques</option>
                    <option>Hierro y ferralla</option>
                    <option>Cálculo de estructuras</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje *</label>
                  <textarea required value={form.mensaje} onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#15803d] resize-none" />
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" required id="privacidad" checked={form.privacidad} onChange={e => setForm(f => ({ ...f, privacidad: e.target.checked }))} className="mt-0.5 w-4 h-4" />
                  <label htmlFor="privacidad" className="text-xs text-gray-500">He leído y acepto la <a href="/politica-privacidad" className="text-[#15803d] underline">política de privacidad</a>.</label>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-[#166534] transition-colors disabled:opacity-60">
                  {loading ? 'Enviando…' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
