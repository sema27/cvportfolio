import type { PortfolioData } from '../types/portfolio'

const SHARE_PARAM = 'data'

function isPortfolioData(value: unknown): value is PortfolioData {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.personal === 'object' &&
    typeof candidate.about === 'object' &&
    Array.isArray(candidate.skillCategories) &&
    Array.isArray(candidate.projects) &&
    Array.isArray(candidate.experience)
  )
}

function encodeBase64Utf8(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

function decodeBase64Utf8(text: string): string {
  return decodeURIComponent(escape(atob(text)))
}

export function createShareUrl(data: PortfolioData): string {
  const encoded = encodeBase64Utf8(JSON.stringify(data))
  const url = new URL('/portfolio/view', window.location.origin)
  url.searchParams.set(SHARE_PARAM, encoded)
  return url.toString()
}

export function parsePortfolioFromShareUrl(search: string): PortfolioData | null {
  try {
    const params = new URLSearchParams(search)
    const encoded = params.get(SHARE_PARAM)
    if (!encoded) return null
    const parsed = JSON.parse(decodeBase64Utf8(encoded)) as unknown
    return isPortfolioData(parsed) ? parsed : null
  } catch (_) {
    return null
  }
}

export function downloadPortfolioJson(data: PortfolioData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const href = URL.createObjectURL(blob)

  const fullName = data.personal.fullName.trim() || 'portfolio'
  const safeBaseName = fullName
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'portfolio'

  const anchor = document.createElement('a')
  anchor.href = href
  anchor.download = `${safeBaseName}.json`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(href)
}

export async function parsePortfolioJsonFile(file: File): Promise<PortfolioData> {
  const text = await file.text()
  const parsed = JSON.parse(text) as unknown
  if (!isPortfolioData(parsed)) {
    throw new Error('Geçersiz portfolio dosyası')
  }
  return parsed
}
