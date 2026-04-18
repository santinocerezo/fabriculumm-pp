import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ATSCard = ({ icon, title, desc }) => (
  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-violet-500/40 transition-colors">
    <div className="text-2xl mb-4">{icon}</div>
    <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const GuideCard = ({ name, desc, accent }) => (
  <div
    className="border rounded-2xl p-6 lg:p-7 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
    style={{ borderColor: accent + '26' }}
  >
    <div className="font-bold text-[11px] tracking-[0.25em] mb-3" style={{ color: accent }}>{name}</div>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
)

const Stat = ({ n, label }) => (
  <div className="text-center">
    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-br from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">{n}</div>
    <div className="text-[11px] text-slate-500 mt-2 uppercase tracking-[0.2em]">{label}</div>
  </div>
)

const SectionTitle = ({ eyebrow, children }) => (
  <div className="text-center max-w-2xl mx-auto">
    {eyebrow && <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400 mb-4">{eyebrow}</div>}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
      {children}
    </h2>
  </div>
)

export default function Landing() {
  const { t } = useTranslation()

  return (
    <main>
      {/* ── Hero ── */}
      <section className="container-page pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-bold tracking-[0.2em] px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {t('landing.hero_badge')}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            <span className="block text-white">{t('landing.hero_title')}</span>
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {t('landing.hero_highlight')}
            </span>
          </h1>

          <p className="text-slate-400 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {t('landing.hero_subtitle')}
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.03]"
            >
              {t('landing.hero_cta')}
              <span>→</span>
            </Link>
            <p className="text-slate-500 text-xs">{t('landing.hero_cta_sub')}</p>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-y border-white/5">
        <div className="container-page py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Stat n="5" label={t('landing.stat_templates')} />
            <Stat n="ATS" label={t('landing.stat_ats')} />
            <Stat n="PDF" label={t('landing.stat_pdf')} />
            <Stat n={t('landing.stat_free')} label={t('landing.stat_free_label')} />
          </div>
        </div>
      </section>

      {/* ── ATS section ── */}
      <section className="container-page py-24 lg:py-32">
        <SectionTitle eyebrow="ATS Ready">
          {t('landing.ats_title')}
        </SectionTitle>
        <p className="text-slate-400 text-center text-base max-w-xl mx-auto mt-5 mb-16 leading-relaxed">
          {t('landing.ats_subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <ATSCard icon="🏗️" title={t('landing.ats_1_title')} desc={t('landing.ats_1_desc')} />
          <ATSCard icon="🔑" title={t('landing.ats_2_title')} desc={t('landing.ats_2_desc')} />
          <ATSCard icon="🔤" title={t('landing.ats_3_title')} desc={t('landing.ats_3_desc')} />
          <ATSCard icon="📋" title={t('landing.ats_4_title')} desc={t('landing.ats_4_desc')} />
        </div>

        {/* RECOMMENDED highlight */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/30 to-fuchsia-900/20 border border-violet-500/25 rounded-3xl p-10 lg:p-12 text-center">
            <div className="inline-block bg-violet-500 text-white text-[10px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full mb-5">
              ★ {t('landing.ats_highlight_badge')}
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
              {t('landing.ats_highlight_title')}
            </h3>
            <p className="text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
              {t('landing.ats_highlight_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Guide section ── */}
      <section className="container-page py-24 lg:py-32 border-t border-white/5">
        <SectionTitle eyebrow="Templates">
          {t('landing.guide_title')}
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          <GuideCard name={t('landing.guide_recommended_title')} desc={t('landing.guide_recommended_desc')} accent="#a855f7" />
          <GuideCard name={t('landing.guide_moderno_title')} desc={t('landing.guide_moderno_desc')} accent="#3b82f6" />
          <GuideCard name={t('landing.guide_minimalista_title')} desc={t('landing.guide_minimalista_desc')} accent="#94a3b8" />
          <GuideCard name={t('landing.guide_creativo_title')} desc={t('landing.guide_creativo_desc')} accent="#ec4899" />
          <GuideCard name={t('landing.guide_ejecutivo_title')} desc={t('landing.guide_ejecutivo_desc')} accent="#f59e0b" />
        </div>
      </section>

      {/* ── CTA bottom ── */}
      <section className="container-page py-24 lg:py-32 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-10">
            {t('landing.cta_title')}
          </h2>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base px-10 py-4 rounded-full shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.03]"
          >
            {t('landing.cta_btn')}
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="container-page py-8 text-center text-xs text-slate-600">
          {t('landing.footer')}
        </div>
      </footer>
    </main>
  )
}
