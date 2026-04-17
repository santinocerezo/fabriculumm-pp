import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ATSCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 transition-all">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const GuideCard = ({ name, desc, accent }) => (
  <div className={`border rounded-xl p-5 hover:scale-105 transition-transform cursor-default`} style={{ borderColor: accent + '40', background: accent + '08' }}>
    <div className="font-black text-sm tracking-widest mb-2" style={{ color: accent }}>{name}</div>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

export default function Landing() {
  const { t } = useTranslation()

  return (
    <main>
      {/* Ad top banner placeholder */}
      <div className="w-full bg-white/3 border-b border-white/5 h-16 flex items-center justify-center">
        <span className="text-xs text-white/20 tracking-widest">PUBLICIDAD</span>
      </div>

      <div className="flex">
        {/* Ad left sidebar */}
        <aside className="hidden xl:flex w-36 shrink-0 items-start justify-center pt-20 sticky top-14 h-screen">
          <div className="w-28 h-64 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center">
            <span className="text-xs text-white/20 tracking-widest [writing-mode:vertical-rl]">PUBLICIDAD</span>
          </div>
        </aside>

        <div className="flex-1 max-w-5xl mx-auto px-4">
          {/* ── Hero ── */}
          <section className="py-20 text-center">
            <div className="inline-block bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-8">
              ✨ 100% GRATIS · SIN REGISTRO
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              {t('landing.hero_title')}<br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {t('landing.hero_highlight')}
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('landing.hero_subtitle')}
            </p>
            <Link
              to="/templates"
              className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-violet-500/25 transition-all hover:scale-105 hover:shadow-violet-500/40"
            >
              {t('landing.hero_cta')} →
            </Link>
            <p className="text-slate-500 text-sm mt-4">{t('landing.hero_cta_sub')}</p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {[['5', 'Templates profesionales'], ['ATS', 'Optimizado para filtros IA'], ['PDF', 'Descarga instantánea'], ['0', 'Datos guardados']].map(([n, l]) => (
                <div key={n} className="text-center">
                  <div className="text-3xl font-black text-violet-400">{n}</div>
                  <div className="text-xs text-slate-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ATS section ── */}
          <section className="py-16 border-t border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{t('landing.ats_title')}</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('landing.ats_subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ATSCard icon="🏗️" title={t('landing.ats_1_title')} desc={t('landing.ats_1_desc')} />
              <ATSCard icon="🔑" title={t('landing.ats_2_title')} desc={t('landing.ats_2_desc')} />
              <ATSCard icon="🔤" title={t('landing.ats_3_title')} desc={t('landing.ats_3_desc')} />
              <ATSCard icon="📋" title={t('landing.ats_4_title')} desc={t('landing.ats_4_desc')} />
            </div>

            {/* RECOMMENDED highlight box */}
            <div className="mt-10 bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40 border border-violet-500/30 rounded-2xl p-8 text-center">
              <div className="inline-block bg-violet-500 text-white text-xs font-black tracking-widest px-3 py-1 rounded-full mb-4">★ RECOMMENDED</div>
              <h3 className="text-xl font-black text-white mb-2">El único template que garantiza máxima compatibilidad ATS</h3>
              <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                Desarrollado siguiendo las guías oficiales de LinkedIn, Indeed, Workday y SAP SuccessFactors.
                Una columna, tipografía Arial/Helvetica, sin tablas, sin imágenes. Exactamente lo que los algoritmos quieren leer.
              </p>
            </div>
          </section>

          {/* ── Guide section ── */}
          <section className="py-16 border-t border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{t('landing.guide_title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <GuideCard name={t('landing.guide_recommended_title')} desc={t('landing.guide_recommended_desc')} accent="#a855f7" />
              <GuideCard name={t('landing.guide_moderno_title')} desc={t('landing.guide_moderno_desc')} accent="#3b82f6" />
              <GuideCard name={t('landing.guide_minimalista_title')} desc={t('landing.guide_minimalista_desc')} accent="#6b7280" />
              <GuideCard name={t('landing.guide_creativo_title')} desc={t('landing.guide_creativo_desc')} accent="#ec4899" />
              <GuideCard name={t('landing.guide_ejecutivo_title')} desc={t('landing.guide_ejecutivo_desc')} accent="#f59e0b" />
            </div>
          </section>

          {/* ── CTA bottom ── */}
          <section className="py-20 text-center border-t border-white/5">
            <h2 className="text-4xl font-black mb-8">{t('landing.cta_title')}</h2>
            <Link
              to="/templates"
              className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
            >
              {t('landing.cta_btn')} 🚀
            </Link>
          </section>
        </div>

        {/* Ad right sidebar */}
        <aside className="hidden xl:flex w-36 shrink-0 items-start justify-center pt-20 sticky top-14 h-screen">
          <div className="w-28 h-64 bg-white/3 border border-white/5 rounded-xl flex items-center justify-center">
            <span className="text-xs text-white/20 tracking-widest [writing-mode:vertical-rl]">PUBLICIDAD</span>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-600">
        FABRICULUMM © 2025 · Todos los derechos reservados
      </footer>
    </main>
  )
}
