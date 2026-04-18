import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Feature = ({ icon, title, desc }) => (
  <div className="text-center">
    <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl">
      {icon}
    </div>
    <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
  </div>
)

const CVMock = () => (
  <div className="relative mx-auto w-full max-w-sm aspect-[3/4] rounded-2xl bg-white shadow-2xl shadow-violet-900/40 p-6 overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500">
    <div className="border-b-2 border-slate-900 pb-3 mb-4">
      <div className="h-3 w-32 bg-slate-900 rounded mb-2" />
      <div className="flex gap-2">
        <div className="h-1 w-14 bg-slate-400 rounded" />
        <div className="h-1 w-10 bg-slate-400 rounded" />
        <div className="h-1 w-8 bg-slate-400 rounded" />
      </div>
    </div>
    <div className="h-1.5 w-20 bg-slate-800 rounded mb-2" />
    <div className="h-0.5 w-full bg-slate-300 rounded mb-1" />
    <div className="h-0.5 w-5/6 bg-slate-300 rounded mb-4" />
    <div className="h-1.5 w-24 bg-slate-800 rounded mb-2" />
    <div className="h-0.5 w-full bg-slate-300 rounded mb-1" />
    <div className="h-0.5 w-4/5 bg-slate-300 rounded mb-1" />
    <div className="h-0.5 w-3/4 bg-slate-300 rounded mb-4" />
    <div className="h-1.5 w-16 bg-slate-800 rounded mb-2" />
    <div className="h-0.5 w-full bg-slate-300 rounded mb-1" />
    <div className="h-0.5 w-2/3 bg-slate-300 rounded mb-4" />
    <div className="flex gap-1.5 flex-wrap">
      <div className="h-3 w-10 bg-violet-100 border border-violet-300 rounded-full" />
      <div className="h-3 w-12 bg-violet-100 border border-violet-300 rounded-full" />
      <div className="h-3 w-8 bg-violet-100 border border-violet-300 rounded-full" />
      <div className="h-3 w-14 bg-violet-100 border border-violet-300 rounded-full" />
    </div>
    {/* ATS badge */}
    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-black tracking-widest px-2 py-1 rounded-full shadow-lg">
      ATS ✓
    </div>
  </div>
)

export default function Landing() {
  const { t } = useTranslation()

  return (
    <main>
      {/* ── Hero ── */}
      <section className="container-page pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-bold tracking-[0.2em] px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              {t('landing.hero_badge')}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.02] tracking-tight">
              <span className="block text-white">{t('landing.hero_title')}</span>
              <span className="block mt-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                {t('landing.hero_highlight')}
              </span>
            </h1>

            <p className="text-slate-400 text-base lg:text-lg mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t('landing.hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-5">
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.03]"
              >
                {t('landing.hero_cta')}
                <span>→</span>
              </Link>
              <p className="text-slate-500 text-xs">{t('landing.hero_cta_sub')}</p>
            </div>
          </div>

          <div className="hidden lg:block">
            <CVMock />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="container-page pt-32 pb-40 lg:pt-40 lg:pb-56 border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-20 lg:mb-24">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400 mb-4">Por qué FABRICULUMM</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {t('landing.ats_title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-12 max-w-4xl mx-auto">
          <Feature icon="⚡" title={t('landing.ats_1_title')} desc={t('landing.ats_1_desc')} />
          <Feature icon="🎯" title={t('landing.ats_2_title')} desc={t('landing.ats_2_desc')} />
          <Feature icon="✨" title={t('landing.ats_4_title')} desc={t('landing.ats_4_desc')} />
        </div>
      </section>

      {/* ── Recommended highlight ── */}
      <section className="container-page py-40 lg:py-56 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/40 via-fuchsia-900/20 to-violet-900/40 border border-violet-500/25 rounded-3xl p-12 lg:p-16 text-center">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-block bg-violet-500 text-white text-[10px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full mb-6">
                ★ {t('landing.ats_highlight_badge')}
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight tracking-tight">
                {t('landing.ats_highlight_title')}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed max-w-lg mx-auto">
                {t('landing.ats_highlight_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA bottom ── */}
      <section className="container-page py-40 lg:py-56 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-12">
            {t('landing.cta_title')}
          </h2>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base px-10 py-4 rounded-full shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.03]"
          >
            {t('landing.cta_btn')}
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-page py-10 text-center text-xs text-slate-600">
          {t('landing.footer')}
        </div>
      </footer>
    </main>
  )
}
