import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'
import data from '@/data/personal.json'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)

    try {
      const response = await fetch('https://formspree.io/f/xzzawzoo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSent(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSent(false), 5000)
      } else {
        setError(true)
        setTimeout(() => setError(false), 5000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Section id="contact-hero">
        <p className="section-kicker">Correspondence</p>
        <h1 className="font-serif text-4xl md:text-6xl max-w-3xl">Let&apos;s talk.</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/70 dark:text-paper/70">
          Looking for a finance and software person who can also ship? Write below.
        </p>
      </Section>

      <Section id="contact-content">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm">
              Name
              <input
                required
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 w-full px-3 py-3 bg-transparent border border-ink/20 dark:border-white/20 focus:outline-none focus:border-forest-500"
              />
            </label>
            <label className="block text-sm">
              Email
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 w-full px-3 py-3 bg-transparent border border-ink/20 dark:border-white/20 focus:outline-none focus:border-forest-500"
              />
            </label>
            <label className="block text-sm">
              Message
              <textarea
                required
                name="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-2 w-full px-3 py-3 bg-transparent border border-ink/20 dark:border-white/20 focus:outline-none focus:border-forest-500 resize-none"
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sent || isSubmitting}>
              {sent ? <><CheckCircle size={16} /> Sent</> : isSubmitting ? 'Sending…' : <><Send size={16} /> Send</>}
            </button>
            {error && (
              <p className="text-sm flex items-center gap-2">
                <AlertCircle size={16} /> Could not send. Please try again.
              </p>
            )}
          </form>

          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl mb-3">Now</h2>
              <ul className="space-y-2 text-ink/75 dark:text-paper/75">
                <li>Associate Planner, OneAdvocate Financial (Jul 2026–present)</li>
                <li>Open to full-time FP&amp;A, investment analysis, corporate finance, and fintech/analytics roles</li>
                <li>Open to remote and on-site</li>
              </ul>
            </div>
            <div className="space-y-4">
              <a href={`mailto:${data.email}`} className="flex items-center gap-3 hover:text-forest-600">
                <Mail size={18} /> {data.email}
              </a>
              <a href={`tel:${data.phone}`} className="flex items-center gap-3 hover:text-forest-600">
                <Phone size={18} /> {data.phone}
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={18} /> {data.location}
              </p>
              <a href={data.socials.LinkedIn} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-forest-600">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={data.socials.GitHub} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-forest-600">
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
