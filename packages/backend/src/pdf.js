'use strict';

const puppeteer = require('puppeteer');
const { renderRecommended } = require('./templates/recommended');
const { renderModerno }     = require('./templates/moderno');
const { renderMinimalista } = require('./templates/minimalista');
const { renderCreativo }    = require('./templates/creativo');
const { renderEjecutivo }   = require('./templates/ejecutivo');

const renderers = {
  recommended: renderRecommended,
  moderno:     renderModerno,
  minimalista: renderMinimalista,
  creativo:    renderCreativo,
  ejecutivo:   renderEjecutivo,
};

// Solo permitimos recursos embebidos (data:) o about:blank. Cualquier URL
// externa (http, https, file, ftp) se bloquea para evitar SSRF y data leaks.
function shouldBlock(url) {
  if (!url) return true;
  const u = url.toLowerCase();
  if (u.startsWith('data:')) return false;
  if (u === 'about:blank') return false;
  return true;
}

async function generatePdf({ template, data, lang }) {
  const render = renderers[template];
  if (!render) throw new Error(`Unknown template: ${template}`);

  const html = render({ data, lang });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Bloquea cualquier request externo antes de que cargue contenido.
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (shouldBlock(req.url())) req.abort();
      else req.continue();
    });

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}

module.exports = { generatePdf };
