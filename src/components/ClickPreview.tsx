import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DURATION_MS = 3500
const SELECTOR = 'a[href], button, [role="button"], .cursor-pointer'
const ATTR = 'data-click-preview'
const RUN = 'click-preview-run'

function isPageOrSectionHead(el: Element) {
  return Boolean(
    el.closest('header, footer') ||
      el.closest('.masthead-link, .section-title, .section-kicker') ||
      el.matches('h1, h2, h3, h4, h5, h6, .section-title, .section-kicker, .masthead-link'),
  )
}

function collectTargets() {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => {
    if (el.hasAttribute(ATTR) || el.closest(`[${ATTR}]`)) return false
    if (isPageOrSectionHead(el)) return false
    if (el.querySelector(SELECTOR)) return false
    const style = window.getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    const rect = el.getBoundingClientRect()
    return rect.width >= 2 && rect.height >= 2
  })
}

function shouldAutoAct(el: HTMLElement) {
  if (isPageOrSectionHead(el)) return false
  if (el.closest('[data-preview-skip]')) return false
  if (el.closest('form')) return false
  if (el.hasAttribute('download')) return false
  const href = el.getAttribute('href') || el.closest('a')?.getAttribute('href') || ''
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  if (el.getAttribute('target') === '_blank' || el.closest('a')?.getAttribute('target') === '_blank') return false
  if (href && !href.startsWith('#')) return false
  const label = (el.getAttribute('aria-label') || '').toLowerCase()
  if (/close|menu|light|dark|switch to|back to top/.test(label)) return false
  const tag = el.tagName
  return tag === 'BUTTON' || el.getAttribute('role') === 'button' || tag === 'PATH'
}

export default function ClickPreview() {
  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    let targets: HTMLElement[] = []

    const start = window.setTimeout(() => {
      if (cancelled) return
      document.documentElement.classList.add(RUN)
      targets = collectTargets()
      for (const el of targets) el.setAttribute(ATTR, 'shade')
    }, 40)

    const finish = window.setTimeout(() => {
      if (cancelled) return
      for (const el of targets) el.removeAttribute(ATTR)
      document.documentElement.classList.remove(RUN)
      for (const el of targets) {
        if (shouldAutoAct(el)) el.click()
      }
    }, DURATION_MS + 40)

    return () => {
      cancelled = true
      window.clearTimeout(start)
      window.clearTimeout(finish)
      document.documentElement.classList.remove(RUN)
      for (const el of targets) el.removeAttribute(ATTR)
    }
  }, [location.pathname])

  return null
}
