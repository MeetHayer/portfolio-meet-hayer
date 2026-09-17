import ProjectWell from '@/components/ProjectWell'

export default function Projects() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mb-10">
        <p className="section-kicker">Studio</p>
        <h1 className="font-serif text-4xl md:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-ink/70 dark:text-paper/70 leading-relaxed">
          Case studies in automation, equity research, product, and campus organizing. Open a piece for the full ledger.
        </p>
      </div>
      <div className="container">
        <ProjectWell />
      </div>
    </div>
  )
}
