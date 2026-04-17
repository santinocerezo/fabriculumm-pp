'use strict';

const { esc, formatDate } = require('./helpers');

function renderEjecutivo({ data, lang = 'es' }) {
  const t = lang === 'en'
    ? { profile:'Executive Profile', experience:'Professional Experience', education:'Education', complementary:'Complementary Training', languages:'Languages', references:'Professional References', present:'Present' }
    : { profile:'Perfil Ejecutivo', experience:'Experiencia Profesional', education:'Educación', complementary:'Formación Complementaria', languages:'Idiomas', references:'Referencias Profesionales', present:'Presente' };

  const { name='', email='', phone='', location='', linkedin='', profile='', experience=[], education=[], complementary=[], languages=[], references=[] } = data;

  const ACCENT = '#0f2d5e';

  const sec = (title, content) => `
    <div style="margin-bottom:20px">
      <div style="background:${ACCENT};color:#fff;font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:5px 12px;margin-bottom:12px">${esc(title)}</div>
      ${content}
    </div>`;

  const expHtml = experience.map(e => `
    <div style="margin-bottom:16px;padding-left:12px;border-left:3px solid #cdd9e8">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <strong style="font-size:11pt;color:${ACCENT}">${esc(e.position)}</strong>
        <span style="font-size:9pt;color:#666;font-style:italic">${formatDate(e.startDate,lang)} – ${formatDate(e.endDate,lang)||t.present}</span>
      </div>
      <div style="font-size:10pt;color:#333;font-weight:600;margin-bottom:4px">${esc(e.company)}${e.location?` · ${esc(e.location)}`:''}</div>
      ${e.bullets?.length ? `<ul style="margin:6px 0 0 16px;padding:0">${e.bullets.map(b=>`<li style="font-size:9.5pt;color:#444;margin-bottom:3px">${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>`).join('');

  const eduHtml = education.map(e => `
    <div style="margin-bottom:10px;display:flex;justify-content:space-between">
      <div>
        <strong style="font-size:10.5pt;color:#111">${esc(e.degree)}</strong>
        <div style="font-size:9.5pt;color:#555">${esc(e.institution)}</div>
      </div>
      <span style="font-size:9pt;color:#888;white-space:nowrap;margin-left:12px">${esc(e.year||'')}</span>
    </div>`).join('');

  const compHtml = complementary.map(c => `
    <div style="margin-bottom:8px;font-size:9.5pt;color:#333">
      <strong>${esc(c.name)}</strong>${c.institution?` — ${esc(c.institution)}`:''}${c.year?` (${esc(c.year)})`:''}</div>`).join('');

  const refHtml = references.map(r => `
    <div style="margin-bottom:10px">
      <strong style="font-size:10pt;color:#111">${esc(r.name)}</strong>
      <div style="font-size:9.5pt;color:#555">${esc(r.position)}${r.company?` · ${esc(r.company)}`:''}</div>
      ${r.contact?`<div style="font-size:9pt;color:#777">${esc(r.contact)}</div>`:''}
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Times New Roman','Times',serif;color:#111;background:#fff}ul{list-style:disc}</style></head>
<body style="padding:36px 44px;font-size:10pt;line-height:1.5">
  <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid ${ACCENT}">
    <h1 style="font-size:28pt;font-weight:700;color:${ACCENT};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px">${esc(name)}</h1>
    <div style="font-size:9.5pt;color:#555;display:flex;flex-wrap:wrap;justify-content:center;gap:18px">
      ${email?`<span>${esc(email)}</span>`:''}${phone?`<span>${esc(phone)}</span>`:''}${location?`<span>${esc(location)}</span>`:''}${linkedin?`<span>${esc(linkedin)}</span>`:''}
    </div>
  </div>
  ${profile ? sec(t.profile, `<p style="font-size:10pt;color:#333;line-height:1.7;padding:0 4px">${esc(profile)}</p>`) : ''}
  ${experience.length  ? sec(t.experience, expHtml) : ''}
  ${education.length   ? sec(t.education, eduHtml) : ''}
  ${complementary.length ? sec(t.complementary, compHtml) : ''}
  ${languages.length   ? sec(t.languages, `<p style="font-size:9.5pt;color:#333">${languages.map(l=>`${esc(l.name)} (${esc(l.level)})`).join('  ·  ')}</p>`) : ''}
  ${references.length  ? sec(t.references, refHtml) : ''}
</body></html>`;
}

module.exports = { renderEjecutivo };
