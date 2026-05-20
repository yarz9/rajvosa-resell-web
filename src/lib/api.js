// Single client for the Cloz Digital portal API.
//
// The backend that powers this storefront lives on a different origin
// (cloz-digital, Railway). Set the URL via Vite env at build/dev time:
//
//   VITE_API_URL=https://cloz-digital.up.railway.app
//
// When the env var is unset (local dev without a backend, or first
// preview deploy) every call falls through gracefully — Shop falls
// back to the bundled product seed in /data/products.js, and the
// form endpoints surface a clear "API unreachable" message.

const RAW_BASE = import.meta.env.VITE_API_URL || ''
const BASE = RAW_BASE.replace(/\/$/, '')

export const apiConfigured = !!BASE

async function call(path, init = {}) {
  if (!apiConfigured) {
    const err = new Error('API not configured')
    err.code = 'no_api'
    throw err
  }
  const url = `${BASE}${path}`
  const resp = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  let data = null
  try { data = await resp.json() } catch {}
  if (!resp.ok) {
    const err = new Error(data?.error || `Request failed (${resp.status})`)
    err.status = resp.status
    err.data = data
    throw err
  }
  return data
}

// ─── Public storefront calls ────────────────────────────────

export const api = {
  listProducts:    () =>                  call('/api/resell/public/products'),
  getProduct:      (slug) =>              call(`/api/resell/public/products/${encodeURIComponent(slug)}`),
  submitCustom:    (payload) =>           call('/api/resell/public/custom-orders', { method: 'POST', body: JSON.stringify(payload) }),
  submitReserve:   (payload) =>           call('/api/resell/public/reservations',  { method: 'POST', body: JSON.stringify(payload) }),
}
