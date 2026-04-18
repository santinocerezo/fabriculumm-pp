'use strict';

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');
const path    = require('path');
const fs      = require('fs');
const { generatePdf } = require('./pdf');

const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
const corsOptions = allowedOrigins.length
  ? {
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('CORS: origin not allowed'));
      },
    }
  : {};

app.set('trust proxy', 1);
app.use(helmet({
  // El PDF lo genera un browser aparte; no sirvo HTML que lo necesite
  contentSecurityPolicy: false,
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));

const pdfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many PDF requests. Try again in a minute.' },
});

app.get('/health', (_req, res) => res.json({ ok: true }));

// POST /api/generate-pdf
app.post('/api/generate-pdf', pdfLimiter, async (req, res) => {
  const { template, data, lang = 'es' } = req.body || {};

  if (!template || typeof template !== 'string' || !data || typeof data !== 'object') {
    return res.status(400).json({ error: 'template and data are required' });
  }

  try {
    const pdf = await generatePdf({ template, data, lang });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="fabriculumm-cv.pdf"');
    res.send(pdf);
  } catch (err) {
    console.error('[PDF]', err.message);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// Serve frontend in production
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`FABRICULUMM backend → http://localhost:${PORT}`);
});
