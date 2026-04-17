'use strict';

const { esc, formatDate } = require('./helpers');

function renderRecommended({ data, lang = 'es' }) {
  const t = lang === 'en' ? {
    summary: 'Professional Summary', experience: 'Work Experience', education: 'Education',
    skills: 'Technical Skills', softSkills: 'Soft Skills', languages: 'Languages',
    certifications: 'Certifications', projects: 'Key Projects', present: 'Present',
  } : {
    summary: 'Resumen Profesional', experience: 'Experiencia Laboral', education: 'Educación',
    skills: 'Habilidades Técnicas', softSkills: 'Habilidades Blandas', languages: 'Idiomas',
    certifications: 'Certificaciones', projects: 'Proyectos Destacados', present: 'Presente',
  };

  const {
    name = '', email = '', phone = '', location = '', linkedin = '', website = '',
    summary = '',
    experience = [],
    education = [],
    skills = [],
    softSkills = [],
    languages = [],
    certifications = [],
    projects = [],
  } = data;

  const sectionTitle = (title) =>
    `<div style="border-bottom:2px solid #1a1a2e;margin:18px 0 8px;padding-bottom:3px">
      <h2 style="font-size:11pt;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#1a1a2e;margin:0">${esc(title)}</h2>
    </div>`;

  const expHtml = experience.map(e => `
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <strong style="font-size:10.5pt;color:#111">${esc(e.position)}</strong>
        <span style="font-size:9pt;color:#555">${formatDate(e.startDate, lang)} – ${formatDate(e.endDate, lang) || t.present}</span>
      </div>
      <div style="font-size:10pt;color:#333;margin-bottom:4px">${esc(e.company)}${e.location ? ` · ${esc(e.location)}` : ''}</div>
      ${e.bullets && e.bullets.length ? `<ul style="margin:4px 0 0 16px;padding:0">${e.bullets.map(b => `<li style="font-size:9.5pt;color:#333;margin-bottom:2px">${esc(b)}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  const eduHtml = education.map(e => `
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <strong style="font-size:10.5pt;color:#111">${esc(e.degree)}</strong>
        <span style="font-size:9pt;color:#555">${esc(e.year || '')}</span>
      </div>
      <div style="font-size:10pt;color:#333">${esc(e.institution)}</div>
    </div>
  `).join('');

  const skillsHtml = skills.length
    ? `<p style="font-size:9.5pt;color:#333;line-height:1.6">${skills.map(s => esc(s)).join(' · ')}</p>` : '';

  const softHtml = softSkills.length
    ? `<p style="font-size:9.5pt;color:#333;line-height:1.6">${softSkills.map(s => esc(s)).join(' · ')}</p>` : '';

  const langHtml = languages.map(l =>
    `<span style="font-size:9.5pt;color:#333;margin-right:16px">${esc(l.name)} <span style="color:#666">(${esc(l.level)})</span></span>`
  ).join('');

  const certHtml = certifications.map(c => `
    <div style="margin-bottom:6px;font-size:9.5pt;color:#333">
      <strong>${esc(c.name)}</strong>${c.issuer ? ` — ${esc(c.issuer)}` : ''}${c.year ? ` (${esc(c.year)})` : ''}
    </div>
  `).join('');

  const projHtml = projects.map(p => `
    <div style="margin-bottom:10px">
      <strong style="font-size:10.5pt;color:#111">${esc(p.name)}</strong>
      ${p.url ? ` <span style="font-size:9pt;color:#555">| ${esc(p.url)}</span>` : ''}
      ${p.description ? `<p style="font-size:9.5pt;color:#333;margin-top:2px">${esc(p.description)}</p>` : ''}
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; }
  body { font-family: 'Arial', 'Helvetica', sans-serif; margin: 0; padding: 28px 36px; font-size: 10pt; line-height: 1.5; color: #222; background: #fff; }
  ul { list-style: disc; }
</style>
</head>
<body>
  <div style="text-align:center;margin-bottom:16px;border-bottom:3px solid #1a1a2e;padding-bottom:14px">
    <h1 style="font-size:22pt;font-weight:700;color:#1a1a2e;margin:0 0 6px;letter-spacing:1px">${esc(name)}</h1>
    <div style="font-size:9.5pt;color:#444;display:flex;flex-wrap:wrap;justify-content:center;gap:12px">
      ${email    ? `<span>✉ ${esc(email)}</span>` : ''}
      ${phone    ? `<span>📞 ${esc(phone)}</span>` : ''}
      ${location ? `<span>📍 ${esc(location)}</span>` : ''}
      ${linkedin ? `<span>🔗 ${esc(linkedin)}</span>` : ''}
      ${website  ? `<span>🌐 ${esc(website)}</span>` : ''}
    </div>
  </div>

  ${summary ? sectionTitle(t.summary) + `<p style="font-size:9.5pt;color:#333;line-height:1.6">${esc(summary)}</p>` : ''}
  ${experience.length ? sectionTitle(t.experience) + expHtml : ''}
  ${education.length  ? sectionTitle(t.education)   + eduHtml : ''}
  ${skills.length     ? sectionTitle(t.skills)       + skillsHtml : ''}
  ${softSkills.length ? sectionTitle(t.softSkills)   + softHtml : ''}
  ${languages.length  ? sectionTitle(t.languages)    + `<div>${langHtml}</div>` : ''}
  ${certifications.length ? sectionTitle(t.certifications) + certHtml : ''}
  ${projects.length   ? sectionTitle(t.projects)     + projHtml : ''}
</body>
</html>`;
}

module.exports = { renderRecommended };
