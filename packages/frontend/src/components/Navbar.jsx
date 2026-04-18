import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [open, setOpen] = useState(false)

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
    localStorage.setItem('fabriculumm_lang', next)
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0b12]/85 backdrop-blur-md border-b border-white/5">
      <div className="container-page h-16 flex items-center justify-between">
        <Link to="/" className="text-base font-black tracking-[0.2em] text-violet-400 hover:text-violet-300 transition-colors">
          FABRICULUMM
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">{t('nav.home')}</Link>
          <Link to="/templates" className="text-sm text-slate-400 hover:text-white transition-colors">{t('nav.templates')}</Link>
          <button onClick={toggleLang} className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:border-violet-400/50 hover:text-violet-300 transition-all">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <Link to="/templates" className="text-sm font-semibold px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-colors">
            {t('nav.create')}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleLang} className="text-xs font-bold px-2.5 py-1 rounded border border-white/10 text-slate-300">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={() => setOpen(o => !o)} className="text-slate-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0b0b12]">
          <div className="container-page py-5 flex flex-col gap-4">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm text-slate-300">{t('nav.home')}</Link>
            <Link to="/templates" onClick={() => setOpen(false)} className="text-sm text-slate-300">{t('nav.templates')}</Link>
            <Link to="/templates" onClick={() => setOpen(false)} className="text-sm font-semibold text-center py-2.5 rounded-xl bg-violet-600 text-white">
              {t('nav.create')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
