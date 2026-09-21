import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'
import CoursesBelt from '@/components/CoursesBelt'

export default function Home() {
  const resumeHref = withBase(data.resumeUrl)
  const features = [
    {
      kicker: 'Now',
      title: `${data.workExperience[0].title}, ${data.workExperience[0].company}`,
      dek: data.workExperience[0].description,
      to: '/about',
    },
    {
      kicker: 'Build',
      title: 'Finvestor',
      dek: 'A FastAPI + React studio for live prices, portfolio math, and risk views.',
      to: '/projects',
    },
    {
      kicker: 'Research',
      title: 'GE Vernova equity report',
      dek: 'DCF, SOTP, and a BUY call written for an institutional student fund.',
      to: '/writing',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${withBase('/swiss-alps-lake.jpg')}')`,
            backgroundPosition: 'center 35%',
          }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/15" />

        <div className="relative z-10 container min-h-[88vh] flex flex-col justify-end pb-16 pt-24 md:justify-center">
          <p className="section-kicker text-paper/70">Indianapolis · Finance & CS · May 2026</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-paper max-w-3xl leading-[1.05]">
            {data.name}
          </h1>
          <p className="mt-6 max-w-xl text-paper/85 text-lg leading-relaxed">
            {data.lede}
          </p>
          <p className="mt-4 font-serif italic text-paper/70">
            YOGOWYPI: You Only Get Out, What You Put In
          </p>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-paper/75">
            {data.credentials.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/about" className="btn btn-primary">
              View work
            </Link>
            <a href={resumeHref} download className="btn border-paper/40 text-paper hover:bg-paper hover:text-ink">
              Download resume
            </a>
            <Link to="/contact" className="btn border-paper/40 text-paper hover:bg-paper hover:text-ink">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <p className="section-kicker">In this issue</p>
          <h2 className="section-title">A small Glimpse</h2>
          <div className="grid md:grid-cols-3 gap-px bg-ink/10 dark:bg-white/10 border border-ink/10 dark:border-white/10">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.to}
                className="bg-paper dark:bg-[#14110e] p-8 hover:bg-muted/60 dark:hover:bg-[#1c1814] transition-colors"
              >
                <p className="section-kicker">{feature.kicker}</p>
                <h3 className="font-serif text-2xl mb-3">{feature.title}</h3>
                <p className="text-ink/70 dark:text-paper/70 leading-relaxed">{feature.dek}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <p className="section-kicker">Curriculum</p>
          <h2 className="section-title">Coursework</h2>
          <CoursesBelt />
        </div>
      </section>
    </div>
  )
}
