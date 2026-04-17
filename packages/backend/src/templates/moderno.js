'use strict';

const { esc, formatDate } = require('./helpers');

function renderModerno({ data, lang = 'es' }) {
  const t = lang === 'en' ? {
    summary: 'About Me', experience: 'Experience', education: 'Education',
    skills: 'Skills', languages: 'Languages', interests: 'Interests', present: 'Present',
  } : {
    summary: 'Sobre Mí', experience: 'Experiencia', education: 'Educación',
    skills: 'Habilidades', languages: 'Idiomas', interests: 'Intereses', present: 'Presente',
  };

  const {
    name = '', email = '', phone = '', location = '', linkedin = '',
    photo = '', summary = '',
    experience = [], education = [],
    skills = [], languages = [], interests = [],
  } = data;

  const ACCENT = '#2563eb';

  const expHtml = experience.map(e => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between">
        <strong style="color:#111;font-size:10pt">${esc(e.position)}</strong>
        <span style="font-size:8.5pt;color:#666">${formatDate(e.startDate, lang)} – ${formatDate(e.endDate, lang) || t.present}</span>
      </div>
      <div style="color:${ACCENT};font-size:9.5pt;margin-bottom:3px">${esc(e.company)}</div>
      ${e.bullets?.length ? `<ul style="margin:4px 0 0 14px;padding:0">${e.bullets.map(b => `<li style="font-size:9pt;color:#444;margin-bottom:2px">${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  const eduHtml = education.map(e => `
    <div style="margin-bottom:10px">
      <strong style="font-size:10pt;color:#111">${esc(e.degree)}</strong>
      <div style="color:${ACCENT};font-size:9.5pt">${esc(e.institution)}</div>
      <div style="font-size:8.5pt;color:#666">${esc(e.year || '')}</div>
    </div>
  `).join('');

  const skillBar = (skill) => `
    <div style="margin-bottom:6px">
      <div style="font-size:9pt;color:#dde;margin-bottom:2px">${esc(skill.name || skill)}</div>
      ${skill.level ? `<div style="background:#334;border-radius:3px;height:5px"><div style="background:${ACCENT};width:${Math.min(100, skill.level || 80)}%;height:5px;border-radius:3px"></div></div>` : ''}
    </div>`;

  const sidebar = `
    <div style="width:200px;min-width:200px;background:#1e2a3b;color:#dde;padding:24px 16px;display:flex;flex-direction:column;gap:20px">
      ${photo ? `<div style="text-align:center"><img src="${esc(photo)}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid ${ACCENT}" /></div>` : ''}
      <div>
        <h1 style="font-size:15pt;font-weight:700;color:#fff;margin:0 0 4px;line-height:1.2">${esc(name)}</h1>
      </div>
      <div style="font-size:8.5pt;line-height:1.8">
        ${email    ? `<div>✉ ${esc(email)}</div>` : ''}
        ${phone    ? `<div>📞 ${esc(phone)}</div>` : ''}
        ${location ? `<div>📍 ${esc(location)}</div>` : ''}
        ${linkedin ? `<div>🔗 ${esc(linkedin)}</div>` : ''}
      </div>
      ${skills.length ? `
        <div>
          <div style="font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${ACCENT};border-bottom:1px solid #334;padding-bottom:4px;margin-bottom:10px">${t.skills}</div>
          ${skills.map(skillBar).join('')}
        </div>` : ''}
      ${languages.length ? `
        <div>
          <div style="font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${ACCENT};border-bottom:1px solid #334;padding-bottom:4px;margin-bottom:10px">${t.languages}</div>
          ${languages.map(l => `<div style="font-size:9pt;margin-bottom:4px">${esc(l.name)} <span style="color:#8899aa">(${esc(l.level)})</span></div>`).join('')}
        </div>` : ''}
      ${interests.length ? `
        <div>
          <div style="font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${ACCENT};border-bottom:1px solid #334;padding-bottom:4px;margin-bottom:10px">${t.interests}</div>
          <p style="font-size:9pt;color:#bcc">${interests.map(esc).join(' · ')}</p>
        </div>` : ''}
    </div>`;

  const sectionTitle = (title) =>
    `<div style="border-bottom:2px solid ${ACCENT};margin:16px 0 8px;padding-bottom:3px">
      <h2 style="font-size:10.5pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1e2a3b;margin:0">${esc(title)}</h2>
    </div>`;

  const main = `
    <div style="flex:1;padding:24px 28px;overflow:hidden">
      ${summary ? sectionTitle(t.summary) + `<p style="font-size:9.5pt;color:#333;line-height:1.6">${esc(summary)}</p>` : ''}
      ${experience.length ? sectionTitle(t.experience) + expHtml : ''}
      ${education.length  ? sectionTitle(t.education)  + eduHtml : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><style>* { box-sizing:border-box; margin:0; padding:0; } body { font-family:'Arial','Helvetica',sans-serif; } ul { list-style:disc; }</style></head>
<body>
  <div style="display:flex;min-height:100vh;background:#fff">
    ${sidebar}
    ${main}
  </div>
</body>
</html>`;
}

module.exports = { renderModerno };
