import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ATSCard = ({ icon, title, desc }) => (
  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-violet-500/50 hover:bg-white/[0.06] transition-all group">
    <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="font-bold text-white text-base sm:text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const GuideCard = ({ name, desc, accent }) => (
  <div
    className="border rounded-2xl p-5 transition-all hover:-translate-y-1"
    style={{ borderColor: accent + '40', background: `linear-gradient(135deg, ${accent}10, transparent)` }}
  >
    <div className="font-black text-sm tracking-widest mb-3" style={{ color: accent }}>{name}</div>
    <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
  </div>
)

export default function Landing() {
  const { t } = useTranslation()

  return (
    <main className="overflow-x-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Ad top banner */}
      <div className="w-full bg-white/[0.02] border-b border-white/5 h-12 sm:h-16 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs text-white/20 tracking-widest">PUBLICIDAD</span>
      </div>

      <div className="flex justify-center">
        {/* Ad left sidebar — xl+ only */}
        <aside className="hidden xl:flex w-40 shrink-0 items-start justify-center pt-24 sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="w-32 h-72 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center">
            <span className="text-xs text-white/20 tracking-widest [writing-mode:vertical-rl]">PUBLICIDAD</span>
          </div>
        </aside>

        <div className="flex-1 max-w-5xl w-full px-4 sm:px-6 lg:px-8">
          {/* ── Hero ── */}
          <section className="py-12 sm:py-20 text-center">
            <div className="inline-block bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1.5 sm:px-4 rounded-full mb-6 sm:mb-8">
              ✨ 100% GRATIS · SIN REGISTRO
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.05] tracking-tight">
              <span className="block text-white">{t('landing.hero_title')}</span>
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                {t('landing.hero_highlight')}
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              {t('landing.hero_subtitle')}
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/templates"
                className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-violet-500/30 transition-all hover:scale-105 active:scale-100"
              >
                {t('landing.hero_cta')} →
              </Link>
              <p className="text-slate-500 text-xs sm:text-sm">{t('landing.hero_cta_sub')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-3xl mx-auto">
              {[
                ['5', 'Templates'],
                ['ATS', 'Optimizado'],
                ['PDF', 'Descarga'],
                ['0€', 'Para siempre'],
              ].map(([n, l]) => (
                <div key={n} className="text-center bg-white/[0.02] border border-white/5 rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-black text-violet-400">{n}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 mt-1 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ATS section ── */}
          <section className="py-12 sm:py-20 border-t border-white/5">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white leading-tight">{t('landing.ats_title')}</h2>
              <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">{t('landing.ats_subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <ATSCard icon="🏗️" title={t('landing.ats_1_title')} desc={t('landing.ats_1_desc')} />
              <ATSCard icon="🔑" title={t('landing.ats_2_title')} desc={t('landing.ats_2_desc')} />
              <ATSCard icon="🔤" title={t('landing.ats_3_title')} desc={t('landing.ats_3_desc')} />
              <ATSCard icon="📋" title={t('landing.ats_4_title')} desc={t('landing.ats_4_desc')} />
            </div>

            {/* RECOMMENDED highlight */}
            <div className="mt-8 sm:mt-12 relative overflow-hidden bg-gradient-to-br from-violet-900/50 via-fuchsia-900/30 to-violet-900/50 border border-violet-500/40 rounded-3xl p-6 sm:p-10 text-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="inline-block bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 shadow-lg shadow-violet-500/50">
                  ★ RECOMMENDED
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white mb-3">El único template que garantiza máxima compatibilidad ATS</h3>
                <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                  Desarrollado siguiendo las guías oficiales de LinkedIn, Indeed, Workday y SAP SuccessFactors.
                  Una columna, tipografía universal, sin tablas ni imágenes. Exactamente lo que los algoritmos quieren leer.
                </p>
              </div>
            </div>
          </section>

          {/* ── Guide section ── */}
          <section className="py-12 sm:py-20 border-t border-white/5">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white leading-tight">{t('landing.guide_title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <GuideCard name={t('landing.guide_recommended_title')} desc={t('landing.guide_recommended_desc')} accent="#a855f7" />
              <GuideCard name={t('landing.guide_moderno_title')} desc={t('landing.guide_moderno_desc')} accent="#3b82f6" />
              <GuideCard name={t('landing.guide_minimalista_title')} desc={t('landing.guide_minimalista_desc')} accent="#94a3b8" />
              <GuideCard name={t('landing.guide_creativo_title')} desc={t('landing.guide_creativo_desc')} accent="#ec4899" />
              <GuideCard name={t('landing.guide_ejecutivo_title')} desc={t('landing.guide_ejecutivo_desc')} accent="#f59e0b" />
            </div>
          </section>

          {/* ── CTA bottom ── */}
          <section className="py-16 sm:py-24 text-center border-t border-white/5">
            <h2 className="text-3xl sm:text-5xl font-black mb-8 text-white leading-tight px-2">{t('landing.cta_title')}</h2>
            <Link
              to="/templates"
              className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg sm:text-xl px-10 sm:px-14 py-4 sm:py-5 rounded-2xl shadow-xl shadow-violet-500/30 transition-all hover:scale-105 active:scale-100"
            >
              {t('landing.cta_btn')} 🚀
            </Link>
          </section>
        </div>

        {/* Ad right sidebar — xl+ only */}
        <aside className="hidden xl:flex w-40 shrink-0 items-start justify-center pt-24 sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="w-32 h-72 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center">
            <span className="text-xs text-white/20 tracking-widest [writing-mode:vertical-rl]">PUBLICIDAD</span>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 sm:py-8 text-center text-xs text-slate-600 px-4">
        FABRICULUMM © 2025 · Hecho con 💜 en Argentina
      </footer>
    </main>
  )
}
