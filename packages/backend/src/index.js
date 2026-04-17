'use strict';

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { generatePdf } = require('./pdf');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// POST /api/generate-pdf
// Body: { template: string, data: object, lang: 'es'|'en' }
app.post('/api/generate-pdf', async (req, res) => {
  const { template, data, lang = 'es' } = req.body;

  if (!template || !data) {
    return res.status(400).json({ error: 'template and data are required' });
  }

  try {
    const pdf = await generatePdf({ template, data, lang });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="fabriculumm-cv.pdf"`);
    res.send(pdf);
  } catch (err) {
    console.error('[PDF]', err.message);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Serve frontend in production
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
const fs = require('fs');
if (process.env.NODE_ENV === 'production' && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`FABRICULUMM backend → http://localhost:${PORT}`);
});
