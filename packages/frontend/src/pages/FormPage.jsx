import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LivePreview from '../components/LivePreview.jsx'

// ── Field helpers ──────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-slate-400 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:bg-white/[0.06] transition-all"
    />
  </div>
)

const Textarea = ({ label, value, onChange, placeholder, hint, rows = 3 }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-slate-400 font-medium">{label}</label>
    {hint && <span className="text-xs text-slate-600">{hint}</span>}
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:bg-white/[0.06] transition-all resize-none"
    />
  </div>
)

const Section = ({ title, children, accent = '#a855f7' }) => (
  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 lg:p-6">
    <h2 className="font-black text-xs lg:text-sm tracking-[0.25em] mb-5 uppercase" style={{ color: accent }}>{title}</h2>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

const AddBtn = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs text-violet-400 hover:text-violet-300 border border-dashed border-violet-500/40 hover:border-violet-500/70 hover:bg-violet-500/5 rounded-lg px-4 py-2.5 transition-all"
  >
    {label}
  </button>
)

const RemoveBtn = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <button type="button" onClick={onClick} className="text-xs text-red-400/80 hover:text-red-300 self-end transition-colors">✕ {t('form.remove')}</button>
  )
}

// ── Experience entry ───────────────────────────────────────────────────────────
function ExperienceEntry({ entry, onChange, onRemove, t }) {
  const update = (key, val) => onChange({ ...entry, [key]: val })
  const updateBullet = (i, val) => {
    const bullets = [...(entry.bullets || [])]
    bullets[i] = val
    update('bullets', bullets)
  }

  return (
    <div className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label={t('form.position')} value={entry.position || ''} onChange={v => update('position', v)} />
        <Input label={t('form.company')} value={entry.company || ''} onChange={v => update('company', v)} />
        <Input label={t('form.start_date')} value={entry.startDate || ''} onChange={v => update('startDate', v)} placeholder="2022-03" />
        <Input label={t('form.end_date')} value={entry.endDate || ''} onChange={v => update('endDate', v)} placeholder="2024-01" />
      </div>
      <Input label={t('form.location')} value={entry.location || ''} onChange={v => update('location', v)} />
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">{t('form.bullets')}</label>
        <span className="text-xs text-slate-600">{t('form.bullet_hint')}</span>
        {(entry.bullets || []).map((b, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={b}
              onChange={e => updateBullet(i, e.target.value)}
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="Lideré equipo de 5 personas, reduciendo tiempos un 30%"
            />
            <button type="button" onClick={() => {
              const bullets = (entry.bullets || []).filter((_, j) => j !== i)
              update('bullets', bullets)
            }} className="text-red-400 hover:text-red-300 text-xs px-2 transition-colors">✕</button>
          </div>
        ))}
        <AddBtn label={t('form.add_bullet')} onClick={() => update('bullets', [...(entry.bullets || []), ''])} />
      </div>
      <RemoveBtn onClick={onRemove} />
    </div>
  )
}

// ── Main FormPage ──────────────────────────────────────────────────────────────
const ACCENT = {
  recommended: '#a855f7', moderno: '#3b82f6', minimalista: '#94a3b8',
  creativo: '#ec4899', ejecutivo: '#f59e0b',
}

const emptyExp = () => ({ position: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] })
const emptyEdu = () => ({ degree: '', institution: '', year: '' })
const emptyLang = () => ({ name: '', level: '' })
const emptyCert = () => ({ name: '', issuer: '', year: '' })
const emptyProj = () => ({ name: '', url: '', description: '' })
const emptyRef = () => ({ name: '', position: '', company: '', contact: '' })
const emptyComp = () => ({ name: '', institution: '', year: '' })
const emptySocial = () => ({ platform: '', handle: '' })

const initialData = {
  name: '', email: '', phone: '', location: '', linkedin: '', website: '', photo: '',
  summary: '', about: '', profile: '',
  experience: [emptyExp()],
  education: [emptyEdu()],
  skills: '',
  softSkills: '',
  languages: [emptyLang()],
  certifications: [],
  projects: [],
  complementary: [],
  references: [],
  interests: '',
  social: [],
}

export default function FormPage() {
  const { template } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const accent = ACCENT[template] || '#a855f7'

  const storageKey = `fabriculumm_form_${template}`

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) return { ...initialData, ...JSON.parse(saved) }
    } catch {}
    return initialData
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const saveTimeout = useRef(null)

  // Auto-save to localStorage (debounced)
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      try { localStorage.setItem(storageKey, JSON.stringify(data)) } catch {}
    }, 500)
    return () => clearTimeout(saveTimeout.current)
  }, [data, storageKey])

  const set = (key, val) => setData(d => ({ ...d, [key]: val }))

  const setListItem = (key, i, val) => setData(d => {
    const list = [...d[key]]
    list[i] = val
    return { ...d, [key]: list }
  })
  const addItem = (key, empty) => setData(d => ({ ...d, [key]: [...d[key], empty()] }))
  const removeItem = (key, i) => setData(d => ({ ...d, [key]: d[key].filter((_, j) => j !== i) }))

  function clearForm() {
    if (!confirm(t('form.clear_confirm'))) return
    setData(initialData)
    localStorage.removeItem(storageKey)
  }

  async function handleGenerate() {
    if (!data.name.trim()) { setError(t('errors.name_required')); return }
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...data,
        skills: data.skills.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
        softSkills: data.softSkills.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
        interests: data.interests.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
      }
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, data: payload, lang: i18n.language }),
      })
      if (!res.ok) throw new Error('PDF error')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fabriculumm-cv-${template}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      setDownloaded(true)
    } catch {
      setError(t('errors.pdf_error'))
    } finally {
      setLoading(false)
    }
  }

  const LANG_LEVELS = ['native', 'advanced', 'intermediate', 'basic'].map(k => ({ value: k, label: t(`levels.${k}`) }))
  const showPhoto = ['moderno', 'creativo'].includes(template)
  const showAbout = template === 'creativo'
  const showProfile = template === 'ejecutivo'
  const showCerts = ['recommended', 'ejecutivo'].includes(template)
  const showProjects = ['recommended', 'creativo'].includes(template)
  const showSoftSkills = template === 'recommended'
  const showComplementary = template === 'ejecutivo'
  const showReferences = template === 'ejecutivo'
  const showInterests = template === 'moderno'
  const showSocial = template === 'creativo'
  const showWebsite = template === 'recommended'

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8 gap-3 flex-wrap">
        <button onClick={() => navigate('/templates')} className="text-sm text-slate-500 hover:text-slate-300 flex items-center gap-2 transition-colors">
          ← {t('form.back')}
        </button>
        <div className="flex items-center gap-3">
          <button onClick={clearForm} className="text-xs text-slate-500 hover:text-red-400 transition-colors">🗑 {t('form.clear')}</button>
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('form.autosaved')}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8 lg:mb-10">
        <div className="w-1.5 h-10 lg:h-12 rounded-full" style={{ background: accent }} />
        <h1 className="text-2xl lg:text-4xl font-black uppercase tracking-[0.15em]" style={{ color: accent }}>
          {t(`templates.${template}_name`)}
        </h1>
      </div>

      {/* 2-col layout: form + live preview */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_480px] xl:grid-cols-[minmax(0,1fr)_540px] gap-6 lg:gap-8">

        {/* FORM */}
        <div className="flex flex-col gap-5">
          <Section title={t('form.personal')} accent={accent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label={t('form.name')} value={data.name} onChange={v => set('name', v)} />
              <Input label={t('form.email')} value={data.email} onChange={v => set('email', v)} type="email" />
              <Input label={t('form.phone')} value={data.phone} onChange={v => set('phone', v)} />
              <Input label={t('form.location')} value={data.location} onChange={v => set('location', v)} />
              <Input label="LinkedIn" value={data.linkedin} onChange={v => set('linkedin', v)} placeholder="linkedin.com/in/tu-perfil" />
              {showWebsite && <Input label={t('form.website')} value={data.website} onChange={v => set('website', v)} />}
              {showPhoto && <Input label={t('form.photo')} value={data.photo} onChange={v => set('photo', v)} placeholder="https://..." />}
            </div>
          </Section>

          {!showAbout && !showProfile && (
            <Section title={t('form.summary')} accent={accent}>
              <Textarea label={t('form.summary_label')} value={data.summary} onChange={v => set('summary', v)} hint={t('form.summary_hint')} rows={4} />
            </Section>
          )}
          {showAbout && <Section title={t('form.about')} accent={accent}><Textarea label={t('form.about')} value={data.about} onChange={v => set('about', v)} rows={4} /></Section>}
          {showProfile && <Section title={t('form.profile')} accent={accent}><Textarea label={t('form.profile')} value={data.profile} onChange={v => set('profile', v)} rows={4} /></Section>}

          <Section title={t('form.experience')} accent={accent}>
            {data.experience.map((e, i) => (
              <ExperienceEntry key={i} entry={e} onChange={v => setListItem('experience', i, v)} onRemove={() => removeItem('experience', i)} t={t} />
            ))}
            <AddBtn label={t('form.add_experience')} onClick={() => addItem('experience', emptyExp)} />
          </Section>

          <Section title={t('form.education')} accent={accent}>
            {data.education.map((e, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.degree')} value={e.degree} onChange={v => setListItem('education', i, { ...e, degree: v })} />
                  <Input label={t('form.institution')} value={e.institution} onChange={v => setListItem('education', i, { ...e, institution: v })} />
                  <Input label={t('form.year')} value={e.year} onChange={v => setListItem('education', i, { ...e, year: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('education', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_education')} onClick={() => addItem('education', emptyEdu)} />
          </Section>

          <Section title={t('form.skills')} accent={accent}>
            <Textarea label={t('form.skills')} value={data.skills} onChange={v => set('skills', v)} hint={t('form.skills_hint')} rows={3} placeholder="React, Node.js, SQL, Python..." />
            {showSoftSkills && <Textarea label={t('form.soft_skills')} value={data.softSkills} onChange={v => set('softSkills', v)} rows={2} placeholder="Liderazgo, Comunicación, Trabajo en equipo..." />}
          </Section>

          <Section title={t('form.languages')} accent={accent}>
            {data.languages.map((l, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-3 border border-white/5 flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.language_name')} value={l.name} onChange={v => setListItem('languages', i, { ...l, name: v })} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 font-medium">{t('form.language_level')}</label>
                    <select
                      value={l.level}
                      onChange={e => setListItem('languages', i, { ...l, level: e.target.value })}
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="">—</option>
                      {LANG_LEVELS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>
                </div>
                <RemoveBtn onClick={() => removeItem('languages', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_language')} onClick={() => addItem('languages', emptyLang)} />
          </Section>

          {showCerts && <Section title={t('form.certifications')} accent={accent}>
            {data.certifications.map((c, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.cert_name')} value={c.name} onChange={v => setListItem('certifications', i, { ...c, name: v })} />
                  <Input label={t('form.cert_issuer')} value={c.issuer} onChange={v => setListItem('certifications', i, { ...c, issuer: v })} />
                  <Input label={t('form.cert_year')} value={c.year} onChange={v => setListItem('certifications', i, { ...c, year: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('certifications', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_certification')} onClick={() => addItem('certifications', emptyCert)} />
          </Section>}

          {showProjects && <Section title={t('form.projects')} accent={accent}>
            {data.projects.map((p, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.project_name')} value={p.name} onChange={v => setListItem('projects', i, { ...p, name: v })} />
                  <Input label={t('form.project_url')} value={p.url} onChange={v => setListItem('projects', i, { ...p, url: v })} />
                </div>
                <Textarea label={t('form.project_desc')} value={p.description} onChange={v => setListItem('projects', i, { ...p, description: v })} rows={2} />
                <RemoveBtn onClick={() => removeItem('projects', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_project')} onClick={() => addItem('projects', emptyProj)} />
          </Section>}

          {showComplementary && <Section title={t('form.complementary')} accent={accent}>
            {data.complementary.map((c, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.cert_name')} value={c.name} onChange={v => setListItem('complementary', i, { ...c, name: v })} />
                  <Input label={t('form.institution')} value={c.institution} onChange={v => setListItem('complementary', i, { ...c, institution: v })} />
                  <Input label={t('form.year')} value={c.year} onChange={v => setListItem('complementary', i, { ...c, year: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('complementary', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_complementary')} onClick={() => addItem('complementary', emptyComp)} />
          </Section>}

          {showReferences && <Section title={t('form.references')} accent={accent}>
            {data.references.map((r, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.ref_name')} value={r.name} onChange={v => setListItem('references', i, { ...r, name: v })} />
                  <Input label={t('form.ref_position')} value={r.position} onChange={v => setListItem('references', i, { ...r, position: v })} />
                  <Input label={t('form.ref_company')} value={r.company} onChange={v => setListItem('references', i, { ...r, company: v })} />
                  <Input label={t('form.ref_contact')} value={r.contact} onChange={v => setListItem('references', i, { ...r, contact: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('references', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_reference')} onClick={() => addItem('references', emptyRef)} />
          </Section>}

          {showInterests && <Section title={t('form.interests')} accent={accent}>
            <Textarea label={t('form.interests')} value={data.interests} onChange={v => set('interests', v)} hint={t('form.interests_hint')} rows={2} />
          </Section>}

          {showSocial && <Section title={t('form.social')} accent={accent}>
            {data.social.map((s, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-3 border border-white/5 flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label={t('form.social_platform')} value={s.platform} onChange={v => setListItem('social', i, { ...s, platform: v })} placeholder="Instagram" />
                  <Input label={t('form.social_handle')} value={s.handle} onChange={v => setListItem('social', i, { ...s, handle: v })} placeholder="@usuario" />
                </div>
                <RemoveBtn onClick={() => removeItem('social', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_social')} onClick={() => addItem('social', emptySocial)} />
          </Section>}

          {error && (
            <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 text-center">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {downloaded && (
            <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-black text-emerald-400 text-lg mb-2">{t('form.success_title')}</h3>
              <p className="text-slate-400 text-sm mb-4">{t('form.success_desc')}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setDownloaded(false)} className="text-sm px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:border-white/30 transition-all">✏️ {t('form.keep_editing')}</button>
                <button onClick={handleGenerate} className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all" style={{ background: accent }}>⬇ {t('form.download_again')}</button>
              </div>
            </div>
          )}

          {!downloaded && (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 lg:py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading ? '#444' : `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                boxShadow: `0 10px 40px ${accent}40`,
              }}
            >
              {loading ? `⏳ ${t('form.generating')}` : `⬇ ${t('form.generate')}`}
            </button>
          )}
        </div>

        {/* LIVE PREVIEW (desktop, sticky) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{t('form.preview')}</h3>
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">{t('form.preview_live')}</span>
            </div>
            <LivePreview template={template} data={data} lang={i18n.language} />
          </div>
        </aside>
      </div>

      {/* MOBILE: floating preview button */}
      <button
        onClick={() => setMobilePreviewOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 rounded-full shadow-2xl px-5 py-3.5 font-bold text-white text-sm flex items-center gap-2"
        style={{ background: accent, boxShadow: `0 10px 30px ${accent}60` }}
      >
        👁 {t('form.preview')}
      </button>

      {/* MOBILE: preview modal */}
      {mobilePreviewOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">{t('form.preview')}</h3>
            <button onClick={() => setMobilePreviewOpen(false)} className="text-white text-2xl">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <LivePreview template={template} data={data} lang={i18n.language} />
          </div>
        </div>
      )}
    </main>
  )
}
