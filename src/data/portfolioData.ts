export interface ProjectItem {
  id: string;
  title: string;
  category: "Enterprise" | "Full-Stack" | "Upcoming" | "Cloud";
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics?: string;
  featured: boolean;
  status: "Production" | "Completed" | "In Development" | "Research";
  github?: string;
  demoUrl?: string;
  architectureHighlights: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  badge?: string;
  summary: string;
  achievements: string[];
  skills: string[];
  impactMetric: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  period: string;
  location: string;
  details: string;
  coursework: string[];
  badges: string[];
}

export const PERSONAL_INFO = {
  name: "Nimish Jais",
  title: "GhostDraft Developer • AI Engineer • System Implementation Specialist",
  company: "Sapiens Technologies",
  tagline: "High-Throughput Enterprise Architecture, System Integrations & Autonomous AI Engineering",
  email: "Jaisnimish@gmail.com",
  phone: "+91-7666750048",
  location: "Bangalore, India",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  linkedin: "https://linkedin.com/in/nimish-jais/",
  github: "https://github.com/",
  leetcode: "https://leetcode.com/",
  resumePdfUrl: "/Nimish_Jais_Resume.pdf",
  bio: `Enterprise Engineer with 1.5+ years of MNC experience at Sapiens Technologies specializing in GhostDraft CCM document automation, complex XSLT mapping, and system integrations (REST/SOAP, AWS S3). Certified AI Coder by Ed Donner and Core Track LLM Engineer, actively building and deploying autonomous AI agents with zero production defects.`,
  stats: [
    { label: "Enterprise Experience", value: "1.5+", unit: "Years" },
    { label: "Production Defects", value: "Zero", unit: "Defects" },
    { label: "LeetCode Solved", value: "200+", unit: "Problems" },
    { label: "Record Holder", value: "Asia Book", unit: "of Records" },
  ]
};

export const SKILL_CATEGORIES = [
  {
    category: "AI Engineering & Agentic Systems",
    icon: "Bot",
    description: "Autonomous agent orchestration, modern LLM integration, prompt engineering, and intelligent workflow automation.",
    skills: [
      { name: "Autonomous AI Agents & Workflows", level: 94, highlight: true },
      { name: "Certified AI Coder (Ed Donner)", level: 96, highlight: true },
      { name: "Core Track LLM Engineering", level: 90, highlight: true },
      { name: "Prompt Engineering & Evaluation", level: 92, highlight: true },
      { name: "LangChain, RAG & Vector Search", level: 86, highlight: false },
      { name: "Python & TypeScript AI Tooling", level: 88, highlight: false },
    ]
  },
  {
    category: "Document Automation & CCM",
    icon: "FileCode2",
    description: "Enterprise-scale customer communication management, dynamic template authoring, and complex data mapping.",
    skills: [
      { name: "GhostDraft CCM Development", level: 95, highlight: true },
      { name: "Template & Form Authoring", level: 92, highlight: true },
      { name: "Document Composition & Logic", level: 94, highlight: true },
      { name: "XSLT Data Transformations", level: 90, highlight: true },
      { name: "Iframe & Embedded Setup", level: 88, highlight: false },
      { name: "Multi-Channel Print & PDF Delivery", level: 90, highlight: false },
    ]
  },
  {
    category: "System Integrations & Cloud",
    icon: "Cloud",
    description: "Connecting enterprise engines with modern cloud storage, asynchronous messaging, and robust APIs.",
    skills: [
      { name: "REST & SOAP API Integrations", level: 92, highlight: true },
      { name: "AWS S3 Integration Pipelines", level: 88, highlight: true },
      { name: "XML & XPath Payload Mapping", level: 95, highlight: true },
      { name: "Java & Microservices Backend", level: 88, highlight: true },
      { name: "Root-Cause Log Diagnostics", level: 94, highlight: true },
      { name: "Git, Agile & JIRA Workflows", level: 92, highlight: false },
    ]
  },
  {
    category: "Domain & Enterprise Architecture",
    icon: "ShieldCheck",
    description: "Deep domain understanding of P&C Insurance lifecycle, core enterprise modules, and regulatory compliance.",
    skills: [
      { name: "P&C Insurance Lifecycle", level: 92, highlight: true },
      { name: "Policy Administration (PAS)", level: 90, highlight: true },
      { name: "Billing Systems & Invoicing", level: 88, highlight: false },
      { name: "Claims Processing & Settlements", level: 89, highlight: true },
      { name: "Sapiens Suite / Guidewire Equiv.", level: 92, highlight: true },
      { name: "Enterprise Compliance & SLA Delivery", level: 95, highlight: false },
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "sapiens",
    company: "Sapiens Technologies Pvt. Ltd",
    role: "Associate Technical Analyst",
    location: "Bangalore, India",
    period: "Apr 2025 - Present",
    isCurrent: true,
    badge: "🏆 Bravo Award Recipient",
    impactMetric: "Zero-Defect Release & Accelerated QA Regression",
    summary: "Leading technical implementation and orchestration for GhostDraft CCM document automation, complex XSLT data mapping, and mission-critical P&C insurance workflows for premier global carriers.",
    achievements: [
      "Earned company prestigious Bravo Award for delivering a major high-ticket module significantly ahead of schedule, enabling QA extended regression cycles and resulting in a flawless zero-defect production rollout.",
      "Authored, updated, and governed mission-critical document templates, dynamic forms, and multi-channel customer communications using GhostDraft, ensuring 100% regulatory compliance with insurance statutory guidelines.",
      "Engineered automated, rule-based document pipelines by transforming complex hierarchical XML payloads and relational database feeds through custom XSLT stylesheets and bespoke scripting logic.",
      "Constructed, tested, and maintained robust bi-directional integrations connecting GhostDraft with core enterprise product modules (Policy, Billing, Claims) and external microservices via REST/SOAP APIs.",
      "Spearheaded root-cause investigations of document rendering glitches, XML payload discrepancies, and API communication mismatches through deep-tier log diagnostics.",
      "Architected and deployed direct AWS S3 integration pipelines to securely stream and persist generated policy contracts and claims artifacts to customer-side cloud infrastructure."
    ],
    skills: [
      "GhostDraft CCM",
      "XSLT",
      "Java",
      "XML",
      "P&C Insurance",
      "REST/SOAP",
      "AWS S3",
      "Root-Cause Diagnostics",
      "Agile/JIRA"
    ]
  }
];

export const EDUCATIONS: EducationItem[] = [
  {
    institution: "Sunbeam Pune",
    degree: "Post-Graduate Diploma in Advance Computing (PG-DAC)",
    grade: "Grade: A",
    period: "Aug 2024 - Feb 2025",
    location: "Pune, India",
    details: "Rigorous full-time advanced computer science diploma focusing on scalable enterprise systems, modern architecture, and multi-stack software engineering.",
    coursework: [
      "Object Oriented Programming (OOP)",
      "Advanced Databases & SQL Optimization",
      "Data Structures & Algorithms (DSA)",
      "Operating Systems & Multithreading",
      "Triple Stack Engineering: MERN, Java + Spring Boot, .NET Core"
    ],
    badges: ["Grade A Distinction", "Multi-Stack Certified", "Enterprise Systems"]
  },
  {
    institution: "Shri Ramdeobaba College of Engineering and Management",
    degree: "B.E. – Electronics and Communication Engineering",
    grade: "CGPA: 8.1 / 10",
    period: "Aug 2019 – April 2023",
    location: "Nagpur, India",
    details: "Foundational engineering degree combining signal processing, microcontrollers, computational logic, and algorithmic problem-solving.",
    coursework: [
      "Digital Signal Processing",
      "Computer Networks & Communication",
      "Embedded Systems & Microcontrollers",
      "Linear Algebra & Engineering Mathematics",
      "Software Engineering Methodologies"
    ],
    badges: ["8.1 CGPA", "Engineering Leadership", "Technical Innovation"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "token-cost-calculator",
    title: "Token Cost Calculator",
    category: "Full-Stack",
    tagline: "Compare 100+ LLM API Prices with Caching & Batch Discounts",
    description: "Interactive web app that simulates, compares, and forecasts LLM API costs across 100+ AI models — factoring prompt caching discounts, batch processing, and monthly request scale.",
    longDescription: "A public calculator that helps developers and product teams forecast LLM infrastructure spend. Users tune workload parameters (input, cached, and output tokens, request scale, batch mode) and pick models from a 100+ model pricing registry to get a side-by-side cost leaderboard with exact spend and caching discounts — backed by a comprehensive developer guide and FAQ knowledge base on token billing and cost optimization.",
    technologies: ["JavaScript", "Interactive Calculator", "100+ Model Pricing Database", "SEO Content"],
    metrics: "Live on Web • 100+ models compared",
    featured: true,
    status: "Production",
    demoUrl: "https://tokencostcalculatorllm.com/",
    architectureHighlights: [
      "Workload simulator with presets that auto-fill token estimates for common AI workloads",
      "Model selection registry comparing 100+ models side-by-side on price, cache rates, and context",
      "Cost comparison leaderboard ranking models by exact monthly spend with caching discounts",
      "Long-form developer guide and FAQ knowledge base driving organic search traffic"
    ]
  },
  {
    id: "isha-experiences",
    title: "Isha Experiences",
    category: "Full-Stack",
    tagline: "Independent Community Archive of Meditator Stories & Reviews",
    description: "Community platform documenting 340+ authentic meditator stories across 28+ countries — with anonymous story submissions, verified transformation threads, and program reviews.",
    longDescription: "An independent, community-driven archive where practitioners share uncensored experiences of Isha programs like Inner Engineering, Bhava Spandana, and Shoonya. Features a searchable story archive with program and year filters, appreciation counts, verified before/after transformation threads, anonymous story submission with emails kept private, and an FAQ knowledge base — explicitly independent of the Isha Foundation.",
    technologies: ["JavaScript", "Community Platform", "Anonymous Submissions", "SEO Content"],
    metrics: "Live on Web • 340+ stories • 28+ countries",
    featured: true,
    status: "Production",
    demoUrl: "https://ishaexperiences.com",
    architectureHighlights: [
      "Story archive with program, year, and location filters plus appreciation counts",
      "Verified before/after transformation threads documenting practitioner journeys",
      "Anonymous story submission flow with submitter emails kept strictly private",
      "FAQ and guide content covering programs, daily sadhana, and volunteering"
    ]
  },
  {
    id: "fers-calculator",
    title: "FERS Retirement Calculator",
    category: "Full-Stack",
    tagline: "Official OPM-Formula Pension Estimator for Federal Employees",
    description: "Free calculator that instantly estimates FERS pensions using the official OPM formula — High-3 salary, years of service, and multipliers, with eligibility and supplement checks.",
    longDescription: "A privacy-first web tool for U.S. federal employees to estimate their FERS basic benefit pension in seconds. Applies the official OPM formula (High-3 x service years x 1.0%/1.1% multiplier), handles special provisions for law enforcement, firefighters, and air traffic controllers (1.7% multiplier), checks minimum retirement age eligibility and early-retirement reductions, estimates the FERS Special Retirement Supplement, and credits unused sick leave — all computed client-side with nothing stored. Includes a complete guide and FAQ on FERS rules.",
    technologies: ["JavaScript", "Client-Side Computation", "OPM Formula Engine", "SEO Content"],
    metrics: "Live on Web • 100% private, browser-only",
    featured: true,
    status: "Production",
    demoUrl: "https://ferscalculator.com",
    architectureHighlights: [
      "Official OPM formula engine: High-3 x service years x multiplier (1.0% / 1.1% / 1.7%)",
      "Eligibility checks for MRA, early-retirement reductions, and FERS Supplement (SRS)",
      "Special provisions support for law enforcement, firefighters, and air traffic controllers",
      "100% client-side computation — all inputs stay in the browser, nothing is stored"
    ]
  }
];

export const AWARDS_AND_HONORS = [
  {
    id: "ai-coder-cert",
    title: "Certified AI Coder",
    organization: "Ed Donner / AI Engineering",
    year: "2025",
    type: "AI & LLM Credentials",
    description: "Officially certified in advanced AI agent engineering, LLM application architecture, and autonomous AI-assisted software development by Ed Donner; active Core Track LLM Engineer."
  },
  {
    id: "bravo-award",
    title: "Company Bravo Award",
    organization: "Sapiens Technologies",
    year: "2025",
    type: "Enterprise Excellence",
    description: "Awarded for exceptional technical execution, delivering a critical high-ticket client module ahead of schedule, facilitating thorough QA regression, and achieving a 100% zero-defect production deployment."
  },
  {
    id: "asia-book-of-records",
    title: "Asia Book of Records",
    organization: "ROTARACT",
    year: "2021",
    type: "World Record Leadership",
    description: "Led team during the landmark 'Defeat Diabetes' awareness and health drive organized by ROTARACT on September 29, 2021, recognized and certified by Asia Book of Records."
  },
  {
    id: "leetcode-achievement",
    title: "200+ Competitive Algorithmic Solutions",
    organization: "LeetCode & Code Platforms",
    year: "Active",
    type: "Algorithmic Mastery",
    description: "Consistently solved over 200+ algorithmic and data structure challenges spanning Dynamic Programming, Graph Traversal, Binary Trees, and High-Performance Logic."
  }
];

export const HOBBIES = [
  {
    name: "High-Altitude Mountain Trekking",
    icon: "Mountain",
    description: "Scaling peaks, navigating wilderness trails, and embracing physical resilience."
  },
  {
    name: "Table Tennis",
    icon: "Activity",
    description: "Fast-paced reflex training, strategic spin control, and competitive rallies."
  },
  {
    name: "Global Travel & Exploration",
    icon: "Compass",
    description: "Exploring diverse cultures, landscapes, architecture, and local cuisines."
  },
  {
    name: "Tech & Systems Reading",
    icon: "BookOpen",
    description: "Deep-diving into distributed systems, cloud patterns, and modern frontend design."
  }
];

export const TERMINAL_COMMANDS: Record<string, string | string[]> = {
  "help": [
    "Available commands:",
    "  whoami      - Display executive summary & profile",
    "  skills      - List core tech stacks & proficiencies",
    "  experience  - Show Sapiens career milestones & Bravo Award",
    "  projects    - List enterprise & full-stack architecture projects",
    "  awards      - View Asia Book of Records & honors",
    "  education   - View Sunbeam Pune (PG-DAC) & Shri Ramdeobaba details",
    "  contact     - Display direct email, phone & LinkedIn",
    "  resume      - Get resume download link",
    "  clear       - Clear the terminal screen",
  ],
  "whoami": "Nimish Jais — Associate Technical Analyst @ Sapiens | GhostDraft CCM & P&C Insurance Specialist | Full-Stack Engineer based in Bangalore, India.",
  "skills": [
    "• Document Automation: GhostDraft CCM, XSLT Transformations, Form Authoring, Iframe integration",
    "• Programming: Java, XML/XPath, JSON, SQL, TypeScript/JavaScript",
    "• Domain: P&C Insurance (Policy, Billing, Claims), Guidewire/Sapiens Suite",
    "• Cloud & Infrastructure: AWS S3, REST/SOAP APIs, Git, JIRA, Agile/Scrum"
  ],
  "experience": "Sapiens Technologies (Apr 2025 - Present) | Associate Technical Analyst\n🏆 Bravo Award Recipient for zero-defect production release.",
  "awards": "• Sapiens Bravo Award (2025)\n• Asia Book of Records (2021 - Defeat Diabetes with ROTARACT)\n• 200+ LeetCode Solved",
  "contact": "Email: Jaisnimish@gmail.com | Phone: +91-7666750048 | LinkedIn: linkedin.com/in/nimish-jais/ | Location: Bangalore, India",
  "resume": "Resume available at: /Nimish_Jais_Resume.pdf (Click 'View Resume' in the navbar or hero for full preview!)",
};
