const fs = require('fs');
const path = require('path');

const sampleData = {
  name: 'Santiago Cerezo',
  email: 'santinocerezo11@gmail.com',
  phone: '+54 11 5555-5555',
  location: 'Buenos Aires, Argentina',
  linkedin: 'linkedin.com/in/santiago-cerezo',
  website: 'github.com/santinocerezo',
  photo: '',
  summary: 'Backend engineer con 5 años de experiencia en Node.js, PostgreSQL y arquitecturas distribuidas. Especializado en sistemas logísticos de alta disponibilidad y APIs REST escalables.',
  about: 'Desarrollador full-stack apasionado por construir productos que resuelvan problemas reales. Me gusta el diseño limpio, el código mantenible y los equipos que se apoyan.',
  profile: 'Líder técnico con trayectoria probada en la dirección de equipos de ingeniería de alto rendimiento. Experto en arquitectura de sistemas, con enfoque en eficiencia operacional y escalabilidad.',
  experience: [
    {
      position: 'Senior Backend Engineer',
      company: 'STN Logistics',
      location: 'Buenos Aires',
      startDate: '2023-01',
      endDate: '',
      bullets: [
        'Diseñé e implementé sistema de gestión de envíos que procesa 50k+ operaciones diarias',
        'Lideré migración de monolito a microservicios, reduciendo latencia en 40%',
        'Mentoría a 3 ingenieros junior en prácticas de backend y arquitectura',
      ],
    },
    {
      position: 'Full-Stack Developer',
      company: 'Freelance',
      location: 'Remote',
      startDate: '2021-03',
      endDate: '2022-12',
      bullets: [
        'Desarrollé 8 aplicaciones web para clientes de sectores variados',
        'Stack principal: React, Node.js, PostgreSQL, Railway',
      ],
    },
  ],
  education: [
    { degree: 'Ingeniería en Sistemas', institution: 'UTN Buenos Aires', year: '2021' },
  ],
  skills: ['Node.js', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'AWS', 'Redis'],
  softSkills: ['Liderazgo', 'Comunicación', 'Pensamiento crítico', 'Trabajo en equipo'],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Avanzado' },
  ],
  certifications: [
    { name: 'AWS Certified Developer', issuer: 'Amazon', year: '2024' },
    { name: 'MongoDB Professional', issuer: 'MongoDB Inc', year: '2023' },
  ],
  projects: [
    { name: 'FABRICULUMM', url: 'fabriculumm.com', description: 'Generador de CVs optimizados para ATS con 5 templates profesionales.' },
    { name: 'STN Logistics', url: 'stn-logistics-web.up.railway.app', description: 'Sistema logístico completo con gestión de envíos, rutas y usuarios.' },
  ],
  complementary: [
    { name: 'Curso de Arquitectura de Software', institution: 'Coursera', year: '2023' },
  ],
  references: [
    { name: 'Juan Pérez', position: 'CTO', company: 'STN Logistics', contact: 'juan@stn.com' },
  ],
  interests: ['Open Source', 'Fotografía', 'Running'],
  social: [
    { platform: 'GitHub', handle: '@santinocerezo' },
    { platform: 'LinkedIn', handle: '@santiago-cerezo' },
  ],
};

async function testTemplate(template, lang = 'es') {
  const res = await fetch('http://localhost:3099/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ template, data: sampleData, lang }),
  });
  if (!res.ok) {
    console.log(`❌ ${template} (${lang}): HTTP ${res.status}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(__dirname, 'test-output', `${template}-${lang}.pdf`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log(`✅ ${template} (${lang}): ${(buf.length / 1024).toFixed(1)} KB → ${out}`);
  return true;
}

(async () => {
  const templates = ['recommended', 'moderno', 'minimalista', 'creativo', 'ejecutivo'];
  let failed = 0;
  for (const tmpl of templates) {
    for (const lang of ['es', 'en']) {
      const ok = await testTemplate(tmpl, lang);
      if (!ok) failed++;
    }
  }
  console.log(`\n${failed === 0 ? '✅ All 10 PDFs generated OK' : `❌ ${failed} failed`}`);
  process.exit(failed === 0 ? 0 : 1);
})();
