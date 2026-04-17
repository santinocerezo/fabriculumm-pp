# FABRICULUMM — Plan de desarrollo

## Contexto
App generadora de CVs profesionales. El usuario llena un formulario, elige un template y descarga su CV en PDF.
Sin registro. Interfaz en español por defecto, configurable en inglés.
Modelo de negocio: tráfico orgánico + ads en los costados.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- PDF: Puppeteer (renderiza HTML → PDF)
- i18n: i18next (ES/EN)
- Deploy: Railway

## Estructura de carpetas objetivo
```
fabriculumm/
├── packages/
│   ├── frontend/        # React + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── Landing.jsx
│   │   │   │   ├── TemplateSelector.jsx
│   │   │   │   ├── FormPage.jsx
│   │   │   │   └── PreviewPage.jsx
│   │   │   ├── templates/       # 5 templates de CV como componentes React
│   │   │   │   ├── Recommended.jsx
│   │   │   │   ├── Moderno.jsx
│   │   │   │   ├── Minimalista.jsx
│   │   │   │   ├── Creativo.jsx
│   │   │   │   └── Ejecutivo.jsx
│   │   │   ├── i18n/
│   │   │   │   ├── es.json
│   │   │   │   └── en.json
│   │   │   └── App.jsx
│   └── backend/         # Node.js + Express
│       ├── src/
│       │   ├── index.js
│       │   └── pdf.js   # Puppeteer PDF generation
│       └── package.json
├── package.json         # npm workspaces
└── PLAN.md
```

## Templates y sus secciones

### RECOMMENDED (ATS-optimizado)
- Datos personales (nombre, email, teléfono, LinkedIn, ubicación)
- Resumen profesional (3-5 líneas con keywords)
- Experiencia laboral (empresa, cargo, fechas, bullets de logros)
- Educación (institución, título, año)
- Habilidades técnicas
- Habilidades blandas
- Idiomas
- Certificaciones
- Proyectos destacados

### MODERNO
- Datos personales + foto
- Resumen profesional
- Experiencia laboral
- Educación
- Habilidades (con nivel visual)
- Idiomas
- Intereses

### MINIMALISTA
- Datos personales
- Resumen
- Experiencia laboral
- Educación
- Habilidades
- Idiomas

### CREATIVO
- Datos personales + foto
- Sobre mí
- Experiencia laboral
- Educación
- Habilidades (con nivel visual)
- Idiomas
- Proyectos / Portfolio
- Redes sociales

### EJECUTIVO
- Datos personales
- Perfil ejecutivo
- Experiencia laboral (énfasis en logros cuantificables)
- Educación
- Formación complementaria
- Idiomas
- Referencias profesionales

---

## Tareas

### FASE 1 — Setup del proyecto
- [x] 1.1 Inicializar monorepo con npm workspaces (`package.json` raíz)
- [x] 1.2 Crear `packages/frontend` con Vite + React + Tailwind
- [x] 1.3 Crear `packages/backend` con Express + Puppeteer
- [x] 1.4 Configurar scripts de build/start en `package.json` raíz
- [x] 1.5 Crear `railway.toml` para deploy

### FASE 2 — i18n
- [x] 2.1 Instalar y configurar i18next en el frontend
- [x] 2.2 Crear `es.json` con todas las traducciones (UI + labels de formulario)
- [x] 2.3 Crear `en.json` con todas las traducciones
- [x] 2.4 Crear componente `LanguageToggle` en Navbar (ES/EN switch)

### FASE 3 — Landing page
- [x] 3.1 Hero section: "Bienvenido a la fábrica del mejor CV de tu vida"
- [x] 3.2 Sección "Por qué pasa los filtros ATS" (explicación detallada)
- [x] 3.3 Sección "¿Cuál template te conviene?" (guía según tipo de postulación)
- [x] 3.4 Sección comparativa de los 5 templates con preview visual
- [x] 3.5 CTA principal → ir al selector de template
- [x] 3.6 Diseño responsive + ads placeholder en los costados

### FASE 4 — Selector de template
- [x] 4.1 Cards para los 5 templates con nombre, descripción y preview thumbnail
- [x] 4.2 Badge "RECOMENDADO" destacado en el template RECOMMENDED
- [x] 4.3 Lógica de selección → navega al formulario con el template elegido

### FASE 5 — Formulario dinámico
- [x] 5.1 Componente base del formulario con secciones
- [x] 5.2 Secciones del formulario para RECOMMENDED
- [x] 5.3 Secciones del formulario para MODERNO
- [x] 5.4 Secciones del formulario para MINIMALISTA
- [x] 5.5 Secciones del formulario para CREATIVO
- [x] 5.6 Secciones del formulario para EJECUTIVO
- [x] 5.7 Campos dinámicos: agregar/eliminar entradas (múltiples trabajos, educaciones, etc.)
- [ ] 5.8 Preview en vivo del CV mientras se completa el formulario
- [x] 5.9 Validación de campos requeridos (nombre)

### FASE 6 — Templates de CV (HTML para Puppeteer)
- [x] 6.1 Template RECOMMENDED — diseño ATS puro, una columna, sin imágenes
- [x] 6.2 Template MODERNO — sidebar de color + contenido principal
- [x] 6.3 Template MINIMALISTA — tipografía limpia, máximo espacio en blanco
- [x] 6.4 Template CREATIVO — dos columnas, íconos, acento de color
- [x] 6.5 Template EJECUTIVO — encabezado grande, jerarquía clara

### FASE 7 — Generación de PDF
- [x] 7.1 Endpoint `POST /api/generate-pdf` en el backend
- [x] 7.2 Recibe datos del CV + template elegido
- [x] 7.3 Renderiza el template HTML con Puppeteer
- [x] 7.4 Devuelve el PDF como descarga
- [x] 7.5 Manejo de errores

### FASE 8 — Polish y detalles finales
- [ ] 8.1 Favicon y meta tags (SEO) — crear public/index.html con title/meta
- [ ] 8.2 Verificar ads placeholders en Landing (ya presentes, revisar visualmente)
- [ ] 8.3 Animaciones suaves (ya hay hover effects, agregar page transitions)
- [ ] 8.4 Loading state PDF (ya implementado en botón)
- [ ] 8.5 Mensaje de éxito post-descarga con opción de volver a editar
- [ ] 8.6 Responsive mobile: revisar Navbar en mobile (hamburger menu)
- [x] 8.7 Test de generación PDF con datos reales para los 5 templates (10 PDFs OK — ver test-output/)

### FASE 9 — Deploy
- [ ] 9.1 Configurar package.json scripts para Railway (build:backend usa cp que falla en Windows → usar node script)
- [ ] 9.2 Build de producción frontend verificado
- [ ] 9.3 Deploy en Railway
- [ ] 9.4 Smoke test en producción

---

## Instrucciones para retomar la sesión
1. Leer este archivo completo
2. Identificar la primera tarea con `- [ ]` (sin completar)
3. Continuar desde ahí sin rehacer lo ya completado
4. Al terminar cada tarea, marcar como `- [x]`
5. Al final de cada sesión, actualizar este archivo con el progreso
