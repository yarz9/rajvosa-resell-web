import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { dictionary, SUPPORTED } from './dictionary'

const Ctx = createContext({ lang: 'en', setLang: () => {}, t: (k) => k })
const STORAGE_KEY = 'rajvosa_lang'

function detectBrowser() {
  if (typeof navigator === 'undefined') return null
  const langs = navigator.languages || [navigator.language || '']
  for (const l of langs.map(s => (s || '').toLowerCase())) {
    if (l.startsWith('bs') || l.startsWith('hr') || l.startsWith('sr')) return 'bcs'
    if (l.startsWith('en')) return 'en'
  }
  return null
}

function readInitial() {
  if (typeof window === 'undefined') return 'en'
  try {
    const url = new URLSearchParams(window.location.search).get('lang')
    if (url && SUPPORTED.includes(url)) return url
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.includes(stored)) return stored
  } catch {}
  return detectBrowser() || 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitial)
  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return
    setLangState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch {}
  }, [])
  useEffect(() => {
    try { document.documentElement.lang = lang === 'bcs' ? 'bs' : 'en' } catch {}
  }, [lang])
  const t = useMemo(() => (key, fallback) => {
    const entry = dictionary[key]
    if (entry && entry[lang]) return entry[lang]
    if (entry && entry.en) return entry.en
    return fallback !== undefined ? fallback : key
  }, [lang])
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useI18n() { return useContext(Ctx) }
export const useT = () => useContext(Ctx).t
