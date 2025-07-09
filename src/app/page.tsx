"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Activity,
  Zap,
  Heart,
  Shield,
  Calendar,
  ArrowRight,
  Star,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Microscope,
  Dna,
  Stethoscope,
} from "lucide-react"

export default function PhysiogenFit() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [docHeight, setDocHeight] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [lastScrollY, setLastScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Hide/show header on mobile based on scroll direction
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHeaderVisible(false)
        } else {
          setHeaderVisible(true)
        }
      } else {
        setHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)

      const sections = document.querySelectorAll("section")
      const scrollPosition = currentScrollY + 200

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(index)
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const calcDocHeight = () => setDocHeight(document.documentElement.scrollHeight - window.innerHeight)

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", calcDocHeight)

    calcDocHeight() // initialise once DOM is available
    setIsVisible(true)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", calcDocHeight)
    }
  }, [lastScrollY])

  const clinicalServices = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Musculoskeletal Rehabilitation",
      desc: "Evidence-based therapeutic interventions utilizing advanced biomechanical assessment and neuromuscular re-education protocols",
      gradient: "from-blue-500 to-cyan-400",
      modalities: ["Manual Therapy Techniques", "Therapeutic Exercise Prescription", "Functional Movement Analysis"],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Athletic Performance Optimization",
      desc: "Comprehensive biomechanical analysis and sport-specific conditioning protocols designed to enhance neuromuscular efficiency",
      gradient: "from-purple-500 to-pink-400",
      modalities: ["Plyometric Training Protocols", "Movement Pattern Optimization", "Performance Metrics Analysis"],
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Integrative Wellness Medicine",
      desc: "Holistic therapeutic approach incorporating physiological assessment, nutritional biochemistry, and lifestyle modification strategies",
      gradient: "from-green-500 to-emerald-400",
      modalities: ["Metabolic Assessment", "Stress Physiology Management", "Circadian Rhythm Optimization"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Preventive Biomechanics",
      desc: "Systematic movement screening and risk stratification protocols utilizing advanced kinematic analysis methodologies",
      gradient: "from-orange-500 to-red-400",
      modalities: ["Functional Movement Screening", "Injury Risk Assessment", "Prophylactic Exercise Protocols"],
    },
  ]

  const clinicalPathway = [
    {
      step: "01",
      title: "Comprehensive Assessment",
      desc: "Systematic evaluation utilizing validated assessment tools, biomechanical analysis, and physiological screening protocols",
      icon: <Target className="h-6 w-6" />,
    },
    {
      step: "02",
      title: "Treatment Protocol Development",
      desc: "Evidence-based intervention strategies formulated through clinical reasoning and therapeutic goal establishment",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      step: "03",
      title: "Therapeutic Implementation",
      desc: "Progressive intervention delivery with continuous monitoring, outcome measurement, and protocol modification",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      step: "04",
      title: "Outcome Optimization",
      desc: "Sustained functional improvement through maintenance protocols and long-term health behavior modification",
      icon: <Sparkles className="h-6 w-6" />,
    },
  ]

  const clinicalTeam = [
    {
      name: "Dr. Sarah Chen, DPT, PhD",
      role: "Director of Clinical Services",
      specialty: "Orthopedic Manual Therapy & Sports Medicine",
      credentials: "Board-Certified Orthopedic Clinical Specialist",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Marcus Rodriguez, MS, CSCS",
      role: "Performance Physiologist",
      specialty: "Exercise Physiology & Biomechanical Analysis",
      credentials: "Certified Strength & Conditioning Specialist",
      gradient: "from-green-500 to-blue-500",
    },
    {
      name: "Dr. Emily Watson, PhD, RD",
      role: "Integrative Wellness Director",
      specialty: "Clinical Nutrition & Metabolic Health",
      credentials: "Registered Dietitian & Exercise Physiologist",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const clinicalOutcomes = [
    {
      patient: "S. Johnson, Competitive Athlete",
      condition: "Post-Surgical ACL Reconstruction",
      intervention:
        "12-week progressive neuromuscular re-education protocol with sport-specific functional training and biomechanical optimization",
      outcome: "Return to competitive performance with 98% functional capacity restoration",
      timeframe: "16 weeks post-intervention",
    },
    {
      patient: "M. Chen, Software Engineer",
      condition: "Chronic Cervicothoracic Dysfunction",
      intervention:
        "Multimodal approach incorporating manual therapy, postural re-education, and ergonomic workplace modifications",
      outcome: "Complete resolution of symptoms with improved cervical range of motion and functional capacity",
      timeframe: "8 weeks treatment duration",
    },
    {
      patient: "E. Rodriguez, Professional Athlete",
      condition: "Performance Enhancement Protocol",
      intervention:
        "Comprehensive biomechanical analysis with targeted strength and conditioning program utilizing periodization principles",
      outcome: "25% improvement in sport-specific performance metrics with injury risk reduction",
      timeframe: "12-week intervention period",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden relative">
      {/* Scientific Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* DNA Helix Pattern */}
        <div className="absolute top-20 right-10 opacity-10">
          <svg width="200" height="400" viewBox="0 0 200 400" className="text-blue-400">
            <path
              d="M50 0 Q100 50 50 100 Q0 150 50 200 Q100 250 50 300 Q0 350 50 400"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M150 0 Q100 50 150 100 Q200 150 150 200 Q100 250 150 300 Q200 350 150 400"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1={i * 50 + 25}
                x2="150"
                y2={i * 50 + 25}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* Molecular Structure */}
        <div className="absolute bottom-20 left-10 opacity-10">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-green-400">
            <circle cx="150" cy="150" r="8" fill="currentColor" />
            <circle cx="100" cy="100" r="6" fill="currentColor" />
            <circle cx="200" cy="100" r="6" fill="currentColor" />
            <circle cx="100" cy="200" r="6" fill="currentColor" />
            <circle cx="200" cy="200" r="6" fill="currentColor" />
            <circle cx="50" cy="150" r="4" fill="currentColor" />
            <circle cx="250" cy="150" r="4" fill="currentColor" />
            <line x1="150" y1="150" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="200" y2="100" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="100" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="150" y1="150" x2="200" y2="200" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="100" x2="50" y2="150" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="100" x2="250" y2="150" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Neural Network Pattern */}
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <svg width="400" height="200" viewBox="0 0 400 200" className="text-purple-400">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 400}
                cy={Math.random() * 200}
                r="3"
                fill="currentColor"
                opacity="0.6"
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <line
                key={i}
                x1={Math.random() * 400}
                y1={Math.random() * 200}
                x2={Math.random() * 400}
                y2={Math.random() * 200}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* Anatomical Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="text-gray-600">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none transition-all duration-1000 z-10"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 50%)`,
        }}
      />

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-300"
          style={{ width: `${docHeight ? (scrollY / docHeight) * 100 : 0}%` }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full bg-gray-900/90 backdrop-blur-xl z-40 transition-all duration-500 border-b border-gray-700/50 ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-between h-20">
            <Link
              href="#home"
              className="text-2xl font-light text-white transition-all duration-300 hover:text-blue-400 relative group -ml-4"
            >
              PHYSIOGEN
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12 ml-20">
              {["Clinical Services", "Treatment Protocol", "Clinical Team", "Case Studies", "Consultation"].map(
                (item, index) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className={`text-gray-300 hover:text-blue-400 transition-all duration-300 font-light relative group text-sm ${
                      activeSection === index + 1 ? "text-blue-400" : ""
                    }`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ),
              )}
              <a href="tel:00923137818887">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                  Schedule Assessment
                </Button>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 transition-transform duration-300 hover:scale-110 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transition-all duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-500 ease-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
          >
            <nav className="py-6 space-y-4">
              {["Clinical Services", "Treatment Protocol", "Clinical Team", "Case Studies", "Consultation"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-light transform hover:translate-x-2 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ),
              )}
              <a href="tel:00923137818887" className="block">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-full transition-all duration-300 hover:scale-105 text-sm">
                  Schedule Assessment
                </Button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/80" />

        {/* Background Scientific Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4">
            <Microscope className="h-32 w-32 text-blue-400 transform rotate-12" />
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <Dna className="h-40 w-40 text-green-400 transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <Stethoscope className="h-24 w-24 text-purple-400 transform rotate-45" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-6xl mx-auto text-center">
            <div
              className={`space-y-12 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full text-sm font-medium text-blue-300 mb-8 border border-blue-500/30">
                  <Microscope className="h-4 w-4" />
                  <span>Evidence-Based Clinical Excellence Since 2009</span>
                </div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight text-white leading-none">
                  <span
                    className="block transition-all duration-1000 ease-out"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                  >
                    Advanced
                  </span>
                  <span
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent transition-all duration-1000 ease-out"
                    style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                  >
                    Rehabilitation Science
                  </span>
                </h1>

                <p
                  className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1000 ease-out delay-300"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  Integrating cutting-edge biomechanical analysis, evidence-based therapeutic interventions, and
                  personalized treatment protocols to optimize human movement and physiological function.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="tel:00923137818887" className="w-full sm:w-auto flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Calendar className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    Schedule Clinical Assessment
                  </Button>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto">
                {[
                  { num: "2,000+", label: "Clinical Cases", color: "from-blue-400 to-cyan-300" },
                  { num: "15+", label: "Years Research", color: "from-green-400 to-emerald-300" },
                  { num: "98%", label: "Treatment Efficacy", color: "from-purple-400 to-pink-300" },
                  { num: "24/7", label: "Clinical Support", color: "from-orange-400 to-red-300" },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="text-center transition-all duration-500 ease-out hover:scale-110 group cursor-pointer"
                    style={{
                      animationDelay: `${index * 200 + 800}ms`,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.6s ease-out ${index * 200 + 800}ms`,
                    }}
                  >
                    <div
                      className={`text-3xl font-light bg-gradient-to-r ${metric.color} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110`}
                    >
                      {metric.num}
                    </div>
                    <div className="text-gray-400 font-light text-sm mt-2">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Services Section */}
      <section id="clinical-services" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 via-gray-850 to-gray-800" />

        {/* Background Medical Icons */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20">
            <Activity className="h-20 w-20 text-blue-400" />
          </div>
          <div className="absolute bottom-20 right-20">
            <Heart className="h-24 w-24 text-red-400" />
          </div>
          <div className="absolute top-1/2 left-10">
            <Brain className="h-16 w-16 text-purple-400" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-purple-300 mb-8 border border-purple-500/30">
                <Stethoscope className="h-4 w-4" />
                <span>Specialized Clinical Interventions</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Evidence-Based Treatment Modalities</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                Comprehensive therapeutic services utilizing advanced diagnostic protocols, biomechanical assessment
                methodologies, and evidence-based intervention strategies to optimize physiological function and
                movement efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {clinicalServices.map((service, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-700/50"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                  />
                  <CardContent className="p-8 relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
                        >
                          {service.icon}
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-2xl font-light text-white transition-colors duration-300 group-hover:text-blue-400">
                            {service.title}
                          </h3>
                          <p className="text-gray-300 font-light leading-relaxed text-sm">{service.desc}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pl-22">
                        <h4 className="text-sm font-medium text-gray-200 mb-3">Clinical Modalities:</h4>
                        {service.modalities.map((modality, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span>{modality}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 pl-22">
                        <span className="text-sm font-light">Review Clinical Protocol</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Protocol Section */}
      <section id="treatment-protocol" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-green-900/40" />

        {/* Background Scientific Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-blue-400">
            <defs>
              <pattern id="hexagon" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,2 52,15 52,37 30,50 8,37 8,15" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagon)" />
          </svg>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-green-300 mb-8 border border-green-500/30">
                <Target className="h-4 w-4" />
                <span>Systematic Clinical Approach</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Treatment Protocol Framework</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                A systematic, evidence-based clinical pathway utilizing validated assessment tools, progressive
                intervention strategies, and continuous outcome monitoring to ensure optimal therapeutic results.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {clinicalPathway.map((phase, index) => (
                <div
                  key={index}
                  className="relative group"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  {/* Connection Line */}
                  {index < clinicalPathway.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 z-0" />
                  )}

                  <div className="relative z-10 text-center space-y-6 p-8 rounded-3xl transition-all duration-500 hover:bg-gray-800/90 hover:shadow-xl backdrop-blur-sm border border-gray-700/30">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                        {phase.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {phase.step}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-light text-white group-hover:text-blue-400 transition-colors duration-300">
                        {phase.title}
                      </h3>
                      <p className="text-gray-300 font-light text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Team Section */}
      <section id="clinical-team" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-purple-900/20 to-gray-800" />

        {/* Background Medical Symbols */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4">
            <Award className="h-28 w-28 text-yellow-400" />
          </div>
          <div className="absolute bottom-1/3 left-1/4">
            <Users className="h-32 w-32 text-blue-400" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 px-6 py-3 rounded-full text-sm font-medium text-blue-300 mb-8 border border-blue-500/30">
                <Users className="h-4 w-4" />
                <span>Board-Certified Clinical Specialists</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Clinical Excellence Team</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                Distinguished healthcare professionals with advanced clinical training, specialized certifications, and
                extensive research experience in evidence-based therapeutic interventions and rehabilitation science.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clinicalTeam.map((clinician, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-700/50"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${clinician.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                  />
                  <CardContent className="p-8 text-center space-y-6 relative z-10">
                    <div className="relative">
                      <div
                        className={`w-28 h-28 bg-gradient-to-r ${clinician.gradient} rounded-full mx-auto transition-all duration-300 group-hover:scale-110 flex items-center justify-center text-white text-2xl font-light shadow-lg`}
                      >
                        {clinician.name.split(" ")[0].charAt(0) + clinician.name.split(" ")[1].charAt(0)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-600">
                        <Award className="h-5 w-5 text-yellow-400" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-light text-white group-hover:text-blue-400 transition-colors duration-300">
                          {clinician.name}
                        </h3>
                        <p className="text-blue-400 font-light text-sm mt-1">{clinician.role}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-300 font-light text-sm">{clinician.specialty}</p>
                        <div className="inline-flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300">
                          <Stethoscope className="h-3 w-3" />
                          <span>{clinician.credentials}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-800 to-blue-900/60" />

        {/* Background Research Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4">
            <TrendingUp className="h-24 w-24 text-green-400" />
          </div>
          <div className="absolute bottom-20 right-1/3">
            <Target className="h-20 w-20 text-blue-400" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-6 py-3 rounded-full text-sm font-medium text-orange-300 mb-8 border border-orange-500/30">
                <Star className="h-4 w-4" />
                <span>Clinical Outcomes & Research</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Evidence-Based Case Studies</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                Documented clinical outcomes demonstrating the efficacy of our evidence-based therapeutic interventions
                across diverse patient populations and pathological conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clinicalOutcomes.map((study, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-700/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <CardContent className="p-8 space-y-6 relative z-10">
                    <div className="flex justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-all duration-300 group-hover:scale-110"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-white text-lg mb-1">{study.patient}</h3>
                        <p className="text-blue-400 font-light text-sm">{study.condition}</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-200 mb-2">Clinical Intervention:</h4>
                          <p className="text-gray-300 font-light text-sm leading-relaxed">{study.intervention}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-200 mb-2">Clinical Outcome:</h4>
                          <p className="text-gray-200 font-light text-sm leading-relaxed">{study.outcome}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-700">
                        <div className="inline-flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full text-xs text-green-300 border border-green-500/30">
                          <CheckCircle className="h-3 w-3" />
                          <span>{study.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-green-900/40" />

        {/* Background Medical Equipment */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4">
            <Microscope className="h-32 w-32 text-blue-400" />
          </div>
          <div className="absolute bottom-1/4 right-1/4">
            <Stethoscope className="h-28 w-28 text-purple-400" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-green-300 mb-8 border border-green-500/30">
                <Calendar className="h-4 w-4" />
                <span>Clinical Assessment Scheduling</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Schedule Clinical Consultation</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                Initiate your therapeutic journey through comprehensive clinical assessment and personalized treatment
                protocol development with our board-certified specialists.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="space-y-8">
                  <h3 className="text-2xl font-light text-white text-center">Clinical Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: <Phone className="h-5 w-5" />,
                        label: "Clinical Services",
                        value: "+92 313 7818887",
                        gradient: "from-blue-500 to-cyan-400",
                        desc: "Direct consultation with clinical specialists",
                        href: "tel:00923137818887",
                      },
                      {
                        icon: <Mail className="h-5 w-5" />,
                        label: "Clinical Inquiries",
                        value: "clinical@physiogen.fit",
                        gradient: "from-green-500 to-emerald-400",
                        desc: "Comprehensive clinical information and resources",
                        href: "mailto:clinical@physiogen.fit",
                      },
                      {
                        icon: <MapPin className="h-5 w-5" />,
                        label: "Clinical Facility",
                        value: "123 Medical Plaza, Healthcare District",
                        gradient: "from-purple-500 to-pink-400",
                        desc: "State-of-the-art rehabilitation and assessment center",
                        href: "https://maps.google.com/?q=123+Medical+Plaza+Healthcare+District",
                      },
                    ].map((contact) => (
                      <a
                        key={contact.label}
                        href={contact.href}
                        className="group text-center p-8 rounded-2xl transition-all duration-300 hover:bg-gray-800/90 hover:shadow-lg cursor-pointer backdrop-blur-sm block border border-gray-700/30"
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${contact.gradient} rounded-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg mx-auto mb-6`}
                        >
                          {contact.icon}
                        </div>
                        <div className="space-y-2">
                          <div className="font-light text-white text-lg">{contact.label}</div>
                          <div className="text-gray-300 font-light">{contact.value}</div>
                          <div className="text-gray-400 font-light text-sm">{contact.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden border-t border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-purple-900/95" />

        {/* Background Scientific Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20">
            <Dna className="h-20 w-20 text-white" />
          </div>
          <div className="absolute bottom-10 left-20">
            <Microscope className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="text-3xl font-extralight">Physiogen</div>
            <p className="text-gray-300 font-light max-w-3xl mx-auto text-lg">
              Advancing human movement science through evidence-based clinical practice, innovative therapeutic
              interventions, and comprehensive rehabilitation protocols.
            </p>
            <div className="flex flex-wrap justify-center gap-12 text-gray-300 font-light">
              {[
                "Clinical Services",
                "Treatment Protocol",
                "Clinical Team",
                "Case Studies",
                "Consultation",
                "Privacy Policy",
                "Terms of Service",
              ].map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-white transition-all duration-300 hover:scale-110 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-8 text-gray-400 font-light">
              <p>
                &copy; 2024 Physiogen Clinical Sciences. All rights reserved. Licensed healthcare facility providing
                evidence-based rehabilitation services.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
