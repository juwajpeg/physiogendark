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
  Heart,
  Shield,
  Calendar,
  ArrowRight,
  Star,
  Users,
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Brain,
  Microscope,
  Dna,
  Stethoscope,
  Globe,
  MessageCircle,
  Baby,
  Flower,
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

      // Keep header visible on all devices for floating effect
      setHeaderVisible(true)

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
      desc: "Targeted interventions to restore function and alleviate pain through evidence-based biomechanical and neuromuscular strategies.",
      gradient: "from-blue-500 to-cyan-400",
      modalities: ["Joint Mobilization and Manipulation", "Corrective Exercise Programming", "Postural and Gait Analysis"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Neurological Rehabilitation",
      desc: "Specialized protocols to enhance motor function and developmental outcomes in neurological conditions using tailored neuroplasticity-focused approaches.",
      gradient: "from-purple-500 to-pink-400",
      modalities: ["Neurodevelopmental Therapy (NDT)", "Functional Movement Training", "Sensory Integration Techniques"],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Sports and Athletic Performance",
      desc: "Sport-specific conditioning and biomechanical optimization to maximize performance, improve efficiency, and reduce injury risk.",
      gradient: "from-green-500 to-emerald-400",
      modalities: ["Sport-Specific Strength and Conditioning", "Biomechanical Movement Analysis", "Agility and Power Training Protocols"],
    },
    {
      icon: <Baby className="h-6 w-6" />,
      title: "Pediatric Rehabilitation",
      desc: "Specialized therapeutic interventions for children and adolescents to support optimal development, motor skills, and functional independence.",
      gradient: "from-yellow-500 to-orange-400",
      modalities: ["Developmental Milestone Assessment", "Motor Skills Development", "Family-Centered Care Planning"],
    },
    {
      icon: <Flower className="h-6 w-6" />,
      title: "Women's Health Physiotherapy",
      desc: "Comprehensive pelvic health and women's wellness services addressing pregnancy, postpartum recovery, and women-specific conditions.",
      gradient: "from-pink-500 to-rose-400",
      modalities: ["Pelvic Floor Rehabilitation", "Prenatal and Postpartum Care", "Women's Wellness Programs"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Occupational Therapy",
      desc: "Functional interventions to improve daily living skills and workplace ergonomics, promoting independence and productivity.",
      gradient: "from-orange-500 to-red-400",
      modalities: ["Activities of Daily Living (ADL) Training", "Ergonomic Assessments and Modifications", "Adaptive Equipment Training"],
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Hijama/Cupping Therapy",
      desc: "Traditional therapeutic techniques to enhance circulation, relieve muscle tension, and promote tissue recovery.",
      gradient: "from-red-500 to-pink-400",
      modalities: ["Wet and Dry Cupping Applications", "Myofascial Release Integration", "Pain and Stress Relief Protocols"],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Dry Needling",
      desc: "Precision-based interventions to address pain, muscle dysfunction, and energy flow through targeted needle therapy.",
      gradient: "from-indigo-500 to-purple-400",
      modalities: ["Trigger Point Dry Needling", "Acupuncture for Pain Management", "Neuromuscular Stimulation Techniques"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Nutrition and Wellness",
      desc: "Holistic nutritional strategies and lifestyle interventions to optimize health, support recovery, and enhance overall well-being.",
      gradient: "from-teal-500 to-cyan-400",
      modalities: ["Personalized Nutritional Assessments", "Dietary Supplementation Guidance", "Lifestyle and Wellness Coaching"],
    },
  ]

  const clinicalPathway = [
    {
      step: "01",
      title: "Appointment",
      desc: "Schedule a visit to start your personalized care journey.",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      step: "02",
      title: "Consultation & Assessment",
      desc: "Thorough evaluation with a physical exam and validated tools to understand your needs.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      step: "03",
      title: "Treatment & Exercise Therapy",
      desc: "Customized treatment plans with targeted therapies and exercises designed for you.",
      icon: <Activity className="h-6 w-6" />,
    },
    {
      step: "04",
      title: "Outcome Monitoring",
      desc: "Ongoing tracking and adjustments to ensure lasting improvements and healthy habits.",
      icon: <TrendingUp className="h-6 w-6" />,
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
      name: "Dr. Bisma Khan, DPT",
      role: "Outpatient Physiotherapy Specialist",
      specialty: "Women’s Health | Pediatric Physical Therapy",
      credentials: "Clinical Rehabilitation & Movement Science",
      gradient: "from-purple-500 to-pink-500",
      image: "/Bisma.svg",
      tagline: "Restoring Function with Compassionate Care",
    },
    {
      name: "Dr. Muhammad Mubarak Janjua, PT, MSSPT",
      role: "Founder & CEO – Physiogen",
      specialty: "Sports & Orthopedic Physiotherapy | OPD Rehabilitation",
      credentials: "HCPC (UK) Licensed | Bronze Medalist",
      gradient: "from-orange-500 to-red-500",
      tagline: "Optimizing Athletic Performance and Recovery through Movement, Psychology, and Lifestyle Science",
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
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Scientific Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* DNA Helix Pattern */}
        <div className="absolute top-20 right-10 opacity-5">
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
        <div className="absolute bottom-20 left-10 opacity-5">
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
        <div className="absolute top-1/2 left-1/4 opacity-5">
          <svg width="400" height="200" viewBox="0 0 400 200" className="text-purple-400">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={20 + (i * 19) % 380}
                cy={10 + (i * 9.5) % 180}
                r="3"
                fill="currentColor"
                opacity="0.6"
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <line
                key={i}
                x1={25 + (i * 25) % 375}
                y1={15 + (i * 12) % 185}
                x2={50 + (i * 23) % 350}
                y2={20 + (i * 10) % 180}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        {/* Anatomical Grid */}
        <div className="absolute inset-0 opacity-3">
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
        className="fixed inset-0 opacity-10 pointer-events-none transition-all duration-1000 z-10"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`,
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
        className={`fixed top-2 left-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-7xl bg-black/30 backdrop-blur-2xl z-40 transition-all duration-500 rounded-2xl border border-white/10 shadow-2xl ${
          headerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          boxShadow: '0 0 24px 4px rgba(59,130,246,0.25), 0 8px 32px 0 rgba(0,0,0,0.37)',
          animation: headerVisible ? 'float 6s ease-in-out infinite' : 'none',
        }}
      >
        {/* Glow pseudo-element */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl z-[-1]" style={{
          boxShadow: '0 0 40px 10px rgba(59,130,246,0.25), 0 0 80px 20px rgba(168,85,247,0.15)',
          filter: 'blur(4px)',
        }} />
        <div className="px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="#home"
              className="text-lg md:text-xl font-light text-white transition-all duration-300 hover:text-blue-400 relative group"
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Physiogen</span>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto">
              {[
                "Clinical Services",
                "Treatment Protocol",
                "Clinical Team",
                "Case Studies",
                "Location",
                "Consultation",
              ].map((item, index) => (
                  <Link
                    key={item}
                    href={item === "Case Studies" ? "/clinical-case-studies" : `#${item.toLowerCase().replace(" ", "-")}`}
                    className={`text-gray-200 hover:text-white transition-all duration-300 font-light relative group text-sm md:text-base px-2 md:px-3 py-1 md:py-2 rounded-lg hover:bg-white/10 ${
                      activeSection === index + 1 ? "text-white bg-white/20" : ""
                    }`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ),
              )}
              <a href="tel:00923137818887">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 md:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs md:text-sm shadow-lg">
                  Schedule Assessment
                </Button>
              </a>
            </nav>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 transition-transform duration-300 hover:scale-110 text-white hover:bg-white/20 rounded-xl bg-white/10 backdrop-blur-sm"
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
            <nav className="py-2 space-y-2 bg-black/20 backdrop-blur-sm rounded-xl mx-0 mb-2 p-2">
              {[
                "Clinical Services",
                "Treatment Protocol",
                "Clinical Team",
                "Case Studies",
                "Location",
                "Consultation",
              ].map((item) => (
                  <Link
                    key={item}
                    href={item === "Case Studies" ? "/clinical-case-studies" : `#${item.toLowerCase().replace(" ", "-")}`}
                    className="block text-gray-200 hover:text-white transition-all duration-300 font-light transform hover:translate-x-2 text-sm md:text-base px-4 py-3 rounded-lg hover:bg-white/20 active:bg-white/30"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ),
              )}
              <a href="tel:00923137818887" className="block mt-2">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full w-full transition-all duration-300 hover:scale-105 text-xs md:text-sm shadow-lg py-3">
                  Schedule Assessment
                </Button>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />

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

                <div
                  className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1000 ease-out delay-300 space-y-4"
                  style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                >
                  <p>
                    Imagine a life where pain doesn’t hold you back—a life where you can move freely, stay active, and enjoy every moment.
                  </p>
                  <p>
                    At Physiogen, we’re making that life a reality.
                  </p>
                </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="https://wa.me/923137818887" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <MessageCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    Appointment
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
        </div>
      </section>

      {/* Clinical Services Section */}
      <section id="clinical-services" className="py-32 relative">
        <div className="absolute inset-0 bg-black" />

        {/* Background Medical Icons */}
        <div className="absolute inset-0 opacity-5">
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
                Complete healthcare services using modern diagnostic tools, detailed movement analysis, and proven treatment methods to improve body function and mobility effectively.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clinicalServices.map((service, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-800/50"
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
        <div className="absolute inset-0 bg-black" />

        {/* Background Scientific Pattern */}
        <div className="absolute inset-0 opacity-5">
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
                We use a simple, evidence-based process to help you achieve optimal health outcomes.
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

                  <div className="relative z-10 text-center space-y-6 p-8 rounded-3xl transition-all duration-500 hover:bg-gray-900/90 hover:shadow-xl backdrop-blur-sm border border-gray-800/30">
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
        <div className="absolute inset-0 bg-black" />

        {/* Background Medical Symbols */}
        <div className="absolute inset-0 opacity-5">
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
                  className="group border-0 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-800/50"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${clinician.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                  />
                  <CardContent className="p-8 text-center space-y-6 relative z-10">
                    <div className="relative">
                      {clinician.image ? (
                        <img
                          src={clinician.image}
                          alt={clinician.name}
                          className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-110 transition-all duration-300"
                        />
                      ) : (
                        <div
                          className={`w-28 h-28 bg-gradient-to-r ${clinician.gradient} rounded-full mx-auto transition-all duration-300 group-hover:scale-110 flex items-center justify-center text-white text-2xl font-light shadow-lg`}
                        >
                          {clinician.name.split(" ")[0].charAt(0) + clinician.name.split(" ")[1].charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-lg border border-gray-700">
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
                        <div className="inline-flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-300">
                          <Stethoscope className="h-3 w-3" />
                          <span>{clinician.credentials}</span>
                        </div>
                        {clinician.tagline && (
                          <div className="text-pink-300 font-light text-xs mt-2">{clinician.tagline}</div>
                        )}
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
        <div className="absolute inset-0 bg-black" />

        {/* Background Research Elements */}
        <div className="absolute inset-0 opacity-5">
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
                  className="group border-0 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-xl border border-gray-800/50"
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

                      <div className="pt-4 border-t border-gray-800">
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
            <div className="pt-6 flex justify-center">
              <Link href="/clinical-case-studies" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-white font-light">
                <Star className="h-4 w-4" />
                <span>View All Case Studies</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="location" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        {/* Background Location Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4">
            <MapPin className="h-24 w-24 text-green-400" />
          </div>
          <div className="absolute bottom-20 right-1/3">
            <Globe className="h-20 w-20 text-blue-400" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full text-sm font-medium text-green-300 mb-8 border border-green-500/30">
                <MapPin className="h-4 w-4" />
                <span>Clinical Facility Location</span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-6">Find Our Clinical Center</h2>
              <p className="text-xl text-gray-300 font-light max-w-4xl mx-auto">
                Visit our state-of-the-art rehabilitation facility equipped with advanced diagnostic equipment and
                therapeutic technologies for comprehensive patient care.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Map Container */}
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 bg-gray-900">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.8223532205843!2d74.18339907602493!3d31.363881074286063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff652783aa4f%3A0x45021e950cf121fd!2sPhysiogen!5e0!3m2!1sen!2s!4v1752233570667!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl pointer-events-none" />
              </div>

              {/* Location Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light text-white">Physiogen Clinical Center</h3>
                  <p className="text-gray-300 font-light leading-relaxed">
                    Our comprehensive rehabilitation facility features cutting-edge diagnostic equipment, therapeutic
                    modalities, and specialized treatment areas designed to provide optimal clinical outcomes.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <MapPin className="h-5 w-5" />,
                      label: "Address",
                      value: "35, Iqbal, Block Commercial FF Bahria Town",
                      subtext: "Lahore, Punjab, Pakistan",
                      gradient: "from-green-500 to-emerald-400",
                    },
                    {
                      icon: <Phone className="h-5 w-5" />,
                      label: "Phone",
                      value: "+92 313 7818887",
                      subtext: "24/7 Clinical Support",
                      gradient: "from-blue-500 to-cyan-400",
                    },
                    {
                      icon: <Mail className="h-5 w-5" />,
                      label: "Email",
                      value: "contact@physiogen.fit",
                      subtext: "Clinical Inquiries & Appointments",
                      gradient: "from-purple-500 to-pink-400",
                    },
                  ].map((detail) => (
                    <div key={detail.label} className="flex items-start space-x-4 group">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${detail.gradient} rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 shadow-lg flex-shrink-0`}
                      >
                        {detail.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-400">{detail.label}</div>
                        <div className="text-white font-light">{detail.value}</div>
                        <div className="text-gray-400 font-light text-sm">{detail.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <a
                    href="https://maps.app.goo.gl/5rAeDDyEprsv5TUs8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg text-white font-light"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Get Directions</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        {/* Background Medical Equipment */}
        <div className="absolute inset-0 opacity-5">
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
                        value: "contact@physiogen.fit",
                        gradient: "from-green-500 to-emerald-400",
                        desc: "Comprehensive clinical information and resources",
                        href: "mailto:contact@physiogen.fit",
                      },
                      {
                        icon: <MapPin className="h-5 w-5" />,
                        label: "Clinical Facility",
                        value: "35, Iqbal, Block Commercial FF Bahria Town",
                        gradient: "from-purple-500 to-pink-400",
                        desc: "State-of-the-art rehabilitation and assessment center",
                        href: "https://maps.app.goo.gl/5rAeDDyEprsv5TUs8",
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
      <footer className="py-20 bg-black text-white relative overflow-hidden border-t border-gray-800/50">
        <div className="absolute inset-0 bg-black" />

        {/* Background Scientific Elements */}
        <div className="absolute inset-0 opacity-5">
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
                "Location",
                "Consultation",
              ].map((item) => (
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
