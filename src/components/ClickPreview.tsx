import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

const DURATION_MS = 3500
const SELECTOR = 'a[href], button, [role="button"], .cursor-pointer'

type Box = { top: number; left: number; width: number; height: number }

function isPageOrSectionHead(el: HTMLElement) {
  return Boolean(
    el.closest('header, footer, [data-preview-skip]') ||
      el.closest('.masthead-link, .section-title, .section-kicker') ||
      el.matches('h1, h2, h3, h4, h5, h6, .section-title, .section-kicker, .masthead-link'),
  )
}

function collectTargets() {
  return Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => {
    if (el.closest('.click-preview-root')) return false
    if (isPageOrSectionHead(el)) return false
    if (el.querySelector(SELECTOR)) return false
    const style = window.getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    const rect = el.getBoundingClientRect()
    return rect.width >= 2 && rect.height >= 2
  })
}

function boxesFrom(els: HTMLElement[]): Box[] {
  return els.map((el) => {
    const r = el.getBoundingClientRect()
    return { top: r.top, left: r.left, width: r.width, height: r.height }
  })
}

function shouldAutoAct(el: HTMLElement) {
  if (isPageOrSectionHead(el)) return false
  if (el.closest('form')) return false
  if (el.hasAttribute('download')) return false
  const href = el.getAttribute('href') || el.closest('a')?.getAttribute('href') || ''
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  if (el.getAttribute('target') === '_blank' || el.closest('a')?.getAttribute('target') === '_blank') return false
  if (href && !href.startsWith('#')) return false
  const label = (el.getAttribute('aria-label') || '').toLowerCase()
  if (/close|menu|light|dark|switch to|back to top/.test(label)) return false
  if (el.closest('.project-wheel')) return false
  const tag = el.tagName
  return tag === 'BUTTON' || el.getAttribute('role') === 'button' || tag === 'PATH'
}

export default function ClickPreview() {
  const location = useLocation()
  const [boxes, setBoxes] = useState<Box[]>([])

  useEffect(() => {
    let cancelled = false
    let targets: HTMLElement[] = []

    const measure = () => {
      if (cancelled) return
      targets = collectTargets()
      setBoxes(boxesFrom(targets))
    }

    const kick = window.requestAnimationFrame(measure)
    const start = window.setTimeout(measure, 50)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    const finish = window.setTimeout(() => {
      if (cancelled) return
      targets = collectTargets()
      for (const el of targets) {
        if (shouldAutoAct(el)) el.click()
      }
      setBoxes([])
    }, DURATION_MS)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(kick)
      window.clearTimeout(start)
      window.clearTimeout(finish)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [location.pathname])

  if (!boxes.length) return null

  return createPortal(
    <div className="click-preview-root" aria-hidden="true">
      {boxes.map((box, i) => (
        <span
          key={`${box.left}-${box.top}-${i}`}
          className="click-preview-shade"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            animationDelay: `${(i % 5) * 80}ms`,
          }}
        />
      ))}
    </div>,
    document.body,
  )
}
