import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TEMPLATES = [
  {
    id: 'recommended',
    color: '#a855f7',
    gradient: 'from-violet-600/30 via-fuchsia-600/20 to-violet-600/30',
    ring: 'ring-violet-500/40',
    recommended: true,
    Preview: () => (
      <div className="bg-white rounded-lg p-3 h-full">
        <div className="border-b-2 border-slate-900 pb-1 mb-2">
          <div className="h-2.5 w-20 bg-slate-900 rounded mb-1" />
          <div className="flex gap-1">
            <div className="h-1 w-10 bg-slate-400 rounded" />
            <div className="h-1 w-8 bg-slate-400 rounded" />
          </div>
        </div>
        <div className="h-1.5 w-14 bg-slate-800 rounded mb-1" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-2" />
        <div className="h-1.5 w-12 bg-slate-800 rounded mb-1" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-4/5 bg-slate-300 rounded" />
      </div>
    ),
  },
  {
    id: 'moderno',
    color: '#3b82f6',
    gradient: 'from-blue-600/20 to-blue-900/10',
    ring: 'ring-blue-500/30',
    recommended: false,
    Preview: () => (
      <div className="bg-white rounded-lg h-full flex overflow-hidden">
        <div className="w-1/3 bg-slate-700 p-2">
          <div className="w-6 h-6 rounded-full bg-blue-400 mx-auto mb-1.5" />
          <div className="h-1 bg-blue-300 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded mb-1" />
          <div className="h-1 bg-blue-300 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded" />
        </div>
        <div className="flex-1 p-2">
          <div className="h-1 w-3/4 bg-blue-500 rounded mb-1" />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-1.5" />
          <div className="h-1 w-2/3 bg-blue-500 rounded mb-1" />
          <div className="h-0.5 w-full bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimalista',
    color: '#94a3b8',
    gradient: 'from-slate-600/10 to-slate-900/10',
    ring: 'ring-slate-500/30',
    recommended: false,
    Preview: () => (
      <div className="bg-white rounded-lg p-3 h-full">
        <div className="h-3 w-24 bg-slate-900 rounded mb-1 font-light" />
        <div className="h-0.5 w-20 bg-slate-300 rounded mb-2" />
        <div className="h-[1px] w-full bg-slate-300 mb-2" />
        <div className="h-0.5 w-12 bg-slate-500 uppercase mb-1" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-2" />
        <div className="h-0.5 w-12 bg-slate-500 uppercase mb-1" />
        <div className="h-0.5 w-full bg-slate-300 rounded" />
      </div>
    ),
  },
  {
    id: 'creativo',
    color: '#ec4899',
    gradient: 'from-pink-600/20 to-purple-900/20',
    ring: 'ring-pink-500/30',
    recommended: false,
    Preview: () => (
      <div className="bg-white rounded-lg h-full flex overflow-hidden">
        <div className="w-2/5 bg-gradient-to-b from-purple-700 to-purple-900 p-2">
          <div className="w-6 h-6 rounded-full bg-pink-400 mx-auto mb-1" />
          <div className="h-1 w-full bg-pink-300 rounded mb-0.5" />
          <div className="flex gap-0.5 mb-1 flex-wrap">
            <div className="h-1.5 w-4 rounded-full bg-pink-400/50" />
            <div className="h-1.5 w-5 rounded-full bg-pink-400/50" />
            <div className="h-1.5 w-4 rounded-full bg-pink-400/50" />
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="h-1 w-2/3 bg-pink-600 rounded mb-0.5" />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-4/5 bg-slate-300 rounded mb-1.5" />
          <div className="bg-pink-50 border-l-2 border-pink-500 p-1 rounded">
            <div className="h-0.5 w-3/4 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'ejecutivo',
    color: '#f59e0b',
    gradient: 'from-amber-600/20 to-amber-900/10',
    ring: 'ring-amber-500/30',
    recommended: false,
    Preview: () => (
      <div className="bg-white rounded-lg p-2 h-full">
        <div className="text-center pb-1.5 border-b-2" style={{ borderColor: '#0f2d5e' }}>
          <div className="h-2 w-20 mx-auto rounded mb-1" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-24 mx-auto bg-slate-400 rounded" />
        </div>
        <div className="mt-1.5">
          <div className="h-1.5 w-full rounded mb-1" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-1.5" />
          <div className="h-1.5 w-full rounded mb-1" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-full bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
]

export default function TemplateSelector() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const nameKey = (id) => `templates.${id}_name`
  const descKey = (id) => `templates.${id}_desc`

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-5xl font-black mb-3 text-white">{t('templates.title')}</h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">{t('templates.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {TEMPLATES.map(tmpl => (
          <button
            key={tmpl.id}
            onClick={() => navigate(`/form/${tmpl.id}`)}
            className={`relative text-left bg-gradient-to-br ${tmpl.gradient} border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:ring-2 ${tmpl.ring} group cursor-pointer`}
          >
            {tmpl.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 sm:px-4 py-1 rounded-full shadow-lg shadow-violet-500/50 whitespace-nowrap">
                ★ {t('templates.recommended_badge')}
              </div>
            )}

            {/* Visual preview */}
            <div className="h-40 sm:h-44 rounded-2xl overflow-hidden bg-white/5 p-2 group-hover:scale-[1.02] transition-transform">
              <tmpl.Preview />
            </div>

            <div className="flex-1">
              <h3 className="font-black tracking-wider text-base sm:text-lg mb-2" style={{ color: tmpl.color }}>
                {t(nameKey(tmpl.id))}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{t(descKey(tmpl.id))}</p>
            </div>

            <div
              className="py-2.5 rounded-xl font-bold text-sm text-center text-white transition-all group-hover:scale-[1.02]"
              style={{ background: tmpl.color, boxShadow: `0 0 20px ${tmpl.color}50` }}
            >
              {t('templates.select_btn')} →
            </div>
          </button>
        ))}
      </div>
    </main>
  )
}
