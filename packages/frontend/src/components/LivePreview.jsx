/* Live preview — simplified React render of each CV template for in-form preview */

const esc = (s) => s ?? ''
const fmtDate = (s, lang = 'es') => {
  if (!s) return ''
  if (/^present/i.test(s) || /^presente/i.test(s)) return lang === 'en' ? 'Present' : 'Presente'
  const d = new Date(s + '-01')
  if (isNaN(d)) return s
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { month: 'short', year: 'numeric' })
}

const splitList = (v) =>
  Array.isArray(v) ? v : String(v || '').split(/[\n,]+/).map(x => x.trim()).filter(Boolean)

// ── RECOMMENDED ──────────────────────────────────────────────────────────────
function Recommended({ data, lang }) {
  const t = lang === 'en'
    ? { summary: 'Professional Summary', experience: 'Work Experience', education: 'Education', skills: 'Technical Skills', softSkills: 'Soft Skills', languages: 'Languages', certifications: 'Certifications', projects: 'Key Projects', present: 'Present' }
    : { summary: 'Resumen Profesional', experience: 'Experiencia Laboral', education: 'Educación', skills: 'Habilidades Técnicas', softSkills: 'Habilidades Blandas', languages: 'Idiomas', certifications: 'Certificaciones', projects: 'Proyectos Destacados', present: 'Presente' }

  const skills = splitList(data.skills)
  const softSkills = splitList(data.softSkills)

  const Title = ({ children }) => (
    <div className="border-b-2 border-slate-900 mb-2 pb-0.5 mt-4">
      <h2 className="text-[9pt] font-bold uppercase tracking-wider text-slate-900">{children}</h2>
    </div>
  )

  return (
    <div className="bg-white text-slate-900 px-8 py-6 font-sans text-[9pt] leading-snug min-h-full">
      <div className="text-center pb-3 mb-2 border-b-[3px] border-slate-900">
        <h1 className="text-[18pt] font-bold tracking-wide">{esc(data.name) || 'Tu Nombre'}</h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[7.5pt] text-slate-600 mt-2">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.linkedin && <span>🔗 {data.linkedin}</span>}
          {data.website && <span>🌐 {data.website}</span>}
        </div>
      </div>

      {data.summary && <><Title>{t.summary}</Title><p className="text-[8pt] leading-relaxed text-slate-700">{data.summary}</p></>}

      {data.experience?.some(e => e.position || e.company) && <>
        <Title>{t.experience}</Title>
        {data.experience.filter(e => e.position || e.company).map((e, i) => (
          <div key={i} className="mb-2.5">
            <div className="flex justify-between items-baseline">
              <strong className="text-[9pt] text-slate-900">{esc(e.position)}</strong>
              <span className="text-[7pt] text-slate-500">{fmtDate(e.startDate, lang)}{(e.startDate || e.endDate) ? ' – ' : ''}{fmtDate(e.endDate, lang) || (e.startDate ? t.present : '')}</span>
            </div>
            <div className="text-[8pt] text-slate-700">{esc(e.company)}{e.location && ` · ${e.location}`}</div>
            {e.bullets?.filter(Boolean).length > 0 && (
              <ul className="list-disc pl-4 mt-1">
                {e.bullets.filter(Boolean).map((b, j) => <li key={j} className="text-[7.5pt] text-slate-700">{b}</li>)}
              </ul>
            )}
          </div>
        ))}
      </>}

      {data.education?.some(e => e.degree || e.institution) && <>
        <Title>{t.education}</Title>
        {data.education.filter(e => e.degree || e.institution).map((e, i) => (
          <div key={i} className="mb-1.5">
            <div className="flex justify-between items-baseline">
              <strong className="text-[9pt]">{esc(e.degree)}</strong>
              <span className="text-[7pt] text-slate-500">{e.year}</span>
            </div>
            <div className="text-[8pt] text-slate-700">{esc(e.institution)}</div>
          </div>
        ))}
      </>}

      {skills.length > 0 && <><Title>{t.skills}</Title><p className="text-[8pt] text-slate-700 leading-relaxed">{skills.join(' · ')}</p></>}
      {softSkills.length > 0 && <><Title>{t.softSkills}</Title><p className="text-[8pt] text-slate-700 leading-relaxed">{softSkills.join(' · ')}</p></>}

      {data.languages?.some(l => l.name) && <>
        <Title>{t.languages}</Title>
        <div className="text-[8pt] text-slate-700">
          {data.languages.filter(l => l.name).map((l, i) => <span key={i} className="mr-3">{l.name} {l.level && <span className="text-slate-500">({l.level})</span>}</span>)}
        </div>
      </>}

      {data.certifications?.some(c => c.name) && <>
        <Title>{t.certifications}</Title>
        {data.certifications.filter(c => c.name).map((c, i) => (
          <div key={i} className="text-[8pt] text-slate-700"><strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}{c.year && ` (${c.year})`}</div>
        ))}
      </>}

      {data.projects?.some(p => p.name) && <>
        <Title>{t.projects}</Title>
        {data.projects.filter(p => p.name).map((p, i) => (
          <div key={i} className="mb-1.5">
            <strong className="text-[9pt]">{p.name}</strong>
            {p.url && <span className="text-[7pt] text-slate-500"> | {p.url}</span>}
            {p.description && <p className="text-[7.5pt] text-slate-700 mt-0.5">{p.description}</p>}
          </div>
        ))}
      </>}
    </div>
  )
}

// ── MODERNO ──────────────────────────────────────────────────────────────────
function Moderno({ data, lang }) {
  const t = lang === 'en'
    ? { summary: 'About Me', experience: 'Experience', education: 'Education', skills: 'Skills', languages: 'Languages', interests: 'Interests', present: 'Present' }
    : { summary: 'Sobre Mí', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', languages: 'Idiomas', interests: 'Intereses', present: 'Presente' }

  const skills = splitList(data.skills)
  const interests = splitList(data.interests)
  const accent = '#2563eb'

  return (
    <div className="bg-white text-slate-800 font-sans flex min-h-full text-[9pt]">
      <div className="w-[35%] bg-slate-800 text-slate-200 p-5 flex flex-col gap-4">
        {data.photo && <div className="text-center"><img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover border-2 mx-auto" style={{ borderColor: accent }} /></div>}
        <div>
          <h1 className="text-[13pt] font-bold text-white leading-tight">{esc(data.name) || 'Tu Nombre'}</h1>
        </div>
        <div className="text-[7.5pt] space-y-1">
          {data.email && <div>✉ {data.email}</div>}
          {data.phone && <div>📞 {data.phone}</div>}
          {data.location && <div>📍 {data.location}</div>}
          {data.linkedin && <div>🔗 {data.linkedin}</div>}
        </div>
        {skills.length > 0 && (
          <div>
            <div className="text-[8pt] font-bold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2" style={{ color: accent + 'cc' }}>{t.skills}</div>
            {skills.map((s, i) => (
              <div key={i} className="mb-1.5">
                <div className="text-[8pt] mb-0.5">{s}</div>
                <div className="bg-slate-700 h-1 rounded"><div className="h-1 rounded" style={{ background: accent, width: '80%' }} /></div>
              </div>
            ))}
          </div>
        )}
        {data.languages?.some(l => l.name) && (
          <div>
            <div className="text-[8pt] font-bold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2" style={{ color: accent + 'cc' }}>{t.languages}</div>
            {data.languages.filter(l => l.name).map((l, i) => <div key={i} className="text-[8pt]">{l.name} <span className="text-slate-400">({l.level})</span></div>)}
          </div>
        )}
        {interests.length > 0 && (
          <div>
            <div className="text-[8pt] font-bold uppercase tracking-wider border-b border-slate-600 pb-1 mb-2" style={{ color: accent + 'cc' }}>{t.interests}</div>
            <p className="text-[8pt] text-slate-300">{interests.join(' · ')}</p>
          </div>
        )}
      </div>
      <div className="flex-1 p-5">
        {data.summary && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-0.5 mb-2" style={{ borderColor: accent }}>{t.summary}</h2>
          <p className="text-[8pt] text-slate-700 leading-relaxed mb-3">{data.summary}</p>
        </>}
        {data.experience?.some(e => e.position || e.company) && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-0.5 mb-2 mt-3" style={{ borderColor: accent }}>{t.experience}</h2>
          {data.experience.filter(e => e.position || e.company).map((e, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex justify-between items-baseline"><strong className="text-[9pt]">{esc(e.position)}</strong><span className="text-[7pt] text-slate-500">{fmtDate(e.startDate, lang)} – {fmtDate(e.endDate, lang) || (e.startDate ? t.present : '')}</span></div>
              <div className="text-[8pt] mb-1" style={{ color: accent }}>{esc(e.company)}</div>
              {e.bullets?.filter(Boolean).length > 0 && <ul className="list-disc pl-4">{e.bullets.filter(Boolean).map((b, j) => <li key={j} className="text-[7.5pt] text-slate-700">{b}</li>)}</ul>}
            </div>
          ))}
        </>}
        {data.education?.some(e => e.degree || e.institution) && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-0.5 mb-2 mt-3" style={{ borderColor: accent }}>{t.education}</h2>
          {data.education.filter(e => e.degree || e.institution).map((e, i) => (
            <div key={i} className="mb-1.5"><strong className="text-[9pt]">{esc(e.degree)}</strong><div className="text-[8pt]" style={{ color: accent }}>{esc(e.institution)}</div><div className="text-[7pt] text-slate-500">{e.year}</div></div>
          ))}
        </>}
      </div>
    </div>
  )
}

// ── MINIMALISTA ──────────────────────────────────────────────────────────────
function Minimalista({ data, lang }) {
  const t = lang === 'en'
    ? { summary: 'Summary', experience: 'Experience', education: 'Education', skills: 'Skills', languages: 'Languages', present: 'Present' }
    : { summary: 'Resumen', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', languages: 'Idiomas', present: 'Presente' }
  const skills = splitList(data.skills)

  const Sec = ({ title, children }) => (
    <div className="mb-5">
      <div className="text-[7.5pt] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2.5">{title}</div>
      {children}
    </div>
  )

  return (
    <div className="bg-white text-slate-800 font-sans px-10 py-8 text-[9pt] min-h-full">
      <div className="mb-7 border-b border-slate-200 pb-4">
        <h1 className="text-[22pt] font-light tracking-tight text-slate-900 mb-1">{esc(data.name) || 'Tu Nombre'}</h1>
        <div className="flex flex-wrap gap-x-4 text-[7.5pt] text-slate-500">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>
      {data.summary && <Sec title={t.summary}><p className="text-[8pt] text-slate-700 leading-relaxed">{data.summary}</p></Sec>}
      {data.experience?.some(e => e.position || e.company) && <Sec title={t.experience}>
        {data.experience.filter(e => e.position || e.company).map((e, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between"><strong className="text-[9pt]">{esc(e.position)}</strong><span className="text-[7pt] text-slate-400">{fmtDate(e.startDate, lang)} – {fmtDate(e.endDate, lang) || (e.startDate ? t.present : '')}</span></div>
            <div className="text-[8pt] text-slate-600 mb-1">{esc(e.company)}</div>
            {e.bullets?.filter(Boolean).length > 0 && <ul className="list-disc pl-4">{e.bullets.filter(Boolean).map((b, j) => <li key={j} className="text-[7.5pt] text-slate-700">{b}</li>)}</ul>}
          </div>
        ))}
      </Sec>}
      {data.education?.some(e => e.degree || e.institution) && <Sec title={t.education}>
        {data.education.filter(e => e.degree || e.institution).map((e, i) => (
          <div key={i} className="mb-2"><div className="flex justify-between"><strong className="text-[9pt]">{esc(e.degree)}</strong><span className="text-[7pt] text-slate-400">{e.year}</span></div><div className="text-[8pt] text-slate-600">{esc(e.institution)}</div></div>
        ))}
      </Sec>}
      {skills.length > 0 && <Sec title={t.skills}><p className="text-[8pt] text-slate-700">{skills.join('  ·  ')}</p></Sec>}
    </div>
  )
}

// ── CREATIVO ─────────────────────────────────────────────────────────────────
function Creativo({ data, lang }) {
  const t = lang === 'en' ? { about: 'About Me', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects', languages: 'Languages', present: 'Present' }
                         : { about: 'Sobre Mí', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', projects: 'Proyectos', languages: 'Idiomas', present: 'Presente' }
  const skills = splitList(data.skills)
  const ACCENT = '#7c3aed'; const ACCENT2 = '#a78bfa'

  return (
    <div className="bg-white text-slate-800 font-sans flex min-h-full text-[9pt]">
      <div className="w-[40%] text-purple-100 p-5 flex flex-col gap-4" style={{ background: '#2d1b69' }}>
        {data.photo && <div className="text-center"><img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover border-2 mx-auto" style={{ borderColor: ACCENT2 }} /></div>}
        <h1 className="text-[13pt] font-bold text-white leading-tight">{esc(data.name) || 'Tu Nombre'}</h1>
        <div className="text-[7.5pt] space-y-1">
          {data.email && <div>✉ {data.email}</div>}
          {data.phone && <div>📞 {data.phone}</div>}
          {data.location && <div>📍 {data.location}</div>}
          {data.linkedin && <div>🔗 {data.linkedin}</div>}
        </div>
        {skills.length > 0 && (
          <div>
            <div className="text-[8pt] font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT2 }}>{t.skills}</div>
            <div className="flex flex-wrap gap-1">
              {skills.map((s, i) => <span key={i} className="text-[7.5pt] px-2 py-0.5 rounded-full" style={{ background: '#f5f3ff', color: ACCENT, border: `1px solid ${ACCENT2}` }}>{s}</span>)}
            </div>
          </div>
        )}
        {data.languages?.some(l => l.name) && (
          <div>
            <div className="text-[8pt] font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT2 }}>{t.languages}</div>
            {data.languages.filter(l => l.name).map((l, i) => <div key={i} className="text-[8pt]">{l.name} <span style={{ color: ACCENT2 }}>{l.level}</span></div>)}
          </div>
        )}
      </div>
      <div className="flex-1 p-5 bg-white">
        {data.about && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider border-b-2 pb-0.5 mb-2" style={{ color: ACCENT, borderColor: ACCENT }}>{t.about}</h2>
          <p className="text-[8pt] text-slate-700 leading-relaxed mb-3">{data.about}</p>
        </>}
        {data.experience?.some(e => e.position || e.company) && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider border-b-2 pb-0.5 mb-2 mt-3" style={{ color: ACCENT, borderColor: ACCENT }}>{t.experience}</h2>
          {data.experience.filter(e => e.position || e.company).map((e, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex justify-between items-baseline"><strong className="text-[9pt]">{esc(e.position)}</strong><span className="text-[7pt] text-slate-500">{fmtDate(e.startDate, lang)} – {fmtDate(e.endDate, lang) || (e.startDate ? t.present : '')}</span></div>
              <div className="text-[8pt] mb-1" style={{ color: ACCENT }}>{esc(e.company)}</div>
              {e.bullets?.filter(Boolean).length > 0 && <ul className="list-disc pl-4">{e.bullets.filter(Boolean).map((b, j) => <li key={j} className="text-[7.5pt] text-slate-700">{b}</li>)}</ul>}
            </div>
          ))}
        </>}
        {data.projects?.some(p => p.name) && <>
          <h2 className="text-[9pt] font-bold uppercase tracking-wider border-b-2 pb-0.5 mb-2 mt-3" style={{ color: ACCENT, borderColor: ACCENT }}>{t.projects}</h2>
          {data.projects.filter(p => p.name).map((p, i) => (
            <div key={i} className="mb-1.5 p-1.5 rounded border-l-2" style={{ background: '#f5f3ff', borderColor: ACCENT }}><strong className="text-[9pt]">{p.name}</strong>{p.description && <p className="text-[7.5pt] text-slate-600 mt-0.5">{p.description}</p>}</div>
          ))}
        </>}
      </div>
    </div>
  )
}

// ── EJECUTIVO ────────────────────────────────────────────────────────────────
function Ejecutivo({ data, lang }) {
  const t = lang === 'en' ? { profile: 'Executive Profile', experience: 'Professional Experience', education: 'Education', languages: 'Languages', present: 'Present' }
                         : { profile: 'Perfil Ejecutivo', experience: 'Experiencia Profesional', education: 'Educación', languages: 'Idiomas', present: 'Presente' }
  const ACCENT = '#0f2d5e'

  const Sec = ({ title, children }) => <div className="mb-4">
    <div className="text-white text-[8pt] font-bold uppercase tracking-[0.2em] px-3 py-1 mb-2" style={{ background: ACCENT }}>{title}</div>
    {children}
  </div>

  return (
    <div className="bg-white px-8 py-6 font-serif text-[9pt] text-slate-900 min-h-full">
      <div className="text-center pb-3 mb-4 border-b-[3px]" style={{ borderColor: ACCENT }}>
        <h1 className="text-[20pt] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>{esc(data.name) || 'Tu Nombre'}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 text-[8pt] text-slate-600 mt-2">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>
      {data.profile && <Sec title={t.profile}><p className="text-[9pt] text-slate-700 leading-relaxed px-1">{data.profile}</p></Sec>}
      {data.experience?.some(e => e.position || e.company) && <Sec title={t.experience}>
        {data.experience.filter(e => e.position || e.company).map((e, i) => (
          <div key={i} className="mb-3 pl-3 border-l-2 border-slate-300">
            <div className="flex justify-between items-baseline"><strong className="text-[10pt]" style={{ color: ACCENT }}>{esc(e.position)}</strong><span className="text-[8pt] italic text-slate-500">{fmtDate(e.startDate, lang)} – {fmtDate(e.endDate, lang) || (e.startDate ? t.present : '')}</span></div>
            <div className="text-[9pt] font-semibold mb-1">{esc(e.company)}{e.location && ` · ${e.location}`}</div>
            {e.bullets?.filter(Boolean).length > 0 && <ul className="list-disc pl-4">{e.bullets.filter(Boolean).map((b, j) => <li key={j} className="text-[8pt] text-slate-700">{b}</li>)}</ul>}
          </div>
        ))}
      </Sec>}
      {data.education?.some(e => e.degree || e.institution) && <Sec title={t.education}>
        {data.education.filter(e => e.degree || e.institution).map((e, i) => (
          <div key={i} className="flex justify-between mb-1.5"><div><strong className="text-[9pt]">{esc(e.degree)}</strong><div className="text-[8pt] text-slate-600">{esc(e.institution)}</div></div><span className="text-[8pt] text-slate-500">{e.year}</span></div>
        ))}
      </Sec>}
    </div>
  )
}

const RENDERERS = { recommended: Recommended, moderno: Moderno, minimalista: Minimalista, creativo: Creativo, ejecutivo: Ejecutivo }

export default function LivePreview({ template, data, lang = 'es' }) {
  const Render = RENDERERS[template] || Recommended

  return (
    <div className="w-full aspect-[1/1.414] bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
      <div className="w-full h-full overflow-hidden">
        <Render data={data} lang={lang} />
      </div>
    </div>
  )
}
