import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'

type Project = (typeof data.projects)[number]

const CX = 200
const CY = 200
const R_OUTER = 186
const R_INNER = 118
const R_TEXT = 152
const GAP = 5

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

function donutSlice(a0: number, a1: number) {
  const large = a1 - a0 > 180 ? 1 : 0
  const o0 = polar(R_OUTER, a0)
  const o1 = polar(R_OUTER, a1)
  const i1 = polar(R_INNER, a1)
  const i0 = polar(R_INNER, a0)
  return `M ${o0.x} ${o0.y} A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${o1.x} ${o1.y} L ${i1.x} ${i1.y} A ${R_INNER} ${R_INNER} 0 ${large} 0 ${i0.x} ${i0.y} Z`
}

function arc(r: number, a0: number, a1: number) {
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  const sweep = a1 >= a0 ? 1 : 0
  const p0 = polar(r, a0)
  const p1 = polar(r, a1)
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} ${sweep} ${p1.x} ${p1.y}`
}

function wheelLabel(project: Project) {
  if (project.title.startsWith('Finvestor')) return 'FINVESTOR'
  if (project.title.includes('GE Vernova')) return 'GEV MODEL'
  if (project.title.includes('Actuarial')) return 'CAS 298'
  return project.title.slice(0, 18).toUpperCase()
}

export default function ProjectWell() {
  const projects = data.projects
  const count = projects.length
  const step = 360 / count
  const [index, setIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [active, setActive] = useState<Project | null>(null)
  const hoverRef = useRef<number | null>(null)

  useEffect(() => {
    hoverRef.current = hoverIndex
  }, [hoverIndex])

  useEffect(() => {
    let cancelled = false
    const loop = async () => {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 1700))
        if (cancelled || hoverRef.current !== null) continue
        if (document.documentElement.classList.contains('click-preview-run')) continue
        setIndex((prev) => (prev + 1) % count)
        await new Promise((r) => setTimeout(r, 1050))
      }
    }
    loop()
    return () => {
      cancelled = true
    }
  }, [count])

  const shown = projects[hoverIndex ?? index]
  const rotation = index * step

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        <button
          type="button"
          onClick={() => setActive(shown)}
          className="project-screen h-full min-h-[420px] text-left p-8 md:p-10 flex flex-col justify-center"
        >
          <p className="section-kicker">Display</p>
          <h2 className="font-serif text-3xl md:text-4xl">{shown.title}</h2>
          <p className="mt-2 italic opacity-80">{shown.tagline}</p>
          <p className="mt-5 text-base md:text-lg leading-relaxed opacity-90">{shown.description}</p>
          <p className="mt-4 text-sm opacity-70">{shown.stack.join(' · ')}</p>
        </button>

        <div className="flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-[28rem] project-wheel" aria-label="Project wheel">
            <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '200px 200px' }}>
              {projects.map((project, i) => {
                const a0 = -90 + i * step + GAP / 2
                const a1 = -90 + (i + 1) * step - GAP / 2
                const mid = (a0 + a1) / 2
                const flipped = ((mid % 360) + 360) % 360 > 0 && ((mid % 360) + 360) % 360 < 180
                const textD = flipped ? arc(R_TEXT, a1 - 1, a0 + 1) : arc(R_TEXT, a0 + 1, a1 - 1)
                const lit = (hoverIndex ?? index) === i
                const pathId = `wheel-arc-${i}`
                return (
                  <g key={project.title}>
                    <path
                      d={donutSlice(a0, a1)}
                      fill={lit ? '#10b981' : '#1c211c'}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onClick={() => setActive(project)}
                    />
                    <path id={pathId} d={textD} fill="none" />
                    <text className="pointer-events-none" fill={lit ? '#ecfdf5' : '#d1fae5'} fontSize="13" fontWeight="600" letterSpacing="0.18em">
                      <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                        {wheelLabel(project)}
                      </textPath>
                    </text>
                  </g>
                )
              })}
            </g>
            <circle cx={CX} cy={CY} r={R_INNER - 6} fill="none" stroke="#10b981" strokeOpacity="0.25" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-10">
          <article className="relative w-full max-w-3xl bg-paper dark:bg-[#1c1814] border border-ink/10 dark:border-white/10 p-8 md:p-12 my-8">
            <button type="button" aria-label="Close" onClick={() => setActive(null)} className="absolute top-4 right-4 p-2">
              <X size={18} />
            </button>
            <p className="section-kicker">{active.tagline}</p>
            <h2 className="font-serif text-3xl md:text-4xl pr-10">{active.title}</h2>
            <p className="mt-4 text-lg leading-relaxed">{active.description}</p>
            {'downloads' in active && active.downloads && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {active.downloads.map((file) => (
                  <a key={file.href} href={withBase(file.href)} download className="btn btn-primary">
                    {file.label}
                  </a>
                ))}
              </div>
            )}
            {active.demoUrl && (
              <a href={withBase(active.demoUrl)} className="btn mt-4 inline-flex" target="_blank" rel="noreferrer">
                Open artifact
              </a>
            )}
            <h3 className="font-serif text-xl mt-8 mb-3">Notes</h3>
            <ul className="space-y-3 leading-relaxed">
              {active.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink/50 dark:text-paper/50">{active.stack.join(' · ')}</p>
          </article>
        </div>
      )}
    </>
  )
}
