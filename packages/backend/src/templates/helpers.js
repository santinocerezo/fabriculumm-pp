'use strict';

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(str, lang = 'es') {
  if (!str) return '';
  if (str.toLowerCase() === 'present' || str.toLowerCase() === 'presente') {
    return lang === 'en' ? 'Present' : 'Presente';
  }
  const d = new Date(str + '-01');
  if (isNaN(d)) return esc(str);
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { month: 'short', year: 'numeric' });
}

module.exports = { esc, formatDate };
