import Section from '@/components/Section'
import { motion } from 'framer-motion'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'

export default function About() {
  return (
    <div>
      <section className="border-b border-ink/10 dark:border-white/10">
        <div className="container py-12 md:py-16 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
          <div>
            <p className="section-kicker">About</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Who I am</h1>
            <div className="space-y-5 text-[17px] leading-relaxed text-ink/80 dark:text-paper/80 max-w-2xl">
              <p>
                I grew up in a semi-urban town in Punjab, India, and came to DePauw University on a <strong>full cost scholarship</strong>.
                Numbers were always my language; college opened finance—a field I never had access to at home.
              </p>
              <p>
                I like problems where finance meets software: visualization, automation, planning, and investment analysis.
                I now live in Indianapolis as a Finance &amp; CS graduate (May 2026).
              </p>
              <p>
                Outside work I train, sing, play chess, hike, and read business and politics.
              </p>
            </div>
          </div>
          <figure>
            <img
              src={withBase('/Dreamwave-Photo 2.png')}
              alt="Manmeet Singh Hayer"
              className="w-full max-w-md object-cover object-top aspect-[4/5] grayscale-[20%]"
            />
            <figcaption className="mt-3 text-sm text-ink/50 dark:text-paper/50">
              {data.location} · {data.education.degree}
            </figcaption>
          </figure>
        </div>
      </section>

      <Section id="education">
        <p className="section-kicker">Education</p>
        <h2 className="section-title">DePauw University</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif text-2xl">{data.education.degree}</h3>
            <p className="mt-1 text-ink/70 dark:text-paper/70">Graduated {data.education.graduation} · GPA {data.education.gpa}</p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] mb-2">Awards</p>
              <p>{data.education.awards.join(' · ')}</p>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] mb-2">Credentials</p>
              <ul className="space-y-1">
                {data.education.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="space-y-4">
            {data.education.academicExcellence.map((item) => (
              <li key={item} className="border-l border-forest-500 pl-4 text-ink/80 dark:text-paper/80 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="experience">
        <p className="section-kicker">Work</p>
        <h2 className="section-title">Experience</h2>
        <p className="max-w-3xl mb-10 text-ink/75 dark:text-paper/75 leading-relaxed">{data.bio}</p>
        <ol className="space-y-10">
          {data.workExperience.map((exp) => (
            <li key={`${exp.company}-${exp.title}`} className="grid md:grid-cols-[180px_1fr] gap-4 border-t border-ink/10 dark:border-white/10 pt-8">
              <p className="text-sm text-ink/50 dark:text-paper/50">{exp.period}</p>
              <div>
                <h3 className="font-serif text-2xl">{exp.title}</h3>
                <p className="text-forest-600 dark:text-forest-300 mt-1">
                  {exp.company} · {exp.location}
                </p>
                <p className="mt-3 text-ink/75 dark:text-paper/75">{exp.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {exp.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="leadership">
        <p className="section-kicker">Campus</p>
        <h2 className="section-title">Leadership</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.leadership.map((role) => (
            <article key={role.title} className="border border-ink/10 dark:border-white/10 p-6">
              <p className="text-sm text-ink/50 dark:text-paper/50">{role.period}</p>
              <h3 className="font-serif text-2xl mt-2">{role.title}</h3>
              <p className="text-forest-600 dark:text-forest-300 mt-1">{role.company}</p>
              <p className="mt-3 leading-relaxed text-ink/75 dark:text-paper/75">{role.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="volunteer">
        <p className="section-kicker">Service</p>
        <h2 className="section-title">Volunteer briefs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.volunteerExperience.map((volunteer, index) => (
            <motion.article
              key={volunteer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="border border-ink/10 dark:border-white/10 p-5"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-forest-500">{volunteer.period}</p>
              <h3 className="font-serif text-xl mt-3">{volunteer.title}</h3>
              <p className="mt-1 text-sm">{volunteer.company}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 dark:text-paper/70">{volunteer.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="skills">
        <p className="section-kicker">Toolkit</p>
        <h2 className="section-title">Skills</h2>
        <div className="grid md:grid-cols-2 gap-10 text-[15px]">
          <div>
            <h3 className="font-serif text-xl mb-3">Programming</h3>
            <p className="leading-relaxed">{data.skills.programming.join(' · ')}</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3">Software</h3>
            <p className="leading-relaxed">{data.skills.software.join(' · ')}</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3">Finance</h3>
            <p className="leading-relaxed">{data.skills.finance.join(' · ')}</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3">Languages</h3>
            <p className="leading-relaxed">{data.skills.languages.join(' · ')}</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
