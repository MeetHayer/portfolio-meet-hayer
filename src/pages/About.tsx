import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Code, Database, TrendingUp, Users, Globe, ChevronDown, ChevronUp, ArrowDown, ArrowUp } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'
import { useState } from 'react'

// Expandable Box Component
function ExpandableBox({ 
  title, 
  icon: Icon, 
  children, 
  gradient, 
  delay = 0,
  expanded,
  onToggle
}: { 
  title: string; 
  icon: any; 
  children: React.ReactNode; 
  gradient: string;
  delay?: number;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = expanded ?? internalExpanded
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalExpanded(prev => !prev)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: delay === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      className="card p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50/50 to-accent-50/50 border-primary-200/50 hover:shadow-2xl transition-all duration-500 group self-start overflow-hidden"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center md:group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
              <Icon className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent font-elegant">
              {title}
            </h2>
          </div>
          <button
            onClick={handleToggle}
            className="p-2 rounded-full bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700 transition-colors duration-200"
          >
            <ChevronDown 
              size={20} 
              className={`text-primary-600 dark:text-primary-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
        
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[9999px]' : 'max-h-32'}`}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

// Volunteer Card Component
function VolunteerCard({ volunteer, index }: { volunteer: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleToggle = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative self-start"
    >
      {/* Postcard Container */}
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 h-full min-h-[280px]">
        {/* Postcard Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="text-white" size={16} />
            </div>
            <div className="text-right">
              <div className="text-xs opacity-90">{volunteer.period}</div>
              <div className="text-xs opacity-75">{volunteer.location}</div>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-1">{volunteer.title}</h3>
          <p className="text-sm font-semibold opacity-90">{volunteer.company}</p>
          {volunteer.tagline && (
            <p className="text-xs opacity-80 mt-1 italic">"{volunteer.tagline}"</p>
          )}
        </div>
        
        {/* Postcard Content */}
        <div className="p-4 space-y-3">
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            {volunteer.description}
          </p>
          
          {/* Expandable Achievements */}
          <div className="space-y-2">
            <button
              onClick={handleToggle}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-xs">Key Impact:</h4>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="space-y-1">
                {volunteer.achievements.map((achievement: string, achIndex: number) => (
                  <li key={achIndex} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-violet-500 mt-1.5 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="min-h-screen relative">
      {/* Full-page Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('${withBase('/mountain-bg-1.webp')}')`
        }}
      ></div>
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-white/40 dark:bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section with Side-by-Side Layout */}
      <Section id="about-hero" className="relative overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-5"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-6xl mx-auto mb-16"
          >
            <h1 className="section-title">About Me</h1>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* About Box - Left */}
            <ExpandableBox 
              key="who-i-am"
              title="Who I Am" 
              icon={Code} 
              gradient="bg-gradient-to-r from-purple-500 to-violet-500"
              delay={0.2}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-primary-700 font-heading">Introduction</h3>
                    <p className="text-secondary-600 leading-relaxed">
                      I grew up in a semi-urban town in Punjab, India, and came to DePauw University on a <strong>full cost scholarship</strong>. Numbers have always been my thing, and college opened up the world of business and finance—fields I never had access to back home. Since then, I've been hooked on how money and value are driven higher through financial planning, process optimization, investment strategy and M&As.
                    </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3 text-primary-700 font-heading">Interests</h3>
                  <p className="text-secondary-600 leading-relaxed">
                    Outside the classroom, I prioritize fitness. I also enjoy singing, chess, hiking, and billiards. I'm an avid reader with a particular interest in business and politics.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3 text-primary-700 font-heading">What I Work On</h3>
                  <p className="text-secondary-600 leading-relaxed">
                    I like tackling problems where finance meets tech. My experience spans data visualization and analytics, process optimization and automation, business strategy, CRM management, marketing insights, and product analysis—always with an eye on making systems run smarter and more efficiently.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-primary-200/50">
                  <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></div>
                    <span>Always learning, always growing</span>
                  </div>
                </div>
              </div>
            </ExpandableBox>

            {/* Education Box - Right */}
            <ExpandableBox 
              key="academic-journey"
              title="Academic Journey" 
              icon={GraduationCap} 
              gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
              delay={0.4}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-primary-700">{data.education.degree}</h3>
                  <p className="text-lg text-secondary-600">{data.education.school}</p>
                  <p className="text-secondary-500">Expected Graduation: {data.education.graduation}</p>
                  <p className="text-primary-600 font-semibold">GPA: {data.education.gpa}</p>
                </div>
                
                {/* Awards - Always Visible (Outside Expandable Area) */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-primary-700">Awards & Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.education.awards.map((award, index) => (
                      <span key={index} className="badge bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 hover:scale-105 transition-transform duration-200">
                        <Award size={14} className="mr-1" />
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
                {data.education.academicExcellence && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-primary-700">Leadership & Programs</h4>
                    <ul className="space-y-2">
                      {data.education.academicExcellence.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
            </ExpandableBox>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="section-title">Professional Experience</h2>
          
          {/* Professional Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50/50 to-accent-50/50 border-primary-200/50 dark:from-slate-800/50 dark:to-slate-700/50 dark:border-slate-600/50 self-start overflow-hidden"
          >
            <p className="text-lg text-secondary-600 dark:text-slate-300 leading-relaxed text-center font-sans break-words">
              I'm a finance analyst who codes. I use Python/VBA/SQL, Microsoft Office, BI and ERP tools to turn messy operational data into decisions—budget vs. actuals, variance patterns, unit economics—and build small automations that save real hours. I like ownership, tight feedback loops, and shipping useful tools fast. Senior at DePauw (Finance & CS), graduating May 2026; open to roles in corporate finance/FP&A, investment analysis & portfolio management, BNPL/fintech, and data-heavy product or analytics work.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {data.workExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-300 self-start overflow-hidden"
              >
                <div className="flex items-start gap-6 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-white" size={28} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary-700">{exp.title}</h3>
                      <p className="text-lg text-secondary-600">{exp.company}</p>
                      <p className="text-secondary-500">{exp.location} • {exp.period}</p>
                    </div>
                    
                    <p className="text-secondary-600 leading-relaxed">{exp.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary-700">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-sm text-secondary-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Volunteer Experience Section */}
      <Section id="volunteer" className="pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="section-title">Volunteer Experience</h2>
          
          <div className="grid md:grid-cols-3 gap-4 items-start">
            {data.volunteerExperience.map((volunteer, index) => (
              <VolunteerCard key={volunteer.id} volunteer={volunteer} index={index} />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="section-title">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Programming & Development',
                skills: data.skills.programming,
                icon: Code,
                color: 'from-primary-500 to-primary-600',
                description: 'Full-stack development with modern frameworks and automation tools'
              },
              {
                title: 'Financial Software & ERP',
                skills: data.skills.software,
                icon: Database,
                color: 'from-secondary-500 to-secondary-600',
                description: 'Enterprise systems, BI tools, and financial modeling platforms'
              },
              {
                title: 'Financial Analysis & Modeling',
                skills: data.skills.finance,
                icon: TrendingUp,
                color: 'from-accent-500 to-accent-600',
                description: 'Advanced financial modeling, valuation, and risk analysis'
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300 self-start overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}>
                  <category.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-primary-700">{category.title}</h3>
                <p className="text-sm text-secondary-500 mb-4 leading-relaxed">{category.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="badge text-xs text-center py-2 px-3">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8">
            {data.skills.specializations && (
              <div>
                <h3 className="text-2xl font-bold text-center mb-6 text-white">Passions</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {data.skills.specializations.map((specialization, index) => (
                    <span key={index} className="chip">
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-2xl font-bold text-center mb-6 text-white">Languages</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {data.skills.languages.map((language, index) => (
                  <span key={index} className="chip">
                    <Globe size={14} className="mr-1" />
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Single Scroll Down Arrow - Fixed Position */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full bg-primary-500/20 dark:bg-primary-400/20 backdrop-blur-sm border border-primary-300/30 dark:border-primary-500/30 flex items-center justify-center cursor-pointer hover:bg-primary-500/30 dark:hover:bg-primary-400/30 transition-all duration-300 shadow-lg"
            onClick={() => {
              // Scroll down by one viewport height
              window.scrollTo({ 
                top: window.scrollY + window.innerHeight, 
                behavior: 'smooth' 
              })
            }}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={22} className="text-primary-600 dark:text-primary-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      </div>

    </div>
  )
}
