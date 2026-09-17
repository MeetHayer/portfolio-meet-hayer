import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code, ExternalLink, Github, Heart, BookOpen, Zap, TrendingUp } from 'lucide-react'
import { type Project } from './ProjectCard'
import { withBase } from '@/lib/assets'

interface FloatingProjectProps {
  project: Project
  index: number
  isSelected: boolean
  onSelect: () => void
  onClose: () => void
}

const projectIcons = {
  'Tigers vs. Cancer': Heart,
  'VBA Automation': Code,
  'CAS Case Study': BookOpen,
}

const projectColors = {
  'Tigers vs. Cancer': 'from-purple-400 to-violet-500',
  'VBA Automation': 'from-blue-400 to-indigo-500',
  'CAS Case Study': 'from-emerald-400 to-teal-500',
}

export default function FloatingProject({ project, index, isSelected, onSelect, onClose }: FloatingProjectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const Icon = projectIcons[project.title as keyof typeof projectIcons] || Code
  const colorClass = projectColors[project.title as keyof typeof projectColors] || 'from-violet-400 to-purple-500'

  // Generate random starting position
  useEffect(() => {
    const x = Math.random() * (window.innerWidth - 200)
    const y = Math.random() * (window.innerHeight - 200) + 100
    setPosition({ x, y })
  }, [])

  // Floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSelected && !isHovered) {
        setPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 20,
          y: prev.y + (Math.random() - 0.5) * 20
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isSelected, isHovered])

  return (
    <>
      {/* Floating Project Balloon */}
      <motion.div
        className={`fixed z-30 cursor-pointer select-none ${isSelected ? 'z-50' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          x: isSelected ? '50%' : 0,
          y: isSelected ? '50%' : 0,
          scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        whileHover={{ 
          scale: 1.1,
          y: -10,
          transition: { duration: 0.2 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onSelect}
      >
        <div className={`relative group`}>
          {/* Balloon Body */}
          <motion.div
            className={`w-24 h-32 rounded-full bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm shadow-2xl border-2 border-white/50 flex flex-col items-center justify-center p-4 ${colorClass}`}
            animate={{
              rotate: isSelected ? 0 : [0, 2, -2, 0],
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Project Icon */}
            <Icon className="text-white mb-2" size={28} />
            
            {/* Project Title */}
            <div className="text-white text-xs font-bold text-center leading-tight">
              {project.title.split(' ').slice(0, 2).join(' ')}
            </div>
            
            {/* Floating particles around balloon */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Balloon String */}
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-gray-400 to-gray-600 mx-auto mt-2"
            animate={{
              rotate: isSelected ? 0 : [0, 1, -1, 0],
            }}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
          
          {/* Hover Tooltip */}
          {isHovered && !isSelected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
            >
              Click to explore
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Project Details Modal */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-8 bg-gradient-to-r ${colorClass} text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="text-white" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <p className="text-white/80">Project</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Description</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
              </div>

              {project.achievements && project.achievements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.stack && project.stack.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {project.demoUrl && (
                  <a
                    href={withBase(project.demoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink size={18} />
                    {project.title.includes("CAS Case Study") ? "Review our pricing solution" : "Live Demo"}
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
