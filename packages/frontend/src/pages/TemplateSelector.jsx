import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TEMPLATES = [
  {
    id: 'recommended',
    color: '#a855f7',
    bg: 'from-violet-900/40 to-fuchsia-900/40',
    border: 'border-violet-500/50',
    recommended: true,
    preview: '▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬\n\n▬▬▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬▬\n\n▬▬▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬',
  },
  {
    id: 'moderno',
    color: '#3b82f6',
    bg: 'from-blue-900/30 to-blue-900/10',
    border: 'border-blue-500/30',
    recommended: false,
    preview: '██ ▬▬▬▬▬▬▬▬\n██ ▬▬▬▬▬▬\n██\n██ ▬▬▬▬▬▬▬▬▬\n██ ▬▬▬▬\n██ ▬▬▬▬▬▬▬▬',
  },
  {
    id: 'minimalista',
    color: '#94a3b8',
    bg: 'from-slate-800/30 to-slate-900/10',
    border: 'border-slate-500/30',
    recommended: false,
    preview: '▬▬▬▬▬▬▬▬▬▬▬\n▬▬▬▬\n\n▬▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬▬▬',
  },
  {
    id: 'creativo',
    color: '#ec4899',
    bg: 'from-pink-900/30 to-pink-900/10',
    border: 'border-pink-500/30',
    recommended: false,
    preview: '██ ▬▬▬▬▬▬▬\n██ [●][●][●]\n██\n██ ▬▬▬▬▬▬▬▬▬\n██ ▬▬▬▬▬▬',
  },
  {
    id: 'ejecutivo',
    color: '#f59e0b',
    bg: 'from-amber-900/30 to-amber-900/10',
    border: 'border-amber-500/30',
    recommended: false,
    preview: '══════════════\n▬▬▬▬▬▬▬▬▬▬▬\n══════════════\n▬▬▬▬▬▬▬▬\n▬▬▬▬▬▬▬▬▬▬▬',
  },
]

export default function TemplateSelector() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const nameKey = (id) => `templates.${id === 'recommended' ? 'recommended' : id}_name`
  const descKey = (id) => `templates.${id === 'recommended' ? 'recommended' : id}_desc`

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-3">{t('templates.title')}</h1>
        <p className="text-slate-400">{t('templates.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map(tmpl => (
          <div
            key={tmpl.id}
            className={`relative bg-gradient-to-br ${tmpl.bg} border ${tmpl.border} rounded-2xl p-6 flex flex-col gap-4 hover:scale-105 transition-all cursor-pointer group`}
            onClick={() => navigate(`/form/${tmpl.id}`)}
          >
            {tmpl.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-black tracking-widest px-4 py-1 rounded-full shadow-lg shadow-violet-500/40">
                ★ {t('templates.recommended_badge')}
              </div>
            )}

            {/* ASCII preview */}
            <div className="bg-white/5 rounded-xl p-4 font-mono text-xs leading-relaxed whitespace-pre text-slate-500 min-h-28">
              {tmpl.preview}
            </div>

            <div>
              <h3 className="font-black tracking-wider text-sm mb-1" style={{ color: tmpl.color }}>
                {t(nameKey(tmpl.id))}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t(descKey(tmpl.id))}</p>
            </div>

            <button
              className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm transition-all text-white"
              style={{ background: tmpl.color + '22', border: `1px solid ${tmpl.color}60` }}
              onClick={(e) => { e.stopPropagation(); navigate(`/form/${tmpl.id}`) }}
            >
              {t('templates.select_btn')} →
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
