import { useState } from 'react'
import { X } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'

type Project = (typeof data.projects)[number]

export default function ProjectWell() {
  const [active, setActive] = useState<Project | null>(null)
  const featured = data.projects.find((p) => 'featured' in p && p.featured) ?? data.projects[0]
  const rest = data.projects.filter((p) => p.title !== featured.title)

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(featured)}
        className="w-full text-left border border-ink/10 dark:border-white/10 p-8 md:p-12 hover:bg-muted/40 dark:hover:bg-[#1c1814] transition-colors mb-8"
      >
        <p className="section-kicker">Feature</p>
        <h2 className="font-serif text-3xl md:text-5xl max-w-3xl">{featured.title}</h2>
        <p className="mt-2 italic text-ink/60 dark:text-paper/60">{featured.tagline}</p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75 dark:text-paper/75">{featured.description}</p>
        <p className="mt-4 text-sm">{featured.stack.join(' · ')}</p>
      </button>

      <div className="grid md:grid-cols-2 gap-px bg-ink/10 dark:bg-white/10 border border-ink/10 dark:border-white/10">
        {rest.map((project) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActive(project)}
            className="bg-paper dark:bg-[#14110e] p-8 text-left hover:bg-muted/50 dark:hover:bg-[#1c1814] transition-colors"
          >
            <p className="section-kicker">{project.tagline}</p>
            <h3 className="font-serif text-2xl mb-3">{project.title}</h3>
            <p className="text-ink/70 dark:text-paper/70 leading-relaxed">{project.description}</p>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-10">
          <article className="relative w-full max-w-3xl bg-paper dark:bg-[#1c1814] border border-ink/10 dark:border-white/10 p-8 md:p-12 my-8">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 p-2"
            >
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
