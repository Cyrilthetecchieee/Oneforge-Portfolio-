/**
 * ONEFORGE® — STUDIO CONFIGURATION & CONTENT STORE
 * ============================================================================
 * Edit this file to update statistics, portfolio projects, founder portraits,
 * social links, or connect a live form submission endpoint (e.g. Formspree,
 * Web3Forms, or custom API route).
 */

window.ONEFORGE_CONFIG = {
  brand: {
    name: "ONEFORGE",
    legalMark: "ONEFORGE®",
    tagline: "We Forge Ideas Into Digital Experiences.",
    introLabel: "INDEPENDENT DIGITAL TECHNOLOGY STUDIO",
    microcopy: ["DESIGN", "DEVELOP", "AUTOMATE", "INNOVATE"],
    statements: [
      "We Forge Ideas Into Digital Experiences.",
      "From Concept to Creation.",
      "Engineering Tomorrow, Today.",
      "Turning Ideas Into Intelligent Solutions.",
      "Built With Purpose. Designed to Perform.",
      "Your Vision. Our Innovation.",
      "Where Creativity Meets Technology.",
      "Digital Experiences That Move Businesses Forward."
    ]
  },

  /**
   * SECTION 04 — EDITABLE STATISTICS PLACEHOLDERS
   * Kept honest and editable per studio guidelines (no fabricated achievements).
   * Update `value`, `prefix`, `suffix`, and `label` as official milestones are published.
   */
  statistics: [
    {
      id: "stat-capabilities",
      value: 12,
      prefix: "",
      suffix: "",
      padZero: true,
      label: "Core Digital Capabilities",
      sublabel: "End-to-end engineering, cloud, automation & design disciplines",
      isPlaceholder: false
    },
    {
      id: "stat-stages",
      value: 4,
      prefix: "0",
      suffix: "",
      padZero: false,
      label: "Precision Execution Stages",
      sublabel: "Discover, Strategize, Build, and Launch & Evolve",
      isPlaceholder: false
    },
    {
      id: "stat-projects",
      value: 100,
      prefix: "",
      suffix: "%",
      padZero: false,
      label: "Tailored Architecture",
      sublabel: "Editable metric slot — customize in data.js or Studio Editor",
      isPlaceholder: true
    },
    {
      id: "stat-commitment",
      value: 24,
      prefix: "",
      suffix: "/7",
      padZero: false,
      label: "Lifecycle Partnership Focus",
      sublabel: "Editable metric slot — continuous evolution beyond launch",
      isPlaceholder: true
    }
  ],

  /**
   * SECTION 04 — ABOUT HIGHLIGHTS
   */
  aboutHighlights: [
    {
      code: "01",
      title: "Creative thinking.",
      description: "Translating ambitious concepts into distinctive interfaces and memorable digital product identities.",
      icon: "sparkles"
    },
    {
      code: "02",
      title: "Engineering excellence.",
      description: "Clean, resilient, and scalable system architecture built for long-term reliability and performance.",
      icon: "cpu"
    },
    {
      code: "03",
      title: "Business-focused solutions.",
      description: "Every technical and creative decision is anchored in measurable operational and commercial value.",
      icon: "TrendingUp"
    },
    {
      code: "04",
      title: "Long-term digital partnerships.",
      description: "Dedicated collaboration from initial discovery through deployment, optimization, and growth.",
      icon: "shieldCheck"
    }
  ],

  /**
   * SECTION 05 — ALL 12 SERVICES
   */
  services: [
    {
      number: "01",
      id: "software-development",
      category: "engineering",
      title: "SOFTWARE DEVELOPMENT",
      displayName: "Software Development",
      tagline: "Engineered Around Your Ideas.",
      description: "We build scalable, reliable and efficient software solutions designed around real-world business requirements.",
      subservices: [
        "Custom Software Development.",
        "Enterprise Software Solutions.",
        "Software Architecture.",
        "Application Development."
      ],
      icon: "terminal"
    },
    {
      number: "02",
      id: "web-development",
      category: "engineering",
      title: "WEB DEVELOPMENT",
      displayName: "Web Development",
      tagline: "Websites That Work Beyond Expectations.",
      description: "We create modern, responsive and high-performance websites that strengthen brands and deliver meaningful digital experiences.",
      subservices: [
        "Business Websites.",
        "Portfolio Websites.",
        "E-commerce Platforms.",
        "Web Applications.",
        "Full-Stack Development."
      ],
      icon: "globe"
    },
    {
      number: "03",
      id: "mobile-application-development",
      category: "engineering",
      title: "MOBILE APPLICATION DEVELOPMENT",
      displayName: "Mobile Application Development",
      tagline: "Your Ideas, Everywhere.",
      description: "We transform innovative concepts into mobile applications with intuitive interfaces and reliable performance.",
      subservices: [
        "Android Applications.",
        "iOS Applications.",
        "Cross-Platform Applications.",
        "Mobile App UI/UX."
      ],
      icon: "smartphone"
    },
    {
      number: "04",
      id: "custom-software-solutions",
      category: "engineering",
      title: "CUSTOM SOFTWARE SOLUTIONS",
      displayName: "Custom Software Solutions",
      tagline: "Built Around Your Business, Not the Other Way Around.",
      description: "Every business has unique challenges. We develop tailored software solutions that simplify operations, improve productivity and support business growth.",
      subservices: [
        "Bespoke Operational Platforms.",
        "Internal Tools & Portals.",
        "Legacy System Modernization.",
        "Domain-Specific Business Systems."
      ],
      icon: "layers"
    },
    {
      number: "05",
      id: "cloud-services",
      category: "cloud-automation",
      title: "CLOUD SERVICES",
      displayName: "Cloud Services",
      tagline: "Powering Possibilities Beyond Boundaries.",
      description: "Build, deploy and manage scalable digital infrastructure with cloud-focused solutions.",
      subservices: [
        "Cloud Deployment.",
        "Cloud Infrastructure.",
        "Application Hosting.",
        "Cloud Migration.",
        "Infrastructure Optimization."
      ],
      icon: "cloud"
    },
    {
      number: "06",
      id: "api-integrations",
      category: "cloud-automation",
      title: "API INTEGRATIONS",
      displayName: "API Integrations",
      tagline: "Connect Everything. Simplify Anything.",
      description: "We connect platforms, applications and third-party services to create seamless digital ecosystems.",
      subservices: [
        "REST API Integration.",
        "Third-Party Integrations.",
        "Payment Gateway Integration.",
        "Backend Integrations.",
        "System Connectivity."
      ],
      icon: "network"
    },
    {
      number: "07",
      id: "maintenance-and-support",
      category: "cloud-automation",
      title: "MAINTENANCE AND SUPPORT",
      displayName: "Maintenance and Support",
      tagline: "Better Today. Stronger Tomorrow.",
      description: "We provide continuous technical support, performance improvements and maintenance to keep digital products running smoothly.",
      subservices: [
        "Website Maintenance.",
        "Software Updates.",
        "Bug Fixing.",
        "Performance Optimization.",
        "Technical Support."
      ],
      icon: "wrench"
    },
    {
      number: "08",
      id: "business-automation",
      category: "cloud-automation",
      title: "BUSINESS AUTOMATION",
      displayName: "Business Automation",
      tagline: "Less Manual Work. More Meaningful Growth.",
      description: "Automate repetitive workflows and improve business efficiency through intelligent digital processes.",
      subservices: [
        "Workflow Automation.",
        "Business Process Automation.",
        "AI-Powered Automation.",
        "Data Synchronization.",
        "Productivity Solutions."
      ],
      icon: "workflow"
    },
    {
      number: "09",
      id: "ui-ux-design",
      category: "design-growth",
      title: "UI/UX DESIGN",
      displayName: "UI/UX Design",
      tagline: "Designed to Feel Right. Built to Work Right.",
      description: "We create user-centered digital experiences that combine beautiful interfaces with intuitive functionality.",
      subservices: [
        "User Interface Design.",
        "User Experience Design.",
        "Wireframing.",
        "Prototyping.",
        "Design Systems.",
        "Website and App Design."
      ],
      icon: "penTool"
    },
    {
      number: "10",
      id: "data-analytics",
      category: "cloud-automation",
      title: "DATA ANALYTICS",
      displayName: "Data Analytics",
      tagline: "Turn Data Into Direction.",
      description: "We transform complex information into meaningful insights that help businesses make informed decisions.",
      subservices: [
        "Data Visualization.",
        "Business Intelligence.",
        "Interactive Dashboards.",
        "Data Reporting.",
        "Analytics Solutions."
      ],
      icon: "barChart"
    },
    {
      number: "11",
      id: "digital-marketing",
      category: "design-growth",
      title: "DIGITAL MARKETING",
      displayName: "Digital Marketing",
      tagline: "Make Your Brand Impossible to Ignore.",
      description: "We help businesses strengthen their digital presence, reach the right audience and build meaningful online engagement.",
      subservices: [
        "Social Media Marketing.",
        "Search Engine Optimization.",
        "Digital Campaigns.",
        "Content Strategy.",
        "Online Brand Promotion."
      ],
      icon: "megaphone"
    },
    {
      number: "12",
      id: "branding-and-creative-design",
      category: "design-growth",
      title: "BRANDING AND CREATIVE DESIGN",
      displayName: "Branding and Creative Design",
      tagline: "Build a Brand That Stays Remembered.",
      description: "We create distinctive brand identities and visual communication systems that give businesses a recognizable and consistent presence.",
      subservices: [
        "Brand Identity.",
        "Logo Design.",
        "Graphic Design.",
        "Marketing Creatives.",
        "Brand Guidelines.",
        "Social Media Design."
      ],
      icon: "compass"
    }
  ],

  /**
   * SECTION 06 — OUR PROCESS
   */
  process: [
    {
      step: "01",
      title: "DISCOVER",
      description: "Understand the idea, business objectives, requirements and challenges.",
      deliverables: ["Requirement Mapping", "Technical Feasibility", "Scope Architecture"]
    },
    {
      step: "02",
      title: "STRATEGIZE",
      description: "Develop a clear technical and creative roadmap.",
      deliverables: ["System Blueprint", "UX Wireframes", "Milestone Roadmap"]
    },
    {
      step: "03",
      title: "BUILD",
      description: "Design, engineer, test and refine the solution.",
      deliverables: ["Full-Stack Engineering", "Design System Execution", "Rigorous QA Testing"]
    },
    {
      step: "04",
      title: "LAUNCH & EVOLVE",
      description: "Deploy, optimize, maintain and continuously improve.",
      deliverables: ["Cloud Deployment", "Performance Telemetry", "Continuous Iteration"]
    }
  ],

  /**
   * SECTION 07 — SELECTED WORK (EDITABLE PLACEHOLDERS)
   * Explicitly structured as editable studio concept/prototype slots.
   * No fabricated clients or false commercial partnerships.
   */
  projects: [
    {
      id: "project-slot-01",
      slotLabel: "EDITABLE PROJECT SLOT 01 // STUDIO CONCEPT",
      title: "ForgeOS — Modular Workflow & Automation Engine",
      category: "Custom Software & Automation",
      filterKey: "software",
      description: "An architectural concept demonstrating event-driven workflow orchestration, real-time telemetry, and unified API pipelines for modern operations.",
      technologies: ["TypeScript", "Node.js", "REST / Webhooks", "PostgreSQL", "Docker"],
      visualType: "automation-grid",
      accentNote: "Replace with live case study or keep as studio capability concept",
      previewUrl: "#contact"
    },
    {
      id: "project-slot-02",
      slotLabel: "EDITABLE PROJECT SLOT 02 // STUDIO CONCEPT",
      title: "Aether Commerce — High-Velocity Web Experience",
      category: "Web Development & UI/UX Design",
      filterKey: "web",
      description: "A studio reference build showcasing sub-second page transitions, editorial typography, and conversion-focused checkout architecture.",
      technologies: ["HTML5 / CSS3", "Modern JS", "Design System", "Responsive Grid", "Edge CDN"],
      visualType: "editorial-commerce",
      accentNote: "Editable showcase slot — update image, title & stack in data.js",
      previewUrl: "#contact"
    },
    {
      id: "project-slot-03",
      slotLabel: "EDITABLE PROJECT SLOT 03 // STUDIO CONCEPT",
      title: "PulseMetric — Real-Time Executive Intelligence Suite",
      category: "Data Analytics & Cloud Infrastructure",
      filterKey: "analytics",
      description: "Interactive business intelligence concept transforming multi-source operational streams into clear, actionable visual direction.",
      technologies: ["Data Visualization", "Cloud Architecture", "API Gateway", "Time-Series DB"],
      visualType: "analytics-suite",
      accentNote: "Editable showcase slot — configure in data.js or Studio Editor",
      previewUrl: "#contact"
    },
    {
      id: "project-slot-04",
      slotLabel: "EDITABLE PROJECT SLOT 04 // STUDIO CONCEPT",
      title: "Kinetix Mobile — Cross-Platform Field Companion",
      category: "Mobile Application & Brand System",
      filterKey: "mobile",
      description: "Concept prototype for an offline-first mobile application featuring tactile gesture navigation, real-time sync, and cohesive brand identity.",
      technologies: ["Cross-Platform Mobile", "UI/UX Prototyping", "REST API Sync", "Brand Guidelines"],
      visualType: "mobile-companion",
      accentNote: "Editable showcase slot — ready for your next project release",
      previewUrl: "#contact"
    }
  ],

  /**
   * SECTION 08 — WHY ONEFORGE
   */
  whyOneForge: [
    {
      number: "01",
      title: "Tailored Solutions",
      description: "Every solution starts with your actual requirements."
    },
    {
      number: "02",
      title: "Creative Engineering",
      description: "Combining design thinking with technical execution."
    },
    {
      number: "03",
      title: "Scalable Technology",
      description: "Building with future growth in mind."
    },
    {
      number: "04",
      title: "Transparent Collaboration",
      description: "Keeping communication clear throughout the process."
    },
    {
      number: "05",
      title: "End-to-End Support",
      description: "Supporting your digital journey beyond launch."
    }
  ],

  /**
   * SECTION 09 — MEET THE FOUNDERS
   * Editable profile images (`imageUrl`), descriptions, statements, and links.
   */
  founders: [
    {
      id: "julian-cyril-d",
      badge: "FOUNDER // 01",
      name: "JULIAN CYRIL D",
      position: "Founder, OneForge.",
      portfolioUrl: "https://withcyril.me",
      portfolioDomain: "withcyril.me",
      ctaText: "Explore Portfolio",
      initials: "JC",
      imageUrl: "", // Set a portrait image path/URL here or upload directly via the card's "Update Portrait" button
      introduction: [
        "The driving force behind OneForge, Julian Cyril D focuses on transforming ideas into meaningful digital experiences through technology, creative direction and product development.",
        "His interests span software engineering, digital product experiences, emerging technologies and building solutions that solve practical problems."
      ],
      statement: "I believe every great digital product begins with an idea, but its true value comes from how thoughtfully it is designed and built.",
      focusTags: ["Software Engineering", "Creative Direction", "Product Development", "Emerging Tech"],
      socials: [
        { label: "Portfolio", url: "https://withcyril.me" },
        { label: "Email", url: "mailto:oneforge.in.official@gmail.com" },
        { label: "Instagram", url: "https://www.instagram.com/one_forge/" }
      ]
    },
    {
      id: "jegatheesh-v",
      badge: "CO-FOUNDER // 02",
      name: "JEGATHEESH V",
      position: "Co-Founder, OneForge.",
      portfolioUrl: "https://jegx.me",
      portfolioDomain: "jegx.me",
      ctaText: "Explore Portfolio",
      initials: "JV",
      imageUrl: "", // Set a portrait image path/URL here or upload directly via the card's "Update Portrait" button
      introduction: [
        "As Co-Founder of OneForge, Jegatheesh V contributes to the company's vision of building thoughtful digital solutions and creating meaningful technology experiences.",
        "His work brings together creativity, collaboration, technical thinking and the ambition to build products that make a lasting difference."
      ],
      statement: "Great things happen when creative thinking and technology come together with a shared purpose.",
      focusTags: ["Technical Architecture", "Creative Systems", "Collaborative Engineering", "Product Strategy"],
      socials: [
        { label: "Portfolio", url: "https://jegx.me" },
        { label: "Email", url: "mailto:oneforge.in.official@gmail.com" },
        { label: "Instagram", url: "https://www.instagram.com/one_forge/" }
      ]
    }
  ],

  /**
   * SECTION 10 — CONTACT & FORM CONFIGURATION
   * Set `formEndpoint` to your live backend / Formspree / Web3Forms URL
   * (e.g. "https://formspree.io/f/your_form_id") to enable direct POST submission.
   * When `formEndpoint` is empty, the form never fakes a success message; instead
   * it validates the fields and dispatches a real formatted inquiry via your mail client
   * or copies the structured brief directly.
   */
  contact: {
    email: "oneforge.in.official@gmail.com",
    phoneDisplay: "+91 9597437826",
    phoneHref: "+919597437826",
    instagramHandle: "@one_forge",
    instagramUrl: "https://www.instagram.com/one_forge/",
    formEndpoint: ""
  }
};
