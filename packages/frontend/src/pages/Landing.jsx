import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ATSCard = ({ icon, title, desc }) => (
  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-violet-500/40 hover:bg-white/[0.04] transition-all duration-300">
    <div className="text-3xl mb-5">{icon}</div>
    <h3 className="font-bold text-white text-lg mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const GuideCard = ({ name, desc, accent }) => (
  <div
    className="relative border rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    style={{ borderColor: accent + '26', background: `linear-gradient(135deg, ${accent}08 0%, transparent 70%)` }}
  >
    <div className="font-black text-xs tracking-[0.25em] mb-3" style={{ color: accent }}>{name}</div>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const Stat = ({ n, label }) => (
  <div className="text-center">
    <div className="text-4xl font-black bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">{n}</div>
    <div className="text-xs text-slate-500 mt-2 uppercase tracking-[0.2em]">{label}</div>
  </div>
)

export default function Landing() {
  const { t } = useTranslation()

  return (
    <main className="relative">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[960px] mx-auto px-6 sm:px-8">

        {/* ── Hero ── */}
        <section className="pt-24 pb-32 lg:pt-32 lg:pb-40 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-bold tracking-[0.2em] px-4 py-2 rounded-full mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {t('landing.hero_badge')}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
            <span className="block text-white">{t('landing.hero_title')}</span>
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {t('landing.hero_highlight')}
            </span>
          </h1>

          <p className="text-slate-400 text-base lg:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {t('landing.hero_subtitle')}
          </p>

          <Link
            to="/templates"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-base px-10 py-4 rounded-2xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105 active:scale-100"
          >
            {t('landing.hero_cta')}
            <span className="text-xl">→</span>
          </Link>
          <p className="text-slate-500 text-xs mt-5">{t('landing.hero_cta_sub')}</p>
        </section>

        {/* ── Stats band ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-y border-white/5">
          <Stat n="5" label={t('landing.stat_templates')} />
          <Stat n="ATS" label={t('landing.stat_ats')} />
          <Stat n="PDF" label={t('landing.stat_pdf')} />
          <Stat n={t('landing.stat_free')} label={t('landing.stat_free_label')} />
        </section>

        {/* ── ATS section ── */}
        <section className="pt-32 pb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 text-white leading-tight tracking-tight">
              {t('landing.ats_title')}
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
              {t('landing.ats_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ATSCard icon="🏗️" title={t('landing.ats_1_title')} desc={t('landing.ats_1_desc')} />
            <ATSCard icon="🔑" title={t('landing.ats_2_title')} desc={t('landing.ats_2_desc')} />
            <ATSCard icon="🔤" title={t('landing.ats_3_title')} desc={t('landing.ats_3_desc')} />
            <ATSCard icon="📋" title={t('landing.ats_4_title')} desc={t('landing.ats_4_desc')} />
          </div>

          {/* RECOMMENDED highlight */}
          <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-violet-900/40 via-fuchsia-900/20 to-violet-900/40 border border-violet-500/30 rounded-3xl p-10 lg:p-14 text-center">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-block bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-violet-500/30">
                ★ {t('landing.ats_highlight_badge')}
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                {t('landing.ats_highlight_title')}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {t('landing.ats_highlight_desc')}
              </p>
            </div>
          </div>
        </section>

        {/* ── Guide section ── */}
        <section className="pt-16 pb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 text-white leading-tight tracking-tight">
              {t('landing.guide_title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GuideCard name={t('landing.guide_recommended_title')} desc={t('landing.guide_recommended_desc')} accent="#a855f7" />
            <GuideCard name={t('landing.guide_moderno_title')} desc={t('landing.guide_moderno_desc')} accent="#3b82f6" />
            <GuideCard name={t('landing.guide_minimalista_title')} desc={t('landing.guide_minimalista_desc')} accent="#94a3b8" />
            <GuideCard name={t('landing.guide_creativo_title')} desc={t('landing.guide_creativo_desc')} accent="#ec4899" />
            <GuideCard name={t('landing.guide_ejecutivo_title')} desc={t('landing.guide_ejecutivo_desc')} accent="#f59e0b" />
          </div>
        </section>

        {/* ── CTA bottom ── */}
        <section className="pt-16 pb-32 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-12 text-white leading-tight tracking-tight max-w-2xl mx-auto">
            {t('landing.cta_title')}
          </h2>
          <Link
            to="/templates"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-base lg:text-lg px-12 py-5 rounded-2xl shadow-xl shadow-violet-500/30 transition-all hover:scale-105 active:scale-100"
          >
            {t('landing.cta_btn')}
            <span className="text-2xl">🚀</span>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-600 px-4">
        {t('landing.footer')}
      </footer>
    </main>
  )
}
