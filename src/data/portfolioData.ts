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
  title: "Associate Technical Analyst & Enterprise Document Automation Engineer",
  company: "Sapiens Technologies",
  tagline: "Bridging High-Throughput Enterprise Architecture & Modern Full-Stack Agility",
  email: "Jaisnimish@gmail.com",
  phone: "+91-7666750048",
  location: "Bangalore, India",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
  linkedin: "https://linkedin.com/in/nimish-jais/",
  github: "https://github.com/",
  leetcode: "https://leetcode.com/",
  resumePdfUrl: "/Nimish_Jais_Resume.pdf",
  bio: `Technical Implementation Engineer with 1.5+ years of experience at Sapiens specializing in GhostDraft CCM document automation, XSLT data mapping, and P&C Insurance workflows. Proven track record in configuring enterprise modules, resolving complex XML/API integration defects, and delivering zero-defect production releases ahead of schedule.`,
  stats: [
    { label: "Enterprise Experience", value: "1.5+", unit: "Years" },
    { label: "Production Rollouts", value: "Zero", unit: "Defects" },
    { label: "LeetCode Problems", value: "200+", unit: "Solved" },
    { label: "Record Holder", value: "Asia Book", unit: "of Records" },
  ]
};

export const SKILL_CATEGORIES = [
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
    category: "Programming & Data Logic",
    icon: "Code",
    description: "Core algorithmic thinking, robust backend services, and structured schema processing.",
    skills: [
      { name: "Java", level: 88, highlight: true },
      { name: "XML & XPath", level: 95, highlight: true },
      { name: "JSON & Schema Design", level: 92, highlight: true },
      { name: "SQL & Relational DBs", level: 85, highlight: true },
      { name: "TypeScript / JavaScript", level: 82, highlight: false },
      { name: "Data Structures & Algorithms", level: 88, highlight: false },
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
  },
  {
    category: "Cloud, APIs & DevOps",
    icon: "Cloud",
    description: "Connecting enterprise engines with modern cloud storage, asynchronous messaging, and CI/CD.",
    skills: [
      { name: "REST & SOAP APIs", level: 92, highlight: true },
      { name: "AWS S3 Integration", level: 88, highlight: true },
      { name: "Git & Version Control", level: 90, highlight: false },
      { name: "Agile / Scrum & JIRA", level: 92, highlight: false },
      { name: "Root-Cause Log Diagnostics", level: 94, highlight: true },
      { name: "Full-Stack Workflows (MERN, Spring)", level: 85, highlight: false },
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
    id: "ghostdraft-pipeline",
    title: "GhostDraft CCM Enterprise Automation Pipeline",
    category: "Enterprise",
    tagline: "Rule-Based XML/XSLT Transformation & Cloud S3 Archival Engine",
    description: "High-throughput document composition platform connecting enterprise P&C Insurance modules with dynamic PDF and multi-channel rendering engines.",
    longDescription: "Orchestrates end-to-end document lifecycles for high-volume insurance carriers. Receives transactional XML payloads from Policy, Billing, and Claims systems, executes rule-based XSLT data transformations, applies dynamic template branding, and automatically persists compliance-ready documents directly into AWS S3 storage with comprehensive audit logging.",
    technologies: ["GhostDraft CCM", "XSLT 2.0", "Java", "XML/XPath", "AWS S3", "REST/SOAP", "P&C Insurance"],
    metrics: "Zero-defect delivery • 100% compliance mapping",
    featured: true,
    status: "Production",
    architectureHighlights: [
      "Stateless XSLT transformation pipeline handling complex multi-tier nested XML payloads",
      "Dynamic document conditional branching based on policy risk levels and state-specific clauses",
      "Secure AWS S3 presigned URL integration for real-time customer retrieval",
      "Automated payload sanitization and error log parsing for instant glitch isolation"
    ]
  },
  {
    id: "library-mgmt-system",
    title: "Full-Stack Operational Dashboard & Resource Tracker",
    category: "Full-Stack",
    tagline: "Secure Member Administration & Resource Orchestration Platform",
    description: "Full-stack operational dashboard to automate public utility workflows, asset tracking, and role-based member administration.",
    longDescription: "Engineered a production-ready administrative system featuring fine-grained Role-Based Access Control (RBAC), JWT token authentication, real-time inventory tracking, member profile lifecycle management, and relational database persistence with strict constraint validations.",
    technologies: ["React", "Node.js", "Java / Spring Boot", "JWT Auth", "SQL Database", "REST APIs", "Tailwind CSS"],
    metrics: "Sub-100ms query latency • Granular RBAC",
    featured: true,
    status: "Completed",
    github: "https://github.com/",
    architectureHighlights: [
      "JWT-based stateless authentication with token rotation and permission middleware",
      "Optimized SQL indexing and relational schema for high-concurrency borrowing workflows",
      "Responsive operational dashboard with real-time asset tracking and telemetry",
      "Automated overdue calculation algorithms and automated email dispatch triggers"
    ]
  },
  {
    id: "decentralized-doc-verify",
    title: "Zero-Trust Document Verification & Integrity Layer",
    category: "Upcoming",
    tagline: "Cryptographic Hashing & Tamper-Proof Insurance Artifacts",
    description: "Futuristic microservice for generating SHA-256 cryptographic verification proofs and audit trails for generated enterprise PDF contracts.",
    longDescription: "Designed as an immutable ledger add-on to enterprise CCM pipelines, this system calculates digital fingerprints for every generated policy and claim document, allowing external auditors and policyholders to instantly verify authenticity via zero-trust QR anchors.",
    technologies: ["TypeScript", "Next.js", "Cryptography", "AWS Lambda", "Microservices"],
    metrics: "In Architecture Phase",
    featured: false,
    status: "Research",
    architectureHighlights: [
      "SHA-256 Merkle-tree verification for high-volume document batches",
      "QR Code instant scan anchor embedded inside GhostDraft document footers",
      "Zero-knowledge audit logs for compliance regulators"
    ]
  },
  {
    id: "ai-xslt-copilot",
    title: "AI-Assisted Schema & XSLT Transformation Studio",
    category: "Upcoming",
    tagline: "Visual Data Mapping & Synthetic XML Payload Debugger",
    description: "Next-generation developer tool providing visual schema diffing, automated XSLT snippet generation, and synthetic test payload synthesis.",
    longDescription: "A developer productivity accelerator engineered to ingest raw enterprise JSON/XML schemas and automatically generate clean, standards-compliant XSLT stylesheets while highlighting regression edge-cases before deployment.",
    technologies: ["Next.js", "WebAssembly", "LLM APIs", "Monaco Editor", "Tailwind CSS"],
    metrics: "Roadmap 2026",
    featured: false,
    status: "In Development",
    architectureHighlights: [
      "Client-side Monaco code editor with real-time XSLT/XPath syntax validation",
      "Synthetic XML payload generator for stress testing boundary conditions",
      "Interactive AST visualizer for complex document structure trees"
    ]
  }
];

export const AWARDS_AND_HONORS = [
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
