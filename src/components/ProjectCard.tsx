import { Github, ExternalLink, Award, Zap, TrendingUp } from 'lucide-react'
import { withBase } from '@/lib/assets'

export type Project = {
  title: string
  description: string
  stack: string[]
  achievements?: string[]
  codeUrl?: string
  demoUrl?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card p-8 hover:shadow-2xl transition-all duration-300 group">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors dark:text-electric-300 dark:group-hover:text-electric-200">
            {project.title}
          </h3>
          <p className="text-secondary-600 leading-relaxed text-lg dark:text-slate-300">
            {project.description}
          </p>
        </div>

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="text-accent-500 dark:text-accent-400" size={18} />
              <h4 className="font-semibold text-accent-700 dark:text-accent-300">Key Achievements</h4>
            </div>
            <ul className="space-y-2">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-secondary-600 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 dark:bg-accent-400 mt-2 flex-shrink-0"></div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-3">
          <h4 className="font-semibold text-primary-700 dark:text-electric-300">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span 
                key={tech} 
                className="badge bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 hover:from-primary-200 hover:to-accent-200 transition-all duration-300 dark:from-electric-500/20 dark:to-accent-500/20 dark:text-electric-300 dark:border-electric-500/30 dark:hover:from-electric-500/30 dark:hover:to-accent-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {project.codeUrl && (
            <a 
              className="btn btn-primary group/btn" 
              href={project.codeUrl} 
              target="_blank" 
              rel="noreferrer"
            >
              <Github size={18} className="group-hover/btn:rotate-12 transition-transform" /> 
              View Code
            </a>
          )}
          {project.demoUrl && (
            <a 
              className="btn btn-secondary group/btn" 
              href={withBase(project.demoUrl)} 
              target="_blank" 
              rel="noreferrer"
            >
              <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" /> 
              {project.title.includes("CAS Case Study") ? "Review our pricing solution" : "Live Demo"}
            </a>
          )}
          {!project.codeUrl && !project.demoUrl && (
            <div className="flex items-center gap-2 text-secondary-500 text-sm">
              <Zap className="text-accent-500" size={16} />
              <span>Proprietary solution</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
