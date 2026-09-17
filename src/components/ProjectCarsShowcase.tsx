/**
 * ProjectCarsShowcase.tsx
 * 
 * A self-contained React component that displays projects as roaming cars within a bounded playfield.
 * Cars move around randomly, pause on hover, and open detailed modals on click.
 * 
 * Features:
 * - Cars roam within a bounded playfield area
 * - Hover to pause individual cars
 * - Click to open project details modal
 * - Mobile responsive (lanes on small screens)
 * - Full accessibility support
 * - Respects prefers-reduced-motion
 * 
 * Usage:
 * <ProjectCarsShowcase />
 * 
 * To modify project data, update the `projects` array below.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, ExternalLink, Github, Code, Heart, BookOpen, Zap, TrendingUp, Download } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'

// Types
type Project = {
  id: string
  name: string
  tagline?: string
  summary: string
  details: {
    bullets: string[]
    skills?: string[]
    links?: { label: string; href: string }[]
    downloads?: { label: string; href: string }[]
  }
}

type CarPosition = {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
}

// Project data - loaded from personal.json
const projectIdMap: Record<string, string> = {
  "Tigers vs. Cancer (Gift of Life)": "tigers-vs-cancer",
  "VBA Automation (ABM Industries)": "vba-automation-abm",
  "Actuarial Case Study — Pickles Mutual (CAS 298 Competition, Team Lead)": "actuarial-case-study",
  "GE Vernova (NYSE: GEV) — Equity Investment Research Report": "gev-investment-report"
}

export const projects: Project[] = (data.projects || []).map((p: any) => {
  const id = projectIdMap[p.title] || p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const links: { label: string; href: string }[] = []
  
  if (p.demoUrl) {
    links.push({ label: p.title.includes("CAS Case Study") ? "Review our pricing solution" : "View Demo", href: withBase(p.demoUrl) })
  }
  
  return {
    id,
    name: p.title,
    tagline: p.tagline,
    summary: p.description,
    details: {
      bullets: p.achievements || [],
      skills: p.stack || [],
      links,
      downloads: (p.downloads || []).map((download: { label: string; href: string }) => ({
        ...download,
        href: withBase(download.href)
      }))
    }
  }
})

// Project icons and colors
const projectConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
  "tigers-vs-cancer": { icon: Heart, color: "from-violet-500 to-purple-500", bgColor: "bg-violet-50 dark:bg-slate-800" },
  "vba-automation-abm": { icon: Code, color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50 dark:bg-slate-800" },
  "actuarial-case-study": { icon: BookOpen, color: "from-slate-600 to-slate-700", bgColor: "bg-slate-50 dark:bg-slate-800" },
  "gev-investment-report": { icon: TrendingUp, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50 dark:bg-slate-800" }
}

// Hook for reduced motion preference
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Individual ProjBox Component
interface ProjBoxProps {
  project: Project
  position: CarPosition
  isPaused: boolean
  onHover: (id: string, isHovering: boolean) => void
  onClick: (project: Project) => void
  bounds: { width: number; height: number }
  isMobile: boolean
  laneIndex?: number
  isSpotlight: boolean
}

function ProjBox({ project, position, isPaused, onHover, onClick, bounds, isMobile, laneIndex, isSpotlight }: ProjBoxProps) {
  const config = projectConfig[project.id as keyof typeof projectConfig]
  const Icon = config.icon

  const handleClick = () => {
    onClick(project)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <>
      {/* ProjBox Container */}
      <motion.div
        className="absolute cursor-pointer select-none"
        style={{
          x: position.x,
          y: position.y,
          rotate: position.rotation,
          zIndex: isSpotlight ? 50 : 10,
        }}
        animate={!isPaused ? {
          x: position.x,
          y: position.y,
          rotate: position.rotation,
          scale: isSpotlight ? 2.5 : 1,
        } : {
          scale: isSpotlight ? 2.5 : 1,
        }}
        transition={{ 
          duration: isSpotlight ? 0.5 : 0.1,
          scale: { duration: 0.5, ease: "easeInOut" }
        }}
        onHoverStart={() => onHover(project.id, true)}
        onHoverEnd={() => onHover(project.id, false)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${project.name}: ${project.tagline || project.summary}`}
        whileHover={{ scale: isSpotlight ? 2.6 : 1.05 }}
        whileTap={{ scale: isSpotlight ? 2.4 : 0.95 }}
      >
        {/* ProjBox Body */}
        <div className={`relative w-32 h-16 rounded-full ${config.bgColor} border-2 border-white dark:border-slate-600 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
          {/* ProjBox Icon */}
          <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center`}>
            <Icon className="text-white" size={16} />
          </div>
          
          {/* Project Name - Rotates with ProjBox */}
          <div className="absolute top-1/2 left-12 right-4 transform -translate-y-1/2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
              {project.name.split(' ')[0]}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {project.name.split(' ').slice(1).join(' ')}
            </div>
          </div>

          {/* Wheels */}
          <div className="absolute bottom-0 left-2 w-3 h-3 bg-slate-400 rounded-full"></div>
          <div className="absolute bottom-0 right-2 w-3 h-3 bg-slate-400 rounded-full"></div>
        </div>
      </motion.div>

      {/* Hover Tooltip - Completely separate, no rotation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute pointer-events-none z-50"
        style={{
          left: position.x + 64, // Center of ProjBox (w-32 = 128px, so 64px offset)
          top: position.y - 48,  // Above the ProjBox
        }}
      >
        <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
          {project.tagline || project.summary}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        </div>
      </motion.div>
    </>
  )
}

// Project Details Modal
interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (project) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  if (!project) return null

  const config = projectConfig[project.id as keyof typeof projectConfig]
  const Icon = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-2xl w-full max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-8 bg-gradient-to-r ${config.color} text-white flex-shrink-0`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  {project.tagline && (
                    <p className="text-white/80 text-lg">{project.tagline}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-8 space-y-6 overflow-y-auto flex-1">
            {project.details.downloads && project.details.downloads.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Downloads</h3>
                <div className="flex flex-col gap-3">
                  {project.details.downloads.map((download, index) => (
                    <a
                      key={index}
                      href={download.href}
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors font-semibold"
                    >
                      <Download size={16} />
                      {download.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Summary</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Key Achievements</h3>
              <ul className="space-y-2">
                {project.details.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.details.skills && project.details.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.details.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.details.links && project.details.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Links</h3>
                <div className="flex gap-4">
                  {project.details.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <ExternalLink size={16} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main Component
export default function ProjectCarsShowcase() {
  const [carPositions, setCarPositions] = useState<Record<string, CarPosition>>({})
  const [pausedCars, setPausedCars] = useState<Set<string>>(new Set())
  const [isGlobalPaused, setIsGlobalPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [bounds, setBounds] = useState({ width: 800, height: 400 })
  const [spotlightProject, setSpotlightProject] = useState<string | null>(null)
  const playfieldRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const prefersReducedMotion = usePrefersReducedMotion()

  // Spotlight rotation effect - GEV appears 3x more often
  useEffect(() => {
    if (prefersReducedMotion) return
    
    // Create rotation sequence with GEV appearing 3x more
    const rotationSequence = [
      'gev-investment-report',
      'tigers-vs-cancer',
      'gev-investment-report',
      'vba-automation-abm',
      'gev-investment-report',
      'actuarial-case-study',
      'gev-investment-report'
    ]
    
    let currentIndex = 0
    
    const cycleSpotlight = () => {
      setSpotlightProject(rotationSequence[currentIndex])
      currentIndex = (currentIndex + 1) % rotationSequence.length
    }
    
    // Start immediately
    cycleSpotlight()
    
    // Then rotate every 5 seconds
    const interval = setInterval(cycleSpotlight, 5000)
    
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Initialize car positions
  useEffect(() => {
    const initializePositions = () => {
      const newPositions: Record<string, CarPosition> = {}
      const carWidth = 128 // w-32
      const carHeight = 64 // h-16
      const margin = 20

      projects.forEach((project, index) => {
        let x, y, vx, vy

        if (isMobile) {
          // Lane-based positioning for mobile
          const laneHeight = bounds.height / 3
          const laneY = (index * laneHeight) + (laneHeight / 2) - (carHeight / 2)
          y = Math.max(margin, Math.min(bounds.height - carHeight - margin, laneY))
          x = Math.random() * (bounds.width - carWidth)
          vx = (Math.random() - 0.5) * 2
          vy = 0
        } else {
          // Random positioning for desktop
          x = Math.random() * (bounds.width - carWidth)
          y = Math.random() * (bounds.height - carHeight)
          vx = (Math.random() - 0.5) * 2
          vy = (Math.random() - 0.5) * 2
        }

        newPositions[project.id] = {
          x: Math.max(margin, Math.min(bounds.width - carWidth - margin, x)),
          y: Math.max(margin, Math.min(bounds.height - carHeight - margin, y)),
          vx,
          vy,
          rotation: 0
        }
      })

      setCarPositions(newPositions)
    }

    initializePositions()
  }, [bounds, isMobile])

  // Animation loop
  useEffect(() => {
    if (prefersReducedMotion || isGlobalPaused) return

    const animate = () => {
      setCarPositions(prevPositions => {
        const newPositions = { ...prevPositions }

        Object.keys(newPositions).forEach(carId => {
          if (pausedCars.has(carId)) return

          const pos = newPositions[carId]
          const carWidth = 128
          const carHeight = 64
          const margin = 20

          // Update position
          pos.x += pos.vx
          pos.y += pos.vy

          // Bounce off edges
          if (pos.x <= margin || pos.x >= bounds.width - carWidth - margin) {
            pos.vx = -pos.vx
            pos.x = Math.max(margin, Math.min(bounds.width - carWidth - margin, pos.x))
            pos.rotation += (Math.random() - 0.5) * 20 // Add spin on bounce
          }

          if (pos.y <= margin || pos.y >= bounds.height - carHeight - margin) {
            pos.vy = -pos.vy
            pos.y = Math.max(margin, Math.min(bounds.height - carHeight - margin, pos.y))
            pos.rotation += (Math.random() - 0.5) * 20 // Add spin on bounce
          }

          // Update rotation based on velocity
          pos.rotation += pos.vx * 0.5

          // Keep rotation in reasonable range
          pos.rotation = pos.rotation % 360
        })

        return newPositions
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [bounds, pausedCars, isGlobalPaused, prefersReducedMotion])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (playfieldRef.current) {
        const rect = playfieldRef.current.getBoundingClientRect()
        setBounds({ width: rect.width, height: rect.height })
        setIsMobile(window.innerWidth < 768)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle car hover
  const handleCarHover = useCallback((carId: string, isHovering: boolean) => {
    setPausedCars(prev => {
      const newSet = new Set(prev)
      if (isHovering) {
        newSet.add(carId)
      } else {
        newSet.delete(carId)
      }
      return newSet
    })
  }, [])

  // Handle car click
  const handleCarClick = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  // Handle global pause toggle
  const toggleGlobalPause = () => {
    setIsGlobalPaused(prev => !prev)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      {/* Heading */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-[clamp(1.25rem,6vw,1.75rem)] md:text-4xl lg:text-6xl font-bold">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            My Projects
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Click on the floating objects to explore my projects involving data analysis, automating, and business strategy.
        </p>
      </div>

      {/* Project Stats - Integrated */}
      <div className="mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              icon: Zap,
              value: "40%+",
              label: "Efficiency Improvement",
              description: "Average task efficiency improvement for employers through automation",
              color: "from-blue-500 to-indigo-500"
            },
            {
              icon: TrendingUp,
              value: "$200M+",
              label: "Revenue Analyzed",
              description: "Extracted & Processed data to compare actual vs. Forecast vs. Budgeted Financials",
              color: "from-slate-600 to-slate-700"
            },
            {
              icon: Heart,
              value: "1",
              label: "Lives Saved",
              description: "Recruited stem-cell donors enabling life-saving transplants for patients of Leukemia.",
              color: "from-violet-500 to-purple-500"
            },
            {
              icon: Code,
              value: "$15,000+",
              label: "saved in labor",
              description: "by comparing budgeted FY26 labor hours & dollars for 160+ ABM accounts",
              color: "from-blue-500 to-cyan-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1">{stat.value}</div>
              <div className="font-semibold text-slate-600 dark:text-slate-300 mb-1 text-sm">{stat.label}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Playground */}
      <div className="relative mb-8">
        {/* Playground Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            {prefersReducedMotion ? 'Project Showcase' : 'Project (scatter)plot'}
          </h2>
          {!prefersReducedMotion && (
            <button
              onClick={toggleGlobalPause}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isGlobalPaused ? <Play size={16} /> : <Pause size={16} />}
              {isGlobalPaused ? 'Play All' : 'Pause All'}
            </button>
          )}
        </div>

        {/* Playfield Container */}
        <div
          ref={playfieldRef}
          className="relative min-h-[300px] md:min-h-[420px] rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* ProjBoxes */}
          {projects.map(project => {
            const position = carPositions[project.id]
            if (!position) return null

            return (
              <ProjBox
                key={project.id}
                project={project}
                position={position}
                isPaused={pausedCars.has(project.id) || isGlobalPaused || prefersReducedMotion}
                onHover={handleCarHover}
                onClick={handleCarClick}
                bounds={bounds}
                isMobile={isMobile}
                laneIndex={projects.indexOf(project)}
                isSpotlight={spotlightProject === project.id}
              />
            )
          })}

          {/* Reduced Motion Message */}
          {prefersReducedMotion && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-500 dark:text-slate-400">
                <p className="text-lg font-semibold mb-2">Accessibility Mode</p>
                <p className="text-sm">Objects are stationary for better accessibility. Hover and click to explore projects.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
