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
- [ ] 1.1 Inicializar monorepo con npm workspaces (`package.json` raíz)
- [ ] 1.2 Crear `packages/frontend` con Vite + React + Tailwind
- [ ] 1.3 Crear `packages/backend` con Express + Puppeteer
- [ ] 1.4 Configurar scripts de build/start en `package.json` raíz
- [ ] 1.5 Crear `railway.toml` para deploy

### FASE 2 — i18n
- [ ] 2.1 Instalar y configurar i18next en el frontend
- [ ] 2.2 Crear `es.json` con todas las traducciones (UI + labels de formulario)
- [ ] 2.3 Crear `en.json` con todas las traducciones
- [ ] 2.4 Crear componente `LanguageToggle` (ES/EN switch)

### FASE 3 — Landing page
- [ ] 3.1 Hero section: "Bienvenido a la fábrica del mejor CV de tu vida"
- [ ] 3.2 Sección "Por qué pasa los filtros ATS" (explicación detallada)
- [ ] 3.3 Sección "¿Cuál template te conviene?" (guía según tipo de postulación)
- [ ] 3.4 Sección comparativa de los 5 templates con preview visual
- [ ] 3.5 CTA principal → ir al selector de template
- [ ] 3.6 Diseño responsive + ads placeholder en los costados

### FASE 4 — Selector de template
- [ ] 4.1 Cards para los 5 templates con nombre, descripción y preview thumbnail
- [ ] 4.2 Badge "RECOMENDADO" destacado en el template RECOMMENDED
- [ ] 4.3 Lógica de selección → navega al formulario con el template elegido

### FASE 5 — Formulario dinámico
- [ ] 5.1 Componente base del formulario con secciones colapsables
- [ ] 5.2 Secciones del formulario para RECOMMENDED
- [ ] 5.3 Secciones del formulario para MODERNO
- [ ] 5.4 Secciones del formulario para MINIMALISTA
- [ ] 5.5 Secciones del formulario para CREATIVO
- [ ] 5.6 Secciones del formulario para EJECUTIVO
- [ ] 5.7 Campos dinámicos: agregar/eliminar entradas (ej: múltiples trabajos)
- [ ] 5.8 Preview en vivo del CV mientras se completa el formulario
- [ ] 5.9 Validación de campos requeridos

### FASE 6 — Templates de CV (componentes React para PDF)
- [ ] 6.1 Template RECOMMENDED — diseño ATS puro, una columna, sin imágenes
- [ ] 6.2 Template MODERNO — sidebar de color + contenido principal
- [ ] 6.3 Template MINIMALISTA — tipografía limpia, máximo espacio en blanco
- [ ] 6.4 Template CREATIVO — dos columnas, íconos, acento de color
- [ ] 6.5 Template EJECUTIVO — encabezado grande, jerarquía clara

### FASE 7 — Generación de PDF
- [ ] 7.1 Endpoint `POST /api/generate-pdf` en el backend
- [ ] 7.2 Recibe datos del CV + template elegido
- [ ] 7.3 Renderiza el template HTML con Puppeteer
- [ ] 7.4 Devuelve el PDF como descarga
- [ ] 7.5 Manejo de errores y timeout

### FASE 8 — Polish y detalles finales
- [ ] 8.1 Favicon y meta tags (SEO)
- [ ] 8.2 Placeholders de ads en costados (Google AdSense ready)
- [ ] 8.3 Animaciones y transiciones suaves entre páginas
- [ ] 8.4 Loading state mientras se genera el PDF
- [ ] 8.5 Mensaje de éxito post-descarga con opción de volver a editar
- [ ] 8.6 Responsive mobile completo
- [ ] 8.7 Test de generación PDF con datos reales para los 5 templates

### FASE 9 — Deploy
- [ ] 9.1 Configurar variables de entorno
- [ ] 9.2 Build de producción frontend
- [ ] 9.3 Deploy en Railway
- [ ] 9.4 Smoke test en producción

---

## Instrucciones para retomar la sesión
1. Leer este archivo completo
2. Identificar la primera tarea con `- [ ]` (sin completar)
3. Continuar desde ahí sin rehacer lo ya completado
4. Al terminar cada tarea, marcar como `- [x]`
5. Al final de cada sesión, actualizar este archivo con el progreso
