import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const SHINE_RADIUS = 150
const SHINE_SELECTORS = 'main h1, main h2, main h3, main p, main li, main a, main button, main .btn, main .project-screen, main .project-wheel path'

export default function CursorAura() {
  const location = useLocation()
  const orbRef = useRef<HTMLDivElement>(null)
  const litRef = useRef<Set<Element>>(new Set())

  useEffect(() => {
    for (const el of litRef.current) el.classList.remove('aura-lit')
    litRef.current.clear()
  }, [location.pathname])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const orb = orbRef.current
    if (!orb) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf = 0
    let frame = 0

    const clearLit = () => {
      for (const el of litRef.current) el.classList.remove('aura-lit')
      litRef.current.clear()
    }

    const updateLit = () => {
      clearLit()
      const nodes = document.querySelectorAll(SHINE_SELECTORS)
      for (const el of nodes) {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(cx - x, cy - y)
        if (dist < SHINE_RADIUS + Math.max(rect.width, rect.height) * 0.25) {
          el.classList.add('aura-lit')
          litRef.current.add(el)
        }
      }
    }

    const onMove = (event: PointerEvent) => {
      tx = event.clientX
      ty = event.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      orb.style.transform = `translate3d(${x}px, ${y}px, 0)`
      document.documentElement.style.setProperty('--aura-x', `${x}px`)
      document.documentElement.style.setProperty('--aura-y', `${y}px`)
      frame += 1
      if (frame % 2 === 0) updateLit()
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(raf)
      clearLit()
    }
  }, [])

  return (
    <div className="cursor-aura" aria-hidden="true">
      <div ref={orbRef} className="cursor-aura-orb">
        <span className="cursor-aura-soft" />
        <span className="cursor-aura-core" />
      </div>
    </div>
  )
}
