/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import {
  Home,
  User,
  Briefcase,
  Mail,
  Moon,
  Sun,
  MessageCircle,
  Facebook,
  Linkedin,
  ExternalLink,
  CheckCircle,
  GraduationCap,
  Award,
  ArrowRight,
  Send,
  Menu,
  X,
  TrendingUp,
  Target,
  Code,
  Share2,
  Copy,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Calendar,
  ThumbsUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Portfolio Sections Anchor IDs
const NAV_LINKS = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Experience", href: "#experience", icon: TrendingUp },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function App() {
  // Theme state manager
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email copying utility state
  const [copied, setCopied] = useState(false);

  // Contact/Inquiry Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("Meta Marketing Suite");
  const [formBudget, setFormBudget] = useState("৳15,000 - ৳50,000");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quick stats counter triggers (visual only)
  const stats = [
    { value: "2+", label: "Years Experience", suffix: "Hands-on" },
    { value: "3.5x+", label: "Avg. ROAS Achieved", suffix: "Paid Campaigns" },
    { value: "৳4.5M+", label: "Ad Spend Managed", suffix: "Local Businesses" },
    { value: "100%", label: "Mobile-optimized", suffix: "Web Architectures" },
  ];

  // Academic data
  const academics = [
    {
      degree: "Honours 2nd Year (Ongoing)",
      institution: "Sylhet Govt. Alia Madrasah",
      metric: "Active Student",
      year: "Current",
      desc: "Balancing academic studies with real-world digital marketing and software development consultancy.",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600"
    },
    {
      degree: "Alim / HSC (2024)",
      institution: "Sylhet Govt. Alia Madrasah",
      metric: "GPA 4.50",
      year: "2024",
      desc: "Completed secondary high-level curriculum with a major focus on humanities and classical linguistics.",
      icon: Award,
      color: "from-blue-600 to-cyan-500"
    },
    {
      degree: "Dakhil / SSC (2022)",
      institution: "Board of Intermediate & Secondary Education",
      metric: "GPA 4.78",
      year: "2022",
      desc: "Outstanding analytical foundation with high-tier grades in mathematics and core science modules.",
      icon: CheckCircle,
      color: "from-indigo-500 to-pink-500"
    }
  ];

  // Services data
  const services = [
    {
      title: "Meta Marketing Suite",
      description: "Laser-targeted Facebook and Instagram ad campaigns optimized for direct conversions, high-intent lead generation, remarketing loops, and localized demographic brand awareness.",
      features: ["Custom Audience Retention", "Lookalike Modeling (LAL)", "ROAS Audit & Scaling", "Scroll-stopping Ad Copywriting"],
      techBadge: "Meta Ads Manager",
      growthHook: "Propel F-commerce sales in Bangladesh's thriving digital consumer markets.",
      icon: Target,
      accent: "blue"
    },
    {
      title: "TikTok Ads & Shortform",
      description: "Engaging, trend-driven video campaigns engineered to capture Gen Z and young millennial demographics, leveraging organic-style content that bypasses banner blindness.",
      features: ["Content Hook Strategy", "UGC Directing & Styling", "Spark Ads Configuration", "Viral Trend Integration"],
      techBadge: "TikTok Business Suite",
      growthHook: "Drive impulse sales and high-tempo interaction through dynamic short video content.",
      icon: Share2,
      accent: "pink"
    },
    {
      title: "Google Ads (SEM)",
      description: "Strategic Search Engine Marketing (SEM) layouts matching search queries to solutions. Capture high-intent desktop and mobile buyers precisely at the point of decision.",
      features: ["High-intent Keyword Research", "Ad Extension Architecture", "Competitor Bidding Tactics", "Negative Keyword Scrubbing"],
      techBadge: "Google Ads Engine",
      growthHook: "Maximize Search Share and outpace standard listing competition locally.",
      icon: TrendingUp,
      accent: "yellow"
    },
    {
      title: "Modern Web Development",
      description: "Sleek, secure, and mobile-first frontend architectures designed for rapid load performance across low-bandwidth connections. Highly optimized for conversion conversions.",
      features: ["Responsive Corporate Portfolios", "E-commerce Frontends", "Intuitive Lead Capture Landers", "Lightweight Asset Footprint"],
      techBadge: "React / Tailwind / Vite",
      growthHook: "Fast-loading landing pages built to convert high-traffic digital ad campaigns.",
      icon: Code,
      accent: "indigo"
    }
  ];

  // Professional history data
  const timeline = [
    {
      role: "Operations Team Member",
      company: "learningfacility.co.uk",
      duration: "2025 – Present",
      type: "Remote / Global Support",
      description: "Spearheading standard operating procedures, structural digital updates, and operational flows. Managing cross-functional project queues and ensuring prompt student delivery standard.",
      achievements: [
        "Architected standard workflow metrics for client coordination.",
        "Facilitated integration of customer communication templates."
      ]
    },
    {
      role: "Digital Growth & Operations",
      company: "TheKidsNest",
      duration: "Ongoing",
      type: "Remote / Strategy",
      description: "Consulting on organic and paid traffic acquisition. Auditing social layouts, ad dashboards, and designing conversion-first landing environments for higher sales engagement.",
      achievements: [
        "Boosted customer funnel efficiency through copy reviews.",
        "Refined ad targeting parameters resulting in higher CTR."
      ]
    },
    {
      role: "Operations & Client Relations",
      company: "GK AIR INTERNATIONAL & ATIK ENTERPRISE",
      duration: "2021 – 2025",
      type: "On-site / Corporate",
      description: "Managed logistics coordination, client intakes, official communications, and digital record compliance. Served as the tech anchor introducing cloud file structures to paper-based operations.",
      achievements: [
        "Spearheaded CRM transition to manage passenger details.",
        "Ensured zero-error documentation compliance across thousands of global client profiles."
      ]
    }
  ];

  // Theme synchronization
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Handle email copying
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("emrandmd368@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Form submit handler (Simulation)
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // reset form
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* HEADER & STICKY NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85 transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo / Brand */}
          <a href="#home" className="group flex items-center gap-2 first-letter:text-blue-600">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-400">
              Imran Ahmed
            </span>
            <span className="hidden rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 md:inline-block">
              Marketing & Dev
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Vertical Split Line */}
            <span className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Light/Dark Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4.5 w-4.5 text-amber-500 animate-spin-slow" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-indigo-600" />
              )}
            </button>

            {/* Contact Bridge Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <span>Work With Me</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              aria-label="Toggle theme toggle mobile"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-600" />
              )}
            </button>

            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-1 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden"
          >
            <div className="space-y-1.5 px-4 pt-3 pb-5">
              {NAV_LINKS.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <a
                  href="https://wa.me/8801330862469"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION (#home) */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 md:py-24 lg:py-32">
        
        {/* Decorative Grid and Backgrounds */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(100%_40%_at_50%_0%,rgba(59,130,246,0.07)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(100%_40%_at_50%_0%,rgba(59,130,246,0.12)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute top-0 right-0 left-0 -z-10 h-96 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_80%,#00000000_100%)] opacity-20 dark:opacity-5" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            
            {/* Left Hero Text Column */}
            <div className="space-y-6 lg:col-span-7">
              
              {/* Specialized Market Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-500" />
                <span>Ready to scale your business</span>
              </div>

              {/* Principal Brand Heading */}
              <div className="space-y-3">
                <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-none">
                  Hello, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400">Imran Ahmed</span>
                </h1>
                
                {/* Titles Subheading Tagline */}
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-base font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                  <span className="text-blue-600 dark:text-blue-400">Digital Marketer</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-indigo-600 dark:text-indigo-400">SEO Specialist</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Growth Strategist</span>
                </p>
              </div>

              {/* Crucial Context & Statistics Driven Subheading */}
              <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Driving Growth in Bangladesh’s <span className="font-semibold text-slate-900 dark:text-white">$6.78 Billion</span> E-commerce & F-commerce Ecosystem through high-ROAS paid advertising and conversion-rate-focused web design.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                
                {/* WhatsApp primary hook */}
                <a
                  href="https://wa.me/8801330862469"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400 fill-emerald-400/20 group-hover:scale-110 transition-transform" />
                  <span>Book Strategy Session</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </a>

                {/* Secondary visual services jump */}
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
                >
                  <span>Explore Services</span>
                </a>

              </div>

              {/* Social Channels Minimal Container */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Direct Connects</span>
                <div className="flex gap-2">
                  <a
                    href="https://www.facebook.com/imranahmedfacebook/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    title="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:emrandmd368@gmail.com"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    title="Send Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Graphic Frame Column */}
            <div className="relative lg:col-span-5">
              
              {/* Outer Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-3xl opacity-60 dark:from-blue-400/20 dark:to-indigo-400/20" />

              <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                
                {/* Visual Browser Header Mockup */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-850 xs:px-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-green-450" />
                  </div>
                  <span className="rounded bg-slate-100 px-3 py-1 font-mono text-[10px] text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    imran_dashboard.active
                  </span>
                  <div className="opacity-0 w-8" />
                </div>

                {/* Banner Image Frame */}
                <div className="relative overflow-hidden rounded-xl bg-slate-950 aspect-[16/10] mt-3 group">
                  <img
                    src="/image_3b9f29.jpg"
                    alt="Digital marketing strategy workflow of Imran Ahmed"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Banner overlay tags */}
                  <div className="absolute right-3 bottom-3 left-3 flex flex-wrap gap-2 justify-between items-end">
                    <div className="rounded-lg bg-black/40 backdrop-blur-md p-2.5 border border-white/10">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-slate-300">Strategy Focus</p>
                      <p className="text-xs font-bold text-white">Full-Funnel Commerce Marketing</p>
                    </div>
                    <div className="rounded-lg bg-blue-600/90 text-white font-mono text-[10px] font-bold px-2 py-1">
                      LIVE IN BANGLADESH
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic decorative hover micro cards */}
              <div className="absolute -top-6 -left-6 hidden xl:block rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 max-w-[190px]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Conversion Boost</h4>
                    <p className="text-[10px] text-slate-400">Meta Ads Strategy</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 hidden xl:block rounded-xl border border-slate-150 bg-slate-900 p-3.5 text-white shadow-xl dark:bg-blue-950 max-w-[200px]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white leading-none">
                    ⭐
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">2+ Years Matrix</h4>
                    <p className="text-[10px] text-blue-200">Local & Remote Client Growth</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* METRICS ROW (Structured grid under hero) */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800/80 dark:bg-slate-900 transition-all">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="space-y-1 text-center border-r last:border-0 border-slate-100 dark:border-slate-800 pr-2 last:pr-0 md:text-left md:pl-6 first:pl-0"
                >
                  <p className="font-display text-2xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    {stat.suffix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ABOUT / NARRATIVE BIO SECTION (#about) */}
      <section id="about" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-b border-slate-200/60 dark:border-slate-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              About Imran Ahmed
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Syndicating High-Impact Marketing with Practical Technology
            </p>
            <div className="mt-3 h-1 w-12 bg-blue-600 rounded" />
          </div>

          {/* Interactive grid: Bio, headshot, academics */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Desktop Avatar and Academic Micro Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Headshot layout with premium styling */}
              <div className="relative mx-auto max-w-[340px] lg:mx-0">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-20 blur-lg dark:opacity-40" />
                <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-slate-900 p-1 shadow-xl dark:border-slate-800">
                  <img
                    src="/image_3b9f7f.jpg"
                    alt="Imran Ahmed Professional Portrait Headshot"
                    className="h-full w-full rounded-xl object-cover grayscale-1/10 hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Base overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/85 backdrop-blur-md p-3 border border-white/10 text-center">
                    <p className="text-xs font-bold text-white">IMRAN AHMED</p>
                    <p className="font-mono text-[9px] tracking-wider text-slate-400">Based in Sylhet, Bangladesh 🇧🇩</p>
                  </div>
                </div>
              </div>

              {/* Meta details */}
              <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>The Localized Advantage</span>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                  By matching high-tempo social targeting configurations with specific local consumer behavior in Bangladesh, I bridge the digital gap, scaling e-commerce transactions across Sylhet, Dhaka, and nationwide.
                </p>
              </div>

            </div>

            {/* Right Narrative Bio Core */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Interactive Bio statement card */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  I am a results-driven <strong>Digital Marketer, SEO Specialist, and Web Developer</strong> based in Sylhet, Bangladesh. With over two years of hands-on experience spearheading social media marketing and growth strategies, I partner with both agile startups and established brands to transform their digital presence into measurable business growth.
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-4">
                  Operating at the forefront of modern digital commerce, I leverage deep insight into localized market dynamics to build fast, mobile-friendly websites tailored to scale businesses and capture market intent. I understand that a site shouldn't just look spectacular; it must load lightning-fast across weak mobile connections and actively convert passive web social traffic into loyal customers.
                </p>
              </div>

              {/* Academic Metrics Header */}
              <div className="border-t border-slate-200/80 pt-6 dark:border-slate-800">
                <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Academic Foundations</span>
                </h3>

                {/* Academic Metrics Custom Grid */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {academics.map((academic, index) => {
                    const AcademicIcon = academic.icon;
                    return (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                      >
                        {/* Colorful top-bar decoration */}
                        <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${academic.color}`} />
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                              {academic.year}
                            </span>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                              {academic.metric}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 transition-colors">
                              {academic.degree}
                            </h4>
                            <p className="text-[10px] text-slate-400 leading-none">
                              {academic.institution}
                            </p>
                          </div>

                          <p className="text-[10px] text-slate-500 leading-normal dark:text-slate-400">
                            {academic.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES & SERVICES (#services) */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Headline */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Solutions Configured for Conversions
            </h2>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              Transforming standard ad budgets into premium business revenue pipelines. I map out custom strategies for both remote platforms and regional F-commerce storefronts.
            </p>
            <div className="mt-3 h-1 w-12 bg-blue-600 rounded" />
          </div>

          {/* Structured Service Card Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              
              // Local layout constants depending on accent settings
              const styles = {
                blue: "border-blue-100 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-900 bg-blue-50/5 hover:bg-white",
                pink: "border-pink-100 hover:border-pink-300 dark:border-slate-800 dark:hover:border-pink-900 bg-pink-50/5 hover:bg-white",
                yellow: "border-amber-100 hover:border-amber-300 dark:border-slate-800 dark:hover:border-amber-900 bg-amber-50/5 hover:bg-white",
                indigo: "border-indigo-100 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-900 bg-indigo-50/5 hover:bg-white"
              }[service.accent as 'blue' | 'pink' | 'yellow' | 'indigo'];

              const iconStyles = {
                blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                pink: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
                yellow: "bg-amber-105 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
                indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
              }[service.accent as 'blue' | 'pink' | 'yellow' | 'indigo'];

              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between rounded-xl border p-6 transition-all duration-300 hover:shadow-xl dark:bg-slate-900/40 ${styles}`}
                >
                  <div className="space-y-4">
                    
                    {/* Header of service */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${iconStyles}`}>
                        <ServiceIcon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {service.techBadge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Bullet capabilities */}
                    <div className="space-y-2 pt-2 border-t border-slate-100/80 dark:border-slate-800/60">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tactical Implementations</p>
                      <ul className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-305">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 font-medium">
                            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Context localized hook */}
                  <div className="mt-6 rounded-lg bg-slate-50 p-3.5 dark:bg-slate-950/60 border border-slate-150/50 dark:border-slate-850">
                    <p className="text-[11px] font-medium text-slate-705 dark:text-slate-405 leading-relaxed">
                      💡 <span className="italic">{service.growthHook}</span>
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Core framework / tech stack callout */}
          <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg shadow-blue-500/10">
            <div className="grid gap-6 md:grid-cols-3 items-center">
              <div className="md:col-span-2 space-y-2">
                <h4 className="font-display text-xl font-bold">Need a bespoke technical landing page built from scratch?</h4>
                <p className="text-sm text-blue-100 max-w-xl">
                  I combine light, lightning-fast static setups with custom layouts so that your users get direct access to landing page metrics with absolutely zero friction.
                </p>
              </div>
              <div className="text-right md:text-right first-letter-capitalized justify-self-start sm:justify-self-end">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition-all hover:bg-slate-50"
                >
                  <span>Request Custom Site</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRACKABLE EXPERIENCE TIMELINE (#experience) */}
      <section id="experience" className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-t border-b border-slate-200/60 dark:border-slate-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Professional Timeline
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Tracking consistent digital progress and remote operational excellence
            </p>
            <div className="mx-auto mt-3 h-1 w-12 bg-blue-600 rounded" />
          </div>

          {/* Timeline Layout */}
          <div className="relative mx-auto max-w-3xl">
            
            {/* Center vertical backbone */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-1/2 bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-stretch ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Centered timeline badge */}
                    <div className="absolute left-4 md:left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400 z-10 transition-colors">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                    </div>

                    {/* Timeline card container */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                      <div className="group rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900">
                        
                        {/* Period & Category tags */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{item.duration}</span>
                          </span>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                            {item.type}
                          </span>
                        </div>

                        {/* Heading details */}
                        <div className="space-y-1 mb-4">
                          <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.role}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-350 italic">
                            {item.company}
                          </p>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Nested Mini Achievements */}
                        <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Deliverables</p>
                          <ul className="space-y-1.5">
                            {item.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-702 dark:text-slate-303">
                                <span className="pt-1 text-blue-500 shrink-0">✔</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>

                    {/* Empty placeholder on alternate sides for desktop alignment */}
                    <div className="hidden md:block w-1/2" />

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* INQUIRY & CONTACT SECTION (#contact) */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Traditional contacts channels */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Let's Launch Your Next Growth Loop
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Have a specific sales funnel requirement, budget scale request, or audit query? Fill out the interactive consultation form or initiate a direct chat to review strategies together.
                </p>
                <div className="h-1 w-12 bg-blue-600 rounded" />
              </div>

              {/* Display Contact details card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 space-y-6">
                
                {/* Email Box Segment */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Email</p>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    emrandmd368@gmail.com
                  </p>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Email Address"}</span>
                  </button>
                </div>

                {/* WhatsApp call button */}
                <div className="space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct WhatsApp Link</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-base font-semibold text-slate-900 dark:text-white">
                      +8801330862469
                    </span>
                    <a
                      href="https://wa.me/8801330862469"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Chat Immediately</span>
                    </a>
                  </div>
                </div>

                {/* Social Connect Matrix */}
                <div className="space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Digital Footprints</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.facebook.com/imranahmedfacebook/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Linkedin className="h-4 w-4 text-sky-600" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Local Consultation Stat */}
              <div className="p-4 rounded-xl bg-blue-100/50 dark:bg-blue-950/20 border border-blue-200/40 dark:border-blue-900/40">
                <p className="text-xs text-blue-800 dark:text-blue-350 leading-relaxed font-semibold">
                  🚀 Local clients receive a complimentary Meta conversion strategy brief or brief diagnostic audit of their existing Facebook pages. Mention "LOCAL COMP" in your message!
                </p>
              </div>

            </div>

            {/* Right Column: Premium Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800/80 dark:bg-slate-900">
                
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Request Free Brand Consultation
                </h3>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name input */}
                      <div className="space-y-1">
                        <label htmlFor="client-name" className="text-xs font-bold text-slate-400 block uppercase">
                          Full Name / Brand Name *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Imran Hossain / Sylhet Agro F-commerce"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-850 dark:bg-slate-950 dark:focus:border-blue-505 dark:focus:bg-slate-950 select-none outline-none transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label htmlFor="client-email" className="text-xs font-bold text-slate-400 block uppercase">
                          Business Email Address *
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="e.g. client@agrobrand.com"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-850 dark:bg-slate-950 dark:focus:border-blue-505 dark:focus:bg-slate-950 outline-none transition-all animate-none"
                        />
                      </div>

                      {/* Grid: Target capability selection & Target Budget */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        
                        <div className="space-y-1">
                          <label htmlFor="service-select" className="text-xs font-bold text-slate-400 block uppercase">
                            Required Engine *
                          </label>
                          <select
                            id="service-select"
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-850 dark:bg-slate-950 outline-none transition-all"
                          >
                            <option value="Meta Marketing Suite">Meta Marketing Suite</option>
                            <option value="TikTok Marketing">TikTok Marketing</option>
                            <option value="Google Ads (SEM)">Google Ads (SEM)</option>
                            <option value="Web Design & Development">Web Design & Development</option>
                            <option value="Other Consulting">Other / Joint Growth Package</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="budget-select" className="text-xs font-bold text-slate-400 block uppercase">
                            Target Media Budget / Month
                          </label>
                          <select
                            id="budget-select"
                            value={formBudget}
                            onChange={(e) => setFormBudget(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-850 dark:bg-slate-950 outline-none transition-all"
                          >
                            <option value="৳15,000 - ৳50,000">৳15,000 - ৳50,000 ($120 - $400 USD)</option>
                            <option value="৳50,000 - ৳150,000">৳50,000 - ৳150,000 ($400 - $1200 USD)</option>
                            <option value="৳150,000+">৳150,000+ ($1200+ USD)</option>
                            <option value="International Brand Scale">International Partnering</option>
                          </select>
                        </div>

                      </div>

                      {/* Detail text */}
                      <div className="space-y-1">
                        <label htmlFor="client-detail" className="text-xs font-bold text-slate-400 block uppercase">
                          Tell me about your product/scaling plans
                        </label>
                        <textarea
                          id="client-detail"
                          rows={4}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="What challenges are you facing in Facebook targeting, conversions or web load performance?"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-850 dark:bg-slate-950 outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Submit form action triggering state changes */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Validating Credentials...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Submit Consultation Request</span>
                          </>
                        )}
                      </button>

                    </motion.form>
                  ) : (
                    /* Elegant Form Submission Response */
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <ThumbsUp className="h-6 w-6 animate-bounce" />
                      </span>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                          Inquiry Successfully Submitted!
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                          Thank you for connecting. I will review your target service requirements ({formService}) and respond to you via your email address shortly or initiate strategy planning.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormService("Meta Marketing Suite");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        <span>Send another message</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-12 dark:border-slate-850 dark:bg-slate-950 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-1">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                Imran Ahmed
              </span>
              <p className="text-xs text-slate-400">
                Premium Growth Partner, Web Developer and Certified Google & Meta Ads Specialist.
              </p>
            </div>

            {/* Quick scroll hooks */}
            <ul className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="text-right text-xs text-slate-400 font-mono">
              <p>© {new Date().getFullYear()} Imran Ahmed. All Rights Reserved.</p>
              <p className="text-[10px] text-slate-500">Built with React, Vite & Tailwind CSS</p>
            </div>

          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING STICKY WHATSAPP BUTTON */}
      <a
        href="https://wa.me/8801330862469"
        target="_blank"
        rel="noreferrer"
        className="group fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 transition-all hover:scale-105"
        title="Direct WhatsApp Messenger"
      >
        <div className="absolute -inset-1 rounded-full bg-emerald-605/50 animate-ping opacity-20 group-hover:opacity-40" />
        <MessageCircle className="h-6 w-6 relative fill-white/10 group-hover:scale-110 transition-transform" />
      </a>

    </div>
  );
}
