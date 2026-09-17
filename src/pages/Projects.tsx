import Section from '@/components/Section'
import ProjectCarsShowcase from '@/components/ProjectCarsShowcase'
import { motion } from 'framer-motion'
import { Code, TrendingUp, Zap, Heart } from 'lucide-react'
import { withBase } from '@/lib/assets'

export default function Projects() {
  return (
    <div className="min-h-screen relative">
      {/* Full-page Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('${withBase('/mountain-bg-2.jpeg')}')`
        }}
      ></div>
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-white/40 dark:bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* ProjBox Showcase with integrated stats */}
        <Section id="projects-showcase" className="py-8">
          <ProjectCarsShowcase />
        </Section>
      </div>
    </div>
  )
}
