import { useTranslation } from 'react-i18next'

export default function AdSlot({ position = 'left', className = '' }) {
  const { t } = useTranslation()

  return (
    <aside
      aria-label={t('ads.label')}
      className={`hidden xl:flex sticky top-20 h-[calc(100vh-6rem)] w-[160px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#0a0a14] text-slate-600 select-none ${className}`}
      data-ad-slot={position}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">
        {t('ads.tag')}
      </div>
      <div className="text-xs font-medium text-slate-500 text-center px-4 leading-relaxed">
        {t('ads.label')}
      </div>
      <div className="text-[10px] text-slate-700 uppercase tracking-[0.2em]">
        160 × 600
      </div>
    </aside>
  )
}
