import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const TEMPLATES = [
  {
    id: 'recommended',
    color: '#a855f7',
    gradient: 'from-violet-600/20 via-fuchsia-600/15 to-violet-600/20',
    ring: 'hover:ring-violet-500/50',
    recommended: true,
    tagline: 'Máxima compatibilidad ATS',
    Preview: () => (
      <div className="bg-white rounded-xl p-4 h-full shadow-inner">
        <div className="border-b-2 border-slate-900 pb-2 mb-3">
          <div className="h-3 w-28 bg-slate-900 rounded mb-1.5" />
          <div className="flex gap-1.5">
            <div className="h-1 w-12 bg-slate-400 rounded" />
            <div className="h-1 w-10 bg-slate-400 rounded" />
            <div className="h-1 w-8 bg-slate-400 rounded" />
          </div>
        </div>
        <div className="h-1.5 w-16 bg-slate-800 rounded mb-1.5" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-2.5" />
        <div className="h-1.5 w-14 bg-slate-800 rounded mb-1.5" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-4/5 bg-slate-300 rounded mb-2.5" />
        <div className="h-1.5 w-12 bg-slate-800 rounded mb-1.5" />
        <div className="h-0.5 w-3/4 bg-slate-300 rounded" />
      </div>
    ),
  },
  {
    id: 'moderno',
    color: '#3b82f6',
    gradient: 'from-blue-600/15 to-blue-900/10',
    ring: 'hover:ring-blue-500/40',
    recommended: false,
    tagline: 'Para empresas tech',
    Preview: () => (
      <div className="bg-white rounded-xl h-full flex overflow-hidden shadow-inner">
        <div className="w-2/5 bg-slate-700 p-3">
          <div className="w-8 h-8 rounded-full bg-blue-400 mx-auto mb-2" />
          <div className="h-1 bg-blue-300 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded mb-2" />
          <div className="h-1 bg-blue-300 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded mb-0.5" />
          <div className="h-0.5 bg-slate-400 rounded" />
        </div>
        <div className="flex-1 p-3">
          <div className="h-1.5 w-3/4 bg-blue-500 rounded mb-1.5" />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-2" />
          <div className="h-1.5 w-2/3 bg-blue-500 rounded mb-1" />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-4/5 bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimalista',
    color: '#94a3b8',
    gradient: 'from-slate-600/10 to-slate-900/10',
    ring: 'hover:ring-slate-400/40',
    recommended: false,
    tagline: 'Menos es más',
    Preview: () => (
      <div className="bg-white rounded-xl p-4 h-full shadow-inner">
        <div className="h-4 w-28 bg-slate-900 rounded mb-1.5" style={{ fontWeight: 300 }} />
        <div className="h-0.5 w-24 bg-slate-300 rounded mb-3" />
        <div className="h-[1px] w-full bg-slate-300 mb-3" />
        <div className="h-0.5 w-14 bg-slate-500 rounded mb-1.5" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-3" />
        <div className="h-0.5 w-14 bg-slate-500 rounded mb-1.5" />
        <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
        <div className="h-0.5 w-3/4 bg-slate-300 rounded" />
      </div>
    ),
  },
  {
    id: 'creativo',
    color: '#ec4899',
    gradient: 'from-pink-600/15 to-purple-900/20',
    ring: 'hover:ring-pink-500/40',
    recommended: false,
    tagline: 'Para mostrar personalidad',
    Preview: () => (
      <div className="bg-white rounded-xl h-full flex overflow-hidden shadow-inner">
        <div className="w-2/5 bg-gradient-to-b from-purple-800 to-purple-950 p-3">
          <div className="w-8 h-8 rounded-full bg-pink-400 mx-auto mb-2" />
          <div className="h-1 w-full bg-pink-300 rounded mb-1.5" />
          <div className="flex gap-1 flex-wrap mb-1.5">
            <div className="h-2 w-5 rounded-full bg-pink-400/60" />
            <div className="h-2 w-6 rounded-full bg-pink-400/60" />
            <div className="h-2 w-4 rounded-full bg-pink-400/60" />
          </div>
          <div className="h-0.5 bg-slate-300 rounded" />
        </div>
        <div className="flex-1 p-3">
          <div className="h-1.5 w-2/3 bg-pink-600 rounded mb-1" />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-4/5 bg-slate-300 rounded mb-2" />
          <div className="bg-pink-50 border-l-2 border-pink-500 p-1.5 rounded mb-1">
            <div className="h-0.5 w-3/4 bg-slate-400 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'ejecutivo',
    color: '#f59e0b',
    gradient: 'from-amber-600/15 to-amber-900/10',
    ring: 'hover:ring-amber-500/40',
    recommended: false,
    tagline: 'Para roles senior y C-level',
    Preview: () => (
      <div className="bg-white rounded-xl p-3 h-full shadow-inner">
        <div className="text-center pb-2 border-b-2" style={{ borderColor: '#0f2d5e' }}>
          <div className="h-2.5 w-24 mx-auto rounded mb-1" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-28 mx-auto bg-slate-400 rounded" />
        </div>
        <div className="mt-2">
          <div className="h-2 w-full rounded mb-1.5" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-2" />
          <div className="h-2 w-full rounded mb-1.5" style={{ background: '#0f2d5e' }} />
          <div className="h-0.5 w-full bg-slate-300 rounded mb-0.5" />
          <div className="h-0.5 w-4/5 bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
]

export default function TemplateSelector() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const recommended = TEMPLATES.find(tt => tt.recommended)
  const others = TEMPLATES.filter(tt => !tt.recommended)

  const renderCard = (tmpl, featured = false) => (
    <button
      key={tmpl.id}
      onClick={() => navigate(`/form/${tmpl.id}`)}
      className={`relative text-left bg-gradient-to-br ${tmpl.gradient} border border-white/10 rounded-3xl p-6 lg:p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 hover:ring-2 ${tmpl.ring} group cursor-pointer ${featured ? 'lg:flex-row lg:items-stretch lg:gap-8 lg:p-8' : ''}`}
    >
      {tmpl.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-black tracking-[0.25em] px-4 py-1.5 rounded-full shadow-lg shadow-violet-500/50 whitespace-nowrap z-10">
          ★ {t('templates.recommended_badge')}
        </div>
      )}

      <div className={`rounded-2xl overflow-hidden bg-white/5 p-2 group-hover:scale-[1.02] transition-transform duration-300 ${featured ? 'h-56 lg:h-72 lg:w-1/2 lg:shrink-0' : 'h-48 lg:h-56'}`}>
        <tmpl.Preview />
      </div>

      <div className={`flex-1 flex flex-col gap-2 ${featured ? 'lg:justify-center lg:gap-4' : ''}`}>
        <div className={`flex items-baseline gap-2 ${featured ? 'flex-col items-start gap-1' : 'justify-between'}`}>
          <h3 className={`font-black tracking-[0.15em] ${featured ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'}`} style={{ color: tmpl.color }}>
            {t(`templates.${tmpl.id}_name`)}
          </h3>
          <span className={`text-xs shrink-0 ${featured ? 'text-slate-400' : 'text-slate-500'}`}>{tmpl.tagline}</span>
        </div>
        <p className={`text-slate-300 leading-relaxed ${featured ? 'text-sm lg:text-base' : 'text-sm lg:text-base'}`}>
          {t(`templates.${tmpl.id}_desc`)}
        </p>

        <div
          className={`py-3 rounded-xl font-bold text-sm text-center text-white transition-all group-hover:scale-[1.02] ${featured ? 'mt-2 lg:mt-4' : 'mt-auto'}`}
          style={{ background: tmpl.color, boxShadow: `0 0 24px ${tmpl.color}40` }}
        >
          {t('templates.select_btn')} →
        </div>
      </div>
    </button>
  )

  return (
    <main className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-20">
      <div className="text-center mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 text-white leading-[1.05] tracking-tight">
          {t('templates.title')}
        </h1>
        <p className="text-slate-400 text-base lg:text-lg max-w-xl mx-auto">
          {t('templates.subtitle')}
        </p>
      </div>

      {recommended && (
        <div className="mb-6 lg:mb-8">
          {renderCard(recommended, true)}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
        {others.map(tmpl => renderCard(tmpl, false))}
      </div>
    </main>
  )
}
