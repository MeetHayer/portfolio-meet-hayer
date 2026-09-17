import { Link, NavLink } from 'react-router-dom'
import LightSwitchToggle from './LightSwitchToggle'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { withBase } from '@/lib/assets'
import data from '@/data/personal.json'

const links = [
  { to: '/about', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const resumeHref = withBase(data.resumeUrl)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 dark:bg-[#14110e]/90 dark:border-white/10 backdrop-blur-md">
      <div className="container h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-lg md:text-xl tracking-tight text-ink dark:text-paper"
        >
          Manmeet Singh Hayer
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="masthead-link">
              {link.label}
            </NavLink>
          ))}
          <a href={resumeHref} className="masthead-link" download>
            Resume
          </a>
          <LightSwitchToggle />
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <LightSwitchToggle />
          <button
            className="p-2"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 dark:border-white/10 bg-paper dark:bg-[#14110e]">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="py-2 text-base"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <a href={resumeHref} className="py-2 text-base" download onClick={() => setOpen(false)}>
              Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
