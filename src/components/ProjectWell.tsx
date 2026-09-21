import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'

type Project = (typeof data.projects)[number]

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
        await new Promise((r) => setTimeout(r, 1600))
        if (cancelled || hoverRef.current !== null) continue
        setIndex((prev) => (prev + 1) % count)
        await new Promise((r) => setTimeout(r, 1100))
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
      <button
        type="button"
        onClick={() => setActive(shown)}
        className="project-screen w-full text-left mb-10 p-8 md:p-12"
      >
        <p className="section-kicker">Display</p>
        <h2 className="font-serif text-3xl md:text-5xl max-w-3xl">{shown.title}</h2>
        <p className="mt-2 italic text-ink/60 dark:text-paper/60">{shown.tagline}</p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 dark:text-paper/75">{shown.description}</p>
        <p className="mt-4 text-sm">{shown.stack.join(' · ')}</p>
      </button>

      <div className="flex flex-col items-center">
        <p className="section-kicker mb-6">Roll</p>
        <div className="relative w-[min(100%,28rem)] aspect-square">
          <div
            className="project-wheel absolute inset-[12%] rounded-full border-2 border-ink/15 dark:border-white/15"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          {projects.map((project, i) => {
            const angle = i * step
            const lit = (hoverIndex ?? index) === i
            return (
              <button
                key={project.title}
                type="button"
                className={`project-segment absolute left-1/2 top-1/2 w-36 -ml-[4.5rem] -mt-8 text-center px-3 py-2 text-sm leading-tight transition-colors duration-200 ${
                  lit ? 'bg-forest-500 text-paper' : 'bg-paper dark:bg-[#1c1814] border border-ink/15 dark:border-white/15'
                }`}
                style={{
                  transform: `rotate(${angle + rotation}deg) translateY(-10.5rem) rotate(${-(angle + rotation)}deg)`,
                }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setActive(project)}
              >
                {project.tagline || project.title}
              </button>
            )
          })}
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
