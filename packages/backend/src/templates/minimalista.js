'use strict';

const { esc, formatDate } = require('./helpers');

function renderMinimalista({ data, lang = 'es' }) {
  const t = lang === 'en'
    ? { summary:'Summary', experience:'Experience', education:'Education', skills:'Skills', languages:'Languages', present:'Present' }
    : { summary:'Resumen', experience:'Experiencia', education:'Educación', skills:'Habilidades', languages:'Idiomas', present:'Presente' };

  const { name='', email='', phone='', location='', linkedin='', summary='', experience=[], education=[], skills=[], languages=[] } = data;

  const sec = (title, content) => `
    <div style="margin-bottom:22px">
      <div style="font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:10px">${esc(title)}</div>
      ${content}
    </div>`;

  const expHtml = experience.map(e => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between">
        <strong style="font-size:10.5pt;color:#111">${esc(e.position)}</strong>
        <span style="font-size:9pt;color:#999">${formatDate(e.startDate,lang)} – ${formatDate(e.endDate,lang)||t.present}</span>
      </div>
      <div style="font-size:9.5pt;color:#555;margin-bottom:4px">${esc(e.company)}</div>
      ${e.bullets?.length ? `<ul style="margin:4px 0 0 14px;padding:0">${e.bullets.map(b=>`<li style="font-size:9pt;color:#444;margin-bottom:2px">${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>`).join('');

  const eduHtml = education.map(e => `
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between">
        <strong style="font-size:10.5pt;color:#111">${esc(e.degree)}</strong>
        <span style="font-size:9pt;color:#999">${esc(e.year||'')}</span>
      </div>
      <div style="font-size:9.5pt;color:#555">${esc(e.institution)}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Helvetica Neue','Helvetica','Arial',sans-serif;color:#222;background:#fff}ul{list-style:disc}</style></head>
<body style="padding:48px 52px;font-size:10pt;line-height:1.6">
  <div style="margin-bottom:36px;border-bottom:1px solid #e0e0e0;padding-bottom:20px">
    <h1 style="font-size:26pt;font-weight:300;color:#111;letter-spacing:-1px;margin-bottom:8px">${esc(name)}</h1>
    <div style="font-size:9pt;color:#888;display:flex;flex-wrap:wrap;gap:16px">
      ${email?`<span>${esc(email)}</span>`:''}${phone?`<span>${esc(phone)}</span>`:''}${location?`<span>${esc(location)}</span>`:''}${linkedin?`<span>${esc(linkedin)}</span>`:''}
    </div>
  </div>
  ${summary ? sec(t.summary, `<p style="font-size:10pt;color:#444;line-height:1.7">${esc(summary)}</p>`) : ''}
  ${experience.length ? sec(t.experience, expHtml) : ''}
  ${education.length  ? sec(t.education, eduHtml) : ''}
  ${skills.length     ? sec(t.skills, `<p style="font-size:9.5pt;color:#555">${skills.map(esc).join('  ·  ')}</p>`) : ''}
  ${languages.length  ? sec(t.languages, `<p style="font-size:9.5pt;color:#555">${languages.map(l=>`${esc(l.name)} (${esc(l.level)})`).join('  ·  ')}</p>`) : ''}
</body></html>`;
}

module.exports = { renderMinimalista };
