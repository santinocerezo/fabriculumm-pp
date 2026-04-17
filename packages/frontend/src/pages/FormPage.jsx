import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// ── Field helpers ──────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-slate-400 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
    />
  </div>
)

const Textarea = ({ label, value, onChange, placeholder, hint, rows = 3 }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-slate-400 font-medium">{label}</label>
    {hint && <span className="text-xs text-slate-600">{hint}</span>}
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
    />
  </div>
)

const Section = ({ title, children, accent = '#a855f7' }) => (
  <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
    <h2 className="font-black text-sm tracking-widest mb-5 uppercase" style={{ color: accent }}>{title}</h2>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

const AddBtn = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-xs text-violet-400 hover:text-violet-300 border border-dashed border-violet-500/40 hover:border-violet-500/70 rounded-lg px-4 py-2 transition-all"
  >
    {label}
  </button>
)

const RemoveBtn = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-xs text-red-400 hover:text-red-300 mt-1">✕ Eliminar</button>
)

// ── Experience entry ───────────────────────────────────────────────────────────
function ExperienceEntry({ entry, onChange, onRemove, t }) {
  const update = (key, val) => onChange({ ...entry, [key]: val })
  const updateBullet = (i, val) => {
    const bullets = [...(entry.bullets || [])]
    bullets[i] = val
    update('bullets', bullets)
  }

  return (
    <div className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
      <div className="grid grid-cols-2 gap-3">
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
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              placeholder="Lideré equipo de 5 personas, reduciendo tiempos un 30%"
            />
            <button type="button" onClick={() => {
              const bullets = (entry.bullets || []).filter((_, j) => j !== i)
              update('bullets', bullets)
            }} className="text-red-400 hover:text-red-300 text-xs px-2">✕</button>
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

export default function FormPage() {
  const { template } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const accent = ACCENT[template] || '#a855f7'

  const [data, setData] = useState({
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
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key, val) => setData(d => ({ ...d, [key]: val }))

  const setListItem = (key, i, val) => setData(d => {
    const list = [...d[key]]
    list[i] = val
    return { ...d, [key]: list }
  })
  const addItem = (key, empty) => setData(d => ({ ...d, [key]: [...d[key], empty()] }))
  const removeItem = (key, i) => setData(d => ({ ...d, [key]: d[key].filter((_, j) => j !== i) }))

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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/templates')} className="text-sm text-slate-500 hover:text-slate-300 mb-8 flex items-center gap-2">
        ← {t('form.back')}
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 rounded-full" style={{ background: accent }} />
        <h1 className="text-2xl font-black uppercase tracking-wider" style={{ color: accent }}>
          {t(`templates.${template === 'recommended' ? 'recommended' : template}_name`)}
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* Personal */}
        <Section title={t('form.personal')} accent={accent}>
          <div className="grid grid-cols-2 gap-3">
            <Input label={t('form.name')} value={data.name} onChange={v => set('name', v)} />
            <Input label={t('form.email')} value={data.email} onChange={v => set('email', v)} type="email" />
            <Input label={t('form.phone')} value={data.phone} onChange={v => set('phone', v)} />
            <Input label={t('form.location')} value={data.location} onChange={v => set('location', v)} />
            <Input label="LinkedIn" value={data.linkedin} onChange={v => set('linkedin', v)} placeholder="linkedin.com/in/tu-perfil" />
            {showWebsite && <Input label={t('form.website')} value={data.website} onChange={v => set('website', v)} />}
            {showPhoto && <Input label={t('form.photo')} value={data.photo} onChange={v => set('photo', v)} placeholder="https://..." />}
          </div>
        </Section>

        {/* Summary / About / Profile */}
        {!showAbout && !showProfile && (
          <Section title={t('form.summary')} accent={accent}>
            <Textarea label={t('form.summary_label')} value={data.summary} onChange={v => set('summary', v)} hint={t('form.summary_hint')} rows={4} />
          </Section>
        )}
        {showAbout && (
          <Section title={t('form.about')} accent={accent}>
            <Textarea label={t('form.about')} value={data.about} onChange={v => set('about', v)} rows={4} />
          </Section>
        )}
        {showProfile && (
          <Section title={t('form.profile')} accent={accent}>
            <Textarea label={t('form.profile')} value={data.profile} onChange={v => set('profile', v)} rows={4} />
          </Section>
        )}

        {/* Experience */}
        <Section title={t('form.experience')} accent={accent}>
          {data.experience.map((e, i) => (
            <ExperienceEntry key={i} entry={e} onChange={v => setListItem('experience', i, v)} onRemove={() => removeItem('experience', i)} t={t} />
          ))}
          <AddBtn label={t('form.add_experience')} onClick={() => addItem('experience', emptyExp)} />
        </Section>

        {/* Education */}
        <Section title={t('form.education')} accent={accent}>
          {data.education.map((e, i) => (
            <div key={i} className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
              <div className="grid grid-cols-2 gap-3">
                <Input label={t('form.degree')} value={e.degree} onChange={v => setListItem('education', i, { ...e, degree: v })} />
                <Input label={t('form.institution')} value={e.institution} onChange={v => setListItem('education', i, { ...e, institution: v })} />
                <Input label={t('form.year')} value={e.year} onChange={v => setListItem('education', i, { ...e, year: v })} />
              </div>
              <RemoveBtn onClick={() => removeItem('education', i)} />
            </div>
          ))}
          <AddBtn label={t('form.add_education')} onClick={() => addItem('education', emptyEdu)} />
        </Section>

        {/* Skills */}
        <Section title={t('form.skills')} accent={accent}>
          <Textarea label={t('form.skills')} value={data.skills} onChange={v => set('skills', v)} hint={t('form.skills_hint')} rows={3} placeholder="React, Node.js, SQL, Python..." />
          {showSoftSkills && (
            <Textarea label={t('form.soft_skills')} value={data.softSkills} onChange={v => set('softSkills', v)} rows={2} placeholder="Liderazgo, Comunicación, Trabajo en equipo..." />
          )}
        </Section>

        {/* Languages */}
        <Section title={t('form.languages')} accent={accent}>
          {data.languages.map((l, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 bg-black/20 rounded-xl p-3 border border-white/5">
              <Input label={t('form.language_name')} value={l.name} onChange={v => setListItem('languages', i, { ...l, name: v })} />
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 font-medium">{t('form.language_level')}</label>
                <select
                  value={l.level}
                  onChange={e => setListItem('languages', i, { ...l, level: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="">—</option>
                  {LANG_LEVELS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <RemoveBtn onClick={() => removeItem('languages', i)} />
            </div>
          ))}
          <AddBtn label={t('form.add_language')} onClick={() => addItem('languages', emptyLang)} />
        </Section>

        {/* Certifications */}
        {showCerts && (
          <Section title={t('form.certifications')} accent={accent}>
            {data.certifications.map((c, i) => (
              <div key={i} className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('form.cert_name')} value={c.name} onChange={v => setListItem('certifications', i, { ...c, name: v })} />
                  <Input label={t('form.cert_issuer')} value={c.issuer} onChange={v => setListItem('certifications', i, { ...c, issuer: v })} />
                  <Input label={t('form.cert_year')} value={c.year} onChange={v => setListItem('certifications', i, { ...c, year: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('certifications', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_certification')} onClick={() => addItem('certifications', emptyCert)} />
          </Section>
        )}

        {/* Projects */}
        {showProjects && (
          <Section title={t('form.projects')} accent={accent}>
            {data.projects.map((p, i) => (
              <div key={i} className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('form.project_name')} value={p.name} onChange={v => setListItem('projects', i, { ...p, name: v })} />
                  <Input label={t('form.project_url')} value={p.url} onChange={v => setListItem('projects', i, { ...p, url: v })} />
                </div>
                <Textarea label={t('form.project_desc')} value={p.description} onChange={v => setListItem('projects', i, { ...p, description: v })} rows={2} />
                <RemoveBtn onClick={() => removeItem('projects', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_project')} onClick={() => addItem('projects', emptyProj)} />
          </Section>
        )}

        {/* Complementary (Ejecutivo) */}
        {showComplementary && (
          <Section title={t('form.complementary')} accent={accent}>
            {data.complementary.map((c, i) => (
              <div key={i} className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('form.cert_name')} value={c.name} onChange={v => setListItem('complementary', i, { ...c, name: v })} />
                  <Input label={t('form.institution')} value={c.institution} onChange={v => setListItem('complementary', i, { ...c, institution: v })} />
                  <Input label={t('form.year')} value={c.year} onChange={v => setListItem('complementary', i, { ...c, year: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('complementary', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_complementary')} onClick={() => addItem('complementary', emptyComp)} />
          </Section>
        )}

        {/* References (Ejecutivo) */}
        {showReferences && (
          <Section title={t('form.references')} accent={accent}>
            {data.references.map((r, i) => (
              <div key={i} className="bg-black/20 rounded-xl p-4 flex flex-col gap-3 border border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('form.ref_name')} value={r.name} onChange={v => setListItem('references', i, { ...r, name: v })} />
                  <Input label={t('form.ref_position')} value={r.position} onChange={v => setListItem('references', i, { ...r, position: v })} />
                  <Input label={t('form.ref_company')} value={r.company} onChange={v => setListItem('references', i, { ...r, company: v })} />
                  <Input label={t('form.ref_contact')} value={r.contact} onChange={v => setListItem('references', i, { ...r, contact: v })} />
                </div>
                <RemoveBtn onClick={() => removeItem('references', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_reference')} onClick={() => addItem('references', emptyRef)} />
          </Section>
        )}

        {/* Interests (Moderno) */}
        {showInterests && (
          <Section title={t('form.interests')} accent={accent}>
            <Textarea label={t('form.interests')} value={data.interests} onChange={v => set('interests', v)} hint={t('form.interests_hint')} rows={2} />
          </Section>
        )}

        {/* Social (Creativo) */}
        {showSocial && (
          <Section title={t('form.social')} accent={accent}>
            {data.social.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 bg-black/20 rounded-xl p-3 border border-white/5">
                <Input label={t('form.social_platform')} value={s.platform} onChange={v => setListItem('social', i, { ...s, platform: v })} placeholder="Instagram" />
                <Input label={t('form.social_handle')} value={s.handle} onChange={v => setListItem('social', i, { ...s, handle: v })} placeholder="@usuario" />
                <RemoveBtn onClick={() => removeItem('social', i)} />
              </div>
            ))}
            <AddBtn label={t('form.add_social')} onClick={() => addItem('social', emptySocial)} />
          </Section>
        )}

        {/* Error */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-lg text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading ? '#444' : `linear-gradient(135deg, ${accent}, ${accent}99)`,
            boxShadow: `0 0 24px ${accent}33`,
          }}
        >
          {loading ? `⏳ ${t('form.generating')}` : `⬇ ${t('form.generate')}`}
        </button>
      </div>
    </main>
  )
}
