# ✦ Mystika — Guía de publicación

## Requisitos previos
- Cuenta en [GitHub](https://github.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- API Key de [Anthropic](https://console.anthropic.com) (de pago, ~5-20€/mes)

---

## Paso 1 — Subir el código a GitHub

1. Ve a github.com → New repository
2. Nombre: `mystika` → Create repository
3. En tu ordenador, abre una terminal en la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "Primera versión de Mystika"
git remote add origin https://github.com/TU_USUARIO/mystika.git
git push -u origin main
```

---

## Paso 2 — Desplegar en Vercel

1. Ve a vercel.com → Add New Project
2. Importa el repositorio `mystika` de tu GitHub
3. Framework: selecciona **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Pulsa **Deploy**

En 2-3 minutos la app estará online en una URL tipo `mystika.vercel.app`.

---

## Paso 3 — Añadir la API Key de Anthropic

**¡IMPORTANTE! Nunca pongas la API key directamente en el código.**

1. Ve a console.anthropic.com → API Keys → Create Key
2. Copia la key (empieza por `sk-ant-...`)
3. En Vercel → tu proyecto → Settings → Environment Variables
4. Añade:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-XXXXXXXXXX` (tu key)
5. Redeploy el proyecto

---

## Paso 4 — Dominio propio (opcional)

1. Compra un dominio en Namecheap, GoDaddy, etc. (~10-15€/año)
2. En Vercel → tu proyecto → Settings → Domains
3. Añade tu dominio y sigue las instrucciones de DNS

---

## Paso 5 — PWA (instalable en móvil)

La app ya está configurada como PWA. Cuando esté en producción, los usuarios podrán:
- En Android: "Añadir a pantalla de inicio" desde Chrome
- En iOS: "Añadir a pantalla de inicio" desde Safari

Para publicar en **Google Play Store**:
1. Paga los 25€ de registro en play.google.com/console
2. Usa la herramienta [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) para convertir la PWA en APK
3. Sube el APK y rellena los datos de la app

Para publicar en **App Store (iOS)**:
1. Paga los 99€/año en developer.apple.com
2. Necesitarás un Mac con Xcode para empaquetar la app

---

## Variables de entorno necesarias

| Variable | Dónde conseguirla |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com (cuando integres pagos) |

---

## Estructura del proyecto

```
mystika/
├── api/
│   └── chat.js          ← Función serverless (protege la API key)
├── public/
│   ├── manifest.json    ← Config PWA
│   └── favicon.svg      ← Icono
├── src/
│   ├── main.jsx         ← Entrada React
│   └── App.jsx          ← App completa
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```
