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

async function generatePdf({ template, data, lang }) {
  const render = renderers[template];
  if (!render) throw new Error(`Unknown template: ${template}`);

  const html = render({ data, lang });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
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
