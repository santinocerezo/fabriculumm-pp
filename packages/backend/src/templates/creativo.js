'use strict';

const { esc, formatDate } = require('./helpers');

function renderCreativo({ data, lang = 'es' }) {
  const t = lang === 'en'
    ? { about:'About Me', experience:'Experience', education:'Education', skills:'Skills', languages:'Languages', projects:'Projects & Portfolio', social:'Social Media', present:'Present' }
    : { about:'Sobre Mí', experience:'Experiencia', education:'Educación', skills:'Habilidades', languages:'Idiomas', projects:'Proyectos / Portfolio', social:'Redes Sociales', present:'Presente' };

  const { name='', email='', phone='', location='', linkedin='', photo='', about='', experience=[], education=[], skills=[], languages=[], projects=[], social=[] } = data;

  const ACCENT = '#7c3aed';
  const ACCENT2 = '#a78bfa';

  const leftSec = (title, content) => `
    <div style="margin-bottom:18px">
      <div style="font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${ACCENT2};border-left:3px solid ${ACCENT2};padding-left:8px;margin-bottom:10px">${esc(title)}</div>
      ${content}
    </div>`;

  const rightSec = (title, content) => `
    <div style="margin-bottom:20px">
      <div style="font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};border-bottom:2px solid ${ACCENT};padding-bottom:4px;margin-bottom:10px">${esc(title)}</div>
      ${content}
    </div>`;

  const expHtml = experience.map(e => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <strong style="font-size:10pt;color:#111">${esc(e.position)}</strong>
        <span style="font-size:8.5pt;color:#777">${formatDate(e.startDate,lang)} – ${formatDate(e.endDate,lang)||t.present}</span>
      </div>
      <div style="font-size:9.5pt;color:${ACCENT};margin-bottom:3px">${esc(e.company)}</div>
      ${e.bullets?.length ? `<ul style="margin:4px 0 0 14px;padding:0">${e.bullets.map(b=>`<li style="font-size:9pt;color:#444;margin-bottom:2px">${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>`).join('');

  const projHtml = projects.map(p => `
    <div style="margin-bottom:10px;padding:8px;background:#f5f3ff;border-radius:4px;border-left:3px solid ${ACCENT}">
      <strong style="font-size:10pt;color:#111">${esc(p.name)}</strong>
      ${p.url ? `<span style="font-size:8.5pt;color:#777"> — ${esc(p.url)}</span>` : ''}
      ${p.description ? `<p style="font-size:9pt;color:#555;margin-top:3px">${esc(p.description)}</p>` : ''}
    </div>`).join('');

  const skillPill = s => `<span style="display:inline-block;background:#f5f3ff;color:${ACCENT};border:1px solid ${ACCENT2};border-radius:12px;font-size:8.5pt;padding:2px 10px;margin:2px">${esc(s.name||s)}</span>`;

  const left = `
    <div style="width:210px;min-width:210px;background:#2d1b69;color:#e2d9f3;padding:24px 16px">
      ${photo ? `<div style="text-align:center;margin-bottom:16px"><img src="${esc(photo)}" style="width:85px;height:85px;border-radius:50%;object-fit:cover;border:3px solid ${ACCENT2}"/></div>` : ''}
      <h1 style="font-size:14pt;font-weight:700;color:#fff;line-height:1.2;margin-bottom:16px">${esc(name)}</h1>
      ${leftSec('Contacto', `
        <div style="font-size:8.5pt;line-height:2">
          ${email?`<div>✉ ${esc(email)}</div>`:''}${phone?`<div>📞 ${esc(phone)}</div>`:''}${location?`<div>📍 ${esc(location)}</div>`:''}${linkedin?`<div>🔗 ${esc(linkedin)}</div>`:''}
        </div>`)}
      ${skills.length ? leftSec(t.skills, skills.map(skillPill).join('')) : ''}
      ${languages.length ? leftSec(t.languages, languages.map(l=>`<div style="font-size:9pt;margin-bottom:4px;color:#ccc">${esc(l.name)} <span style="color:#a78bfa">${esc(l.level)}</span></div>`).join('')) : ''}
      ${social.length ? leftSec(t.social, social.map(s=>`<div style="font-size:8.5pt;margin-bottom:3px;color:#ccc">${esc(s.platform)}: ${esc(s.handle)}</div>`).join('')) : ''}
    </div>`;

  const right = `
    <div style="flex:1;padding:24px 28px;background:#fff">
      ${about ? rightSec(t.about, `<p style="font-size:9.5pt;color:#444;line-height:1.7">${esc(about)}</p>`) : ''}
      ${experience.length ? rightSec(t.experience, expHtml) : ''}
      ${education.length  ? rightSec(t.education, education.map(e=>`
        <div style="margin-bottom:10px">
          <strong style="font-size:10pt;color:#111">${esc(e.degree)}</strong>
          <div style="font-size:9.5pt;color:${ACCENT}">${esc(e.institution)}</div>
          <div style="font-size:8.5pt;color:#777">${esc(e.year||'')}</div>
        </div>`).join('')) : ''}
      ${projects.length ? rightSec(t.projects, projHtml) : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Arial','Helvetica',sans-serif}ul{list-style:disc}</style></head>
<body><div style="display:flex;min-height:100vh">${left}${right}</div></body></html>`;
}

module.exports = { renderCreativo };
