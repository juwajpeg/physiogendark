"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
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
  Flower,
  Home,
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

  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Physiogen - Advanced Rehabilitation Science",
    "url": "https://physiogen.fit",
    "logo": "https://physiogen.fit/logo.png",
    "image": "https://physiogen.fit/clinic-image.jpg",
    "description": "Leading rehabilitation science clinic in Lahore, Pakistan. Evidence-based physiotherapy, sports medicine, neurological rehabilitation, and women's health services.",
    "telephone": "+92-313-7818887",
    "email": "contact@physiogen.fit",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "35, Iqbal, Block Commercial FF Bahria Town",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "Pakistan",
      "postalCode": "54000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.363881,
      "longitude": 74.183399
    },
    "openingHours": "Mo-Su 09:00-18:00",
    "priceRange": "$$",
    "medicalSpecialty": [
      "Sports Physiotherapy",
      "Physiotherapy",
      "Sports Medicine",
      "Neurological Rehabilitation",
      "Women's Health",
      "Pediatric Rehabilitation",
      "Orthopedic Rehabilitation"
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. Muhammad Mubarak Janjua",
      "jobTitle": "Founder & CEO",
      "description": "PT, MSSPT - HCPC (UK) Licensed | Bronze Medalist",
      "knowsAbout": ["Sports Physiotherapy", "Sports Injury Rehabilitation", "Athletic Performance Optimization"]
    }
  }

  // Additional structured data for services
  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "about": {
      "@type": "MedicalBusiness",
      "name": "Physiogen",
      "medicalSpecialty": [
        "Sports Physiotherapy",
        "Physiotherapy",
        "Sports Medicine",
        "Neurological Rehabilitation",
        "Women's Health"
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "MedicalProcedure",
            "name": "Sports Physiotherapy",
            "procedureType": "PhysicalTherapy",
            "description": "Specialized sports injury assessment, rehabilitation, and prevention services with advanced techniques for athletes at all levels, delivered by certified sports physiotherapy specialists."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "MedicalProcedure",
            "name": "Musculoskeletal Rehabilitation",
            "procedureType": "PhysicalTherapy",
            "description": "Targeted interventions to restore function and alleviate pain through evidence-based biomechanical and neuromuscular strategies."
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "MedicalProcedure",
            "name": "Neurological & Pediatric Rehabilitation",
            "procedureType": "PhysicalTherapy",
            "description": "Specialized protocols for neurological conditions and pediatric development, using evidence-based neuroplasticity approaches for all ages."
          }
        }
      ]
    }
  }

  // Additional structured data for FAQs
  const faqsStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Physiogen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Physiogen is a leading rehabilitation science clinic in Lahore, Pakistan, offering evidence-based physiotherapy, sports medicine, neurological rehabilitation, and women's health services."
        }
      },
      {
        "@type": "Question",
        "name": "What is Sports Physiotherapy and how can it help athletes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sports Physiotherapy is a specialized branch of physiotherapy focused on helping athletes prevent injuries, recover from sports-related trauma, and optimize performance. Our certified sports physiotherapy specialists use advanced techniques for injury assessment, rehabilitation protocols specifically designed for athletes, and evidence-based methods to facilitate quick and safe return to sport."
        }
      },
      {
        "@type": "Question",
        "name": "What conditions do you treat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We treat a wide range of conditions including sports injuries (like ACL tears, rotator cuff injuries, and tennis elbow), musculoskeletal injuries, neurological disorders, sports injuries, women's health concerns, pediatric development issues, and post-surgical rehabilitation."
        }
      },
      {
        "@type": "Question",
        "name": "How can I schedule an appointment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can schedule an appointment by calling +92-313-7818887 or visiting our facility at 35, Iqbal, Block Commercial FF Bahria Town, Lahore."
        }
      }
    ]
  }

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
      icon: <Award className="h-6 w-6" />,
      title: "Sports & Musculoskeletal Rehabilitation",
      desc: "Comprehensive rehabilitation combining targeted interventions for sports injuries and musculoskeletal conditions using evidence-based techniques.",
      gradient: "from-blue-500 to-cyan-400",
      modalities: ["Sports Injury Rehabilitation", "Joint Mobilization & Manipulation", "Athletic Performance Optimization"],
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Neurological & Pediatric Rehabilitation",
      desc: "Specialized protocols for neurological conditions and pediatric development, using evidence-based neuroplasticity approaches for all ages.",
      gradient: "from-purple-500 to-pink-400",
      modalities: ["Neurodevelopmental Therapy (NDT)", "Pediatric Motor Skills Development", "Sensory Integration Assessment"],
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Home Physiotherapy Sessions",
      desc: "Personalized rehabilitation services delivered in the comfort of your home for patients with mobility limitations or busy schedules.",
      gradient: "from-green-500 to-emerald-400",
      modalities: ["In-Home Clinical Assessment", "Personalized Home Exercise Programs", "Caregiver Training & Support"],
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
      desc: "Functional interventions to improve daily living skills and workplace ergonomics, promoting independence and productivity in everyday activities.",
      gradient: "from-orange-500 to-red-400",
      modalities: ["Activities of Daily Living Training", "Ergonomic Assessments", "Adaptive Equipment Training"],
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Hijama/Cupping Therapy",
      desc: "Traditional therapeutic techniques to enhance circulation, relieve muscle tension, and promote tissue recovery for pain management.",
      gradient: "from-red-500 to-pink-400",
      modalities: ["Wet and Dry Cupping Applications", "Myofascial Release Integration", "Pain Relief Protocols"],
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Dry Needling",
      desc: "Precision-based interventions to address pain, muscle dysfunction, and energy flow through targeted needle therapy for rapid recovery.",
      gradient: "from-indigo-500 to-purple-400",
      modalities: ["Trigger Point Dry Needling", "Acupuncture for Pain Management", "Neuromuscular Stimulation"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Nutrition and Wellness",
      desc: "Holistic nutritional strategies and lifestyle interventions to optimize health, support recovery, and enhance overall well-being for patients.",
      gradient: "from-teal-500 to-cyan-400",
      modalities: ["Personalized Nutritional Assessments", "Dietary Supplementation Guidance", "Lifestyle Coaching"],
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Obesity and Weight Management",
      desc: "Evidence-based weight management programs combining physiotherapy, nutrition science, and behavioral interventions for sustainable results.",
      gradient: "from-blue-500 to-green-400",
      modalities: ["Metabolic Assessment", "Exercise Prescription", "Behavioral Modification Coaching"],
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
      name: "Dr. Taseen Mansoor",
      role: "Neuro Rehabilitation Specialist",
      specialty: "Neurological Conditions | Lower Back Specialist | Hijama",
      credentials: "Chiropractic Techniques & KT Taping Expert",
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
      specialty: "Women's Health | Pediatric Physical Therapy",
      credentials: "Clinical Rehabilitation & Movement Science",
      gradient: "from-purple-500 to-pink-500",
      image: "/Bisma.svg",
      tagline: "Restoring Function with Compassionate Care",
    },
    {
      name: "Dr. Muhammad Mubarak Janjua, PT, MSSPT",
      role: "Founder & CEO – Physiogen | Sports Physiotherapy Specialist",
      specialty: "Sports Physiotherapy | Athletic Performance | Rehabilitation",
      credentials: "HCPC (UK) Licensed | Bronze Medalist | Certified Sports Physiotherapist",
      gradient: "from-orange-500 to-red-500",
      tagline: "Expert in Sports Injury Rehabilitation and Athletic Performance Optimization",
      image: "/muhammad.svg",
    },
  ]

  // Static case studies data
  const clinicalOutcomes = [
    {
      title: "Post-Surgical ACL Reconstruction Recovery",
      Demographics: "Male, 24 years, Professional Athlete",
      "Doctors notes": "Complete recovery with return to professional sports within 6 months. Achieved 98% strength symmetry and full functional capacity.",
      id: "CS000001"
    },
    {
      title: "Chronic Lower Back Pain Management",
      Demographics: "Female, 42 years, Office Worker",
      "Doctors notes": "Significant pain reduction and improved functional capacity through targeted core strengthening and ergonomic modifications.",
      id: "CS000002"
    },
    {
      title: "Pediatric Cerebral Palsy Motor Development",
      Demographics: "Female, 8 years, Student",
      "Doctors notes": "Remarkable improvement in gross motor skills and functional independence through consistent neurodevelopmental therapy.",
      id: "CS000003"
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* SEO Head Content */}
      <Head>
        <title>Physiogen - Sports Physiotherapy & Rehabilitation Science Specialists | Lahore, Pakistan</title>
        <meta name="description" content="Leading sports physiotherapy and rehabilitation science clinic in Lahore, Pakistan. Specialized sports injury assessment and rehabilitation by certified sports physio specialists. 15+ years of clinical excellence with 98% treatment efficacy." />
        <meta name="keywords" content="sports physiotherapy Lahore, sports injury rehabilitation, sports medicine, athletic performance optimization, return-to-play assessment, physiotherapy Pakistan, rehabilitation science, neurological rehabilitation, women's health physiotherapy, evidence-based treatment" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://physiogen.fit" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Physiogen - Sports Physiotherapy & Rehabilitation Science Specialists" />
        <meta property="og:description" content="Leading sports physiotherapy clinic in Lahore, Pakistan. Specialized sports injury rehabilitation by certified specialists with advanced techniques for athletes at all levels." />
        <meta property="og:url" content="https://physiogen.fit" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://physiogen.fit/clinic-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Physiogen - Sports Physiotherapy Specialists" />
        <meta name="twitter:description" content="Leading sports physiotherapy clinic in Lahore with certified specialists for sports injury rehabilitation and athletic performance optimization." />
        <meta name="twitter:image" content="https://physiogen.fit/clinic-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsStructuredData) }}
        />
      </Head>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
                
                {/* Promotional Banner */}
                <div 
                  className="mt-8 mb-6 py-3 px-6 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm border-y border-yellow-500/20 relative overflow-hidden group transition-all duration-500 hover:border-yellow-500/40"
                  style={{ transform: `translateY(${scrollY * 0.04}px)` }}
                >
                  {/* Background glow elements */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/5 via-yellow-300/5 to-yellow-500/5 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
                  <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -left-12 -top-12 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
                  
                  {/* Promotional message */}
                  <div className="relative z-10 flex items-center justify-center">
                    <span className="text-base sm:text-lg md:text-xl font-light text-center">
                      <span className="text-yellow-300 font-medium">Limited Time:</span>{" "}
                      <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent font-medium">
                        10% Off All Services
                      </span>{" "}
                      <span className="text-gray-300">|</span>{" "}
                      <span className="text-blue-300">Monday - Wednesday</span>
                    </span>
                  </div>
                </div>

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
                <a href="tel:03137818887" className="w-full sm:w-auto flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Phone className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    Home Visit
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
              {/* Promotional Card */}
              <Card className="group border-0 bg-gradient-to-br from-gray-900/90 via-blue-900/20 to-purple-900/30 backdrop-blur-sm hover:bg-gray-800 transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden relative shadow-2xl border border-blue-500/30 order-first lg:order-3 animate-pulse-subtle">
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-medium px-4 py-1 text-xs uppercase tracking-wider transform rotate-0 origin-top-right">
                    Limited Time
                  </div>
                </div>
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
                <CardContent className="p-8 relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                        <Calendar className="h-6 w-6" />
                      </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-light text-white transition-colors duration-300 group-hover:text-blue-400">
                        Special Offer
                      </h3>
                      <div className="text-3xl font-semibold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                        10% OFF
                      </div>
                      <p className="text-gray-300 font-light leading-relaxed text-sm">
                        Enjoy a special discount on all our services every Monday, Tuesday, and Wednesday.
                      </p>
                    </div>

                    <div className="pt-4">
                      <a href="tel:03137818887" className="block w-full">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 group-hover:scale-105 shadow-lg">
                          <Phone className="mr-2 h-4 w-4" />
                          Book Your Session
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                        <Image
                          src={clinician.image}
                          alt={`${clinician.name} - Physiogen Clinical Specialist`}
                          width={112}
                          height={112}
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
                Documented clinical outcomes from our sports physiotherapy specialists demonstrating the efficacy of our evidence-based therapeutic interventions
                across diverse athletic populations and sports-related injuries.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Comment out the old rendering */}
              {/* {clinicalOutcomes.map((study, index) => ( ... ))} */}

              {/* Render fetched case studies */}
              {clinicalOutcomes.map((study, index) => (
                <Card
                  key={study.id || index}
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
                        <h3 className="font-medium text-white text-lg mb-1">{study.title}</h3>
                        <p className="text-blue-400 font-light text-sm">{study.Demographics}</p>
                      </div>
                      {study["Doctors notes"] && (
                        <div className="pt-4 border-t border-gray-800">
                          <div className="text-gray-300 font-light text-sm">
                            <span className="font-medium text-gray-200">Doctor&apos;s Notes: </span>
                            {study["Doctors notes"]}
                          </div>
                        </div>
                      )}
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
