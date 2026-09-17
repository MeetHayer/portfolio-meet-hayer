import Section from '@/components/Section'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, Code, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Database, TrendingUp, Zap, Linkedin } from 'lucide-react'
import data from '@/data/personal.json'
import { withBase } from '@/lib/assets'
import { useState, useEffect } from 'react'
import CoursesBelt from '@/components/CoursesBelt'

// Typewriter Text Component with Loop
function TypewriterText() {
  const [displayedText, setDisplayedText] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const phrases = [
    'ex-FP&A @ ABM , ex-PE intern @ Founders Mosaic',
    'Interests- Analytics; Exercise; Singing; Nature; Chess; Politics; AI; Service'
  ]
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fullText = phrases[currentPhraseIndex]

  useEffect(() => {
    // Typing phase
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 40) // 2.5x faster typing
      return () => clearTimeout(timeout)
    } 
    // After typing is complete, wait 7 seconds then fade out
    else if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false)
        // After fade out completes, reset and move to next phrase
        setTimeout(() => {
          setDisplayedText('')
          setCurrentIndex(0)
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length)
          setIsVisible(true)
        }, 300) // Fade out duration
      }, 7000) // 7 seconds display time
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText, isVisible, currentPhraseIndex, phrases.length])

  return (
    <div className="text-slate-200/95 font-mono font-semibold">
      <span className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {displayedText}
      </span>
      <span className="animate-pulse">|</span>
    </div>
  )
}

// Welcome Text Animation (letter by letter, gothic)
        function WelcomeText() {
          const [displayedText, setDisplayedText] = useState('')
          const animatedPart = 'Welcome to Meet\'s '
          const staticPart = 'Website'
          const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < animatedPart.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + animatedPart[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 150) // Faster letter appearance

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, animatedPart])

  return (
    <span className="text-slate-50 drop-shadow-lg">
      {displayedText}
      <span className="animate-pulse">|</span>
      {staticPart}
    </span>
  )
}

// Scratch-Off Motto Design
function MottoText() {
  const [isScratched, setIsScratched] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [blindsRevealed, setBlindsRevealed] = useState(false)
  const fullText = 'YOGOWYPI: You Only Get Out, What You Put In'

  useEffect(() => {
    // Calculate when welcome text finishes: 15 characters * 150ms + 500ms buffer
    const welcomeDuration = 15 * 150 + 500
    const timer = setTimeout(() => setShowWelcome(true), welcomeDuration)
    return () => clearTimeout(timer)
  }, [])

  // Checkerboard effect when scratched
  useEffect(() => {
    if (!isScratched) return

    const timer = setTimeout(() => {
      setBlindsRevealed(true)
    }, 1000) // Start checkerboard effect after 1000ms (slower)

    return () => clearTimeout(timer)
  }, [isScratched])

  const handleScratch = () => {
    if (!isScratched) {
      setIsScratched(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ 
        opacity: showWelcome ? 1 : 0,
        scale: showWelcome ? 1 : 0.9,
        y: showWelcome ? 0 : 15
      }}
      transition={{ 
        duration: 1,
        ease: "easeOut"
      }}
      className="relative my-6"
    >
      {/* Royal Background - Theme Matched */}
      <div className="relative bg-gradient-to-br from-slate-50 via-primary-50 to-accent-50 dark:from-slate-800/50 dark:via-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 shadow-2xl border border-primary-200/50 dark:border-primary-500/30 overflow-hidden">
        {/* Elegant Border with Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 via-accent-400/20 to-primary-400/20 p-[1px]">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-50 via-primary-50 to-accent-50 dark:from-slate-800/50 dark:via-primary-900/20 dark:to-accent-900/20"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center">
          {!isScratched ? (
            // Scratch-off Layer
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="cursor-pointer group"
              onClick={handleScratch}
            >
              {/* Scratch-off Surface */}
              <div className="relative bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 dark:from-purple-800 dark:via-violet-800 dark:to-indigo-800 rounded-lg p-4 shadow-inner">
                {/* Scratch Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12"></div>
                </div>
                
                {/* Text */}
                <div className="relative z-10 text-lg font-semibold text-purple-800 dark:text-purple-200 font-heading tracking-wide group-hover:text-purple-900 dark:group-hover:text-purple-100 transition-colors">
                  My Motto? <span className="text-sm opacity-75">*click to reveal*</span>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </motion.div>
          ) : (
            // Revealed Content - Checkerboard Effect
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xl lg:text-2xl font-bold text-primary-700 dark:text-primary-300 font-heading whitespace-nowrap overflow-hidden relative"
            >
              <motion.span 
                className="text-blue-500 dark:text-blue-300 block"
                initial={{ 
                  opacity: 0,
                  scale: 0.8
                }}
                animate={blindsRevealed ? {
                  opacity: 1,
                  scale: 1
                } : {
                  opacity: 0,
                  scale: 0.8
                }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.4
                }}
              >
                {fullText}
              </motion.span>
              
              {/* Checkerboard overlay effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ 
                  backgroundImage: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, white 90deg, transparent 180deg, white 270deg, transparent 360deg)",
                  backgroundSize: "20px 20px",
                  opacity: 1
                }}
                animate={blindsRevealed ? { 
                  opacity: 0,
                  scale: 1.2
                } : { 
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  duration: 2.0,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </motion.div>
          )}
          
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent mx-auto mt-3"
          ></motion.div>
        </div>
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-200/10 via-accent-200/10 to-primary-200/10 dark:from-primary-500/5 dark:via-accent-500/5 dark:to-primary-500/5"></div>
      </div>
    </motion.div>
  )
}

// Rotating Tagline Component
function RotatingTagline() {
  const taglines = [
    'Data Analytics & Automation', 
    'Business Strategy',
    'Investment & Portfolio Analysis'
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentTagline = taglines[currentIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTagline.length) {
          setDisplayedText(prev => prev + currentTagline[displayedText.length])
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(prev => prev.slice(0, -1))
        } else {
          // Move to next tagline
          setIsDeleting(false)
          setCurrentIndex(prev => (prev + 1) % taglines.length)
        }
      }
    }, isDeleting ? 30 : 80) // Fast typing

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentIndex, taglines])

  return (
    <span className="text-slate-200/95 drop-shadow-lg">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Dynamic Skills Component with Toggle
function DynamicSkills() {
  const [activeSection, setActiveSection] = useState<'programming' | 'financial'>('financial')
  
  const skillCategories = {
    programming: {
      title: 'Programming & Development',
      skills: data.skills.programming,
      icon: Code,
      color: 'from-primary-500 to-primary-600',
      description: 'Full-stack development with modern frameworks'
    },
    financial: {
      title: 'Financial, ERP & other softwares',
      skills: data.skills.software,
      icon: Database,
      color: 'from-emerald-500 to-teal-600',
      description: 'Enterprise systems and BI tools'
    }
  }

  const [currentSkill, setCurrentSkill] = useState(0)
  const currentCategory = skillCategories[activeSection]

  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % currentCategory.skills.length)
    }, 2000)

    return () => {
      clearInterval(skillInterval)
    }
  }, [currentCategory.skills.length])

  const currentSkillData = currentCategory.skills[currentSkill]

  return (
    <div className="text-center space-y-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Technical Expertise
        </h2>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 bg-primary-100 rounded-full p-1">
          <button
            onClick={() => setActiveSection('programming')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === 'programming'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <Code size={16} className="inline mr-2" />
            Dev
          </button>
          <button
            onClick={() => setActiveSection('financial')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === 'financial'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <Database size={16} className="inline mr-2" />
            Finance
          </button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8 bg-gradient-to-br from-white to-primary-50/30 border-primary-200/50 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-400 to-accent-400 transform rotate-12 scale-150"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center md:group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                <currentCategory.icon className="text-white" size={28} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-primary-700">{currentCategory.title}</h3>
                <p className="text-secondary-600">{currentCategory.description}</p>
              </div>
            </div>
            
            <motion.div
              key={currentSkill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {currentSkillData}
              </div>
              <div className="flex justify-center gap-2">
                {currentCategory.skills.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSkill ? 'bg-primary-500' : 'bg-primary-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Creative Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            to="/about"
            onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                  skillsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold text-lg hover:from-primary-600 hover:to-accent-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Zap size={20} className="text-white" />
            </div>
            <span>Explore Full Skills Arsenal</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section id="hero" className="relative overflow-hidden min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${withBase('/swiss-alps-lake.jpg')}')`,
            backgroundPosition: 'center 35%', // shows horizon + sun nicely
          }}
        />
        {/* Readability overlay (light + dark) */}
        <div className="
          absolute inset-0
          bg-gradient-to-b from-black/70 via-black/45 to-black/15
          dark:from-slate-950/80 dark:via-slate-900/55 dark:to-slate-800/25
        " />

        {/* Top-left mini badge (desktop only) */}
        <Link 
          to="/"
          className="hidden md:flex absolute top-8 left-8 items-center gap-3 bg-white/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border border-white/30 dark:border-white/10 rounded-2xl shadow-lg backdrop-blur px-3 py-2 hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
        >
          <img src={withBase('/Dreamwave-Photo.png')} alt="Manmeet"
               className="w-10 h-8 rounded-full object-cover object-top ring-2 ring-white/80 dark:ring-white/30" />
          <div className="text-sm leading-tight">
            <div className="font-semibold">B.A. — Finance &amp; CS</div>
            <div className="opacity-80">DePauw University '26</div>
          </div>
        </Link>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-1 sm:px-2 lg:px-3 xl:px-1 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-12 xl:gap-24">
            {/* LEFT: text */}
            <div className="text-left max-w-2xl xl:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="font-bold leading-tight text-[clamp(2rem,7vw,3.5rem)] text-slate-50">
                  <WelcomeText />
                </h1>
                <div className="text-[clamp(1rem,2.8vw,1.2rem)] text-slate-200/95 max-w-prose">
                  <TypewriterText />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link 
                    className="inline-flex items-center rounded-xl px-5 py-3 bg-amber-400/95 hover:bg-amber-300 text-slate-900 font-medium shadow-lg transition-all duration-300 group" 
                    to="/about"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setTimeout(() => {
                        const experienceSection = document.getElementById('experience');
                        if (experienceSection) {
                          experienceSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    <Briefcase size={20} className="mr-2" />
                    View My Experience
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    className="inline-flex items-center rounded-xl px-5 py-3 bg-white/90 hover:bg-white text-slate-800 font-medium shadow-lg transition-all duration-300 group" 
                    to="/contact"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Mail size={18} className="mr-2" />
                    Contact Me
                  </Link>
                  <Link 
                    className="inline-flex items-center rounded-xl px-5 py-3 bg-slate-700/90 hover:bg-slate-600 text-white font-medium shadow-lg transition-all duration-300 group" 
                    to="/projects"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Code size={18} className="mr-2" />
                    View My Projects
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    className="inline-flex items-center rounded-xl px-5 py-3 bg-slate-700/90 hover:bg-slate-600 text-white font-medium shadow-lg transition-all duration-300 group" 
                    to="/writing"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <GraduationCap size={18} className="mr-2" />
                    Writing
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: stacked card */}
            <div className="mt-4 md:-mt-8 flex md:justify-end md:pr-0 xl:pr-0">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-56 sm:w-64 md:w-80 bg-white/10 dark:bg-slate-900/30
                             backdrop-blur-xl border border-white/20 dark:border-white/10
                             rounded-3xl shadow-2xl overflow-hidden"
                >
                  <img
                    src={withBase('/Dreamwave-Photo 2.png')}
                    alt="Manmeet Singh Hayer"
                    className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-2xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-50 drop-shadow">Manmeet Singh Hayer</h3>
                    <div className="mt-2 flex items-center justify-center gap-3">
                      <a href="https://www.linkedin.com/in/meethayer/" target="_blank" rel="noopener noreferrer"
                         className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition">
                        <Linkedin size={18} />
                      </a>
                      <a href="mailto:hayermanmeetsingh@gmail.com"
                         className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">
                        <Mail size={18} />
                      </a>
                    </div>
                    <div className="mt-3 text-sm text-slate-200/95 font-mono font-semibold">
                      Data Analytics & Automation | Business Strategy | Investment & Portfolio Analysis
                    </div>
                  </div>
                </motion.div>
                
              </div>
            </div>
          </div>
          
          {/* Motto at top of hero section */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-slate-300 italic font-medium drop-shadow-lg">
              My Motto?<br />
              "YOGOWYPI: You Only Get Out, What You Put In"
            </p>
          </div>
        </div>
      </Section>

      {/* Dynamic Skills Preview */}
      <Section id="skills-preview">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <DynamicSkills />
        </motion.div>
      </Section>

      {/* Courses Belt */}
      <Section id="courses-belt" className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Academic Journey
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore the diverse courses that shaped my knowledge in finance, computer science, and beyond
            </p>
          </div>
          
          <CoursesBelt />
        </motion.div>
      </Section>

      {/* Highlights */}
      <Section id="highlights">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Explore My Work
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Projects', 
                desc: 'Data automation tools, financial models, and innovative solutions that drive efficiency.', 
                to: '/projects',
                icon: Code,
                color: 'from-violet-500 to-purple-600'
              },
              { 
                title: 'Volunteering', 
                desc: 'As a Bonner Scholar, I spent 140+ hours every semester in community & social service', 
                to: '/about',
                icon: Briefcase,
                color: 'from-violet-500 to-purple-600',
                onClick: () => {
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const volunteerSection = document.getElementById('volunteer');
                    if (volunteerSection) {
                      volunteerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              },
              { 
                title: 'Writing', 
                desc: 'Thoughts on finance, technology, and the intersection of data analytics with real-world impact.', 
                to: '/writing',
                icon: GraduationCap,
                color: 'from-cyan-500 to-blue-500'
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={card.to} 
                  className="group block"
                  onClick={card.onClick || (() => window.scrollTo(0, 0))}
                >
                  <div className="card p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-6 md:group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                      <card.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-secondary-600 leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="mt-4 flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Learn more
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Contact Info Section */}
      <Section id="contact-info" className="bg-gradient-to-br from-primary-50/50 to-accent-50/50 dark:from-slate-900/50 dark:to-slate-800/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent dark:professional-gradient-text">
            Let's Connect
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-secondary-600 dark:text-slate-300 mb-8">
              Ready to discuss opportunities or collaborate on innovative projects? I'd love to hear from you.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <Mail className="mx-auto mb-4 text-pink-500 dark:text-pink-400" size={32} />
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a 
                  href={`mailto:${data.email}`} 
                  className="text-secondary-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {data.email}
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <Phone className="mx-auto mb-4 text-green-500 dark:text-green-400" size={32} />
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a 
                  href={`tel:${data.phone}`} 
                  className="text-secondary-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-300 transition-colors"
                >
                  {data.phone}
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <MapPin className="mx-auto mb-4 text-indigo-500 dark:text-indigo-400" size={32} />
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-secondary-600 dark:text-slate-300">
                  {data.location}
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link 
                className="btn btn-contact group" 
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Mail size={18} className="md:group-hover:scale-110 transition-transform" />
                Get In Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Single Scroll Down Arrow - Fixed Position */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
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
  )
}
