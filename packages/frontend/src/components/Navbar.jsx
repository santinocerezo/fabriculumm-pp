import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
    localStorage.setItem('fabriculumm_lang', next)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a14]/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-black tracking-widest text-violet-400 hover:text-violet-300 transition-colors">
          FABRICULUMM
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/templates" className="text-sm text-slate-400 hover:text-white transition-colors">
            {t('nav.templates')}
          </Link>
          <button
            onClick={toggleLang}
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 transition-all"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <Link
            to="/templates"
            className="text-sm font-bold px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            {t('nav.create')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
