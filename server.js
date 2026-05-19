// Tiny production server for the Rajvosa Resell concept preview.
// Serves the Vite build output (dist/) and exposes /health for
// Railway's deployment probe. SPA fallback so client-side routes
// (/shop, /custom, /product/:slug, etc.) all resolve to index.html.

import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.set('trust proxy', 1)
app.use(compression())

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'rajvosa-resell-web', ts: new Date().toISOString() })
})

const distPath = path.join(__dirname, 'dist')
if (!fs.existsSync(distPath)) {
  console.error('[boot] dist/ not found. Did `npm run build` complete?')
}

app.use(express.static(distPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
  },
}))

// SPA fallback — every unmatched route serves index.html so React Router
// can handle client-side navigation.
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Rajvosa Resell preview · listening on :${PORT}`)
})
