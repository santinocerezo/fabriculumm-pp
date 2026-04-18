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

  const renderCard = (tmpl) => (
    <button
      key={tmpl.id}
      onClick={() => navigate(`/form/${tmpl.id}`)}
      className={`relative text-left bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:ring-1 ${tmpl.ring} group cursor-pointer`}
    >
      {tmpl.recommended && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-[10px] font-black tracking-[0.25em] px-3 py-1 rounded-full whitespace-nowrap z-10">
          ★ {t('templates.recommended_badge')}
        </div>
      )}

      <div className="rounded-xl overflow-hidden bg-black/20 p-2 h-48 group-hover:scale-[1.02] transition-transform duration-300">
        <tmpl.Preview />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold tracking-[0.15em] uppercase text-sm" style={{ color: tmpl.color }}>
          {t(`templates.${tmpl.id}_name`)}
        </h3>
        <span className="text-slate-500 text-lg group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
      </div>
    </button>
  )

  return (
    <main className="container-page py-20 lg:py-28">
      <div className="text-center max-w-xl mx-auto mb-14 lg:mb-16">
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400 mb-4">Templates</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
          {t('templates.title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map(tmpl => renderCard(tmpl))}
      </div>
    </main>
  )
}
