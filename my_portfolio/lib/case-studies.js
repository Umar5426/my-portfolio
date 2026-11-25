export const caseStudies = [
  {
    slug: "e-vouchers",
    name: "e-vouchers",
    organization: "Checker Cabs",
    category: "Systems",
    type: "Business software",
    role: "Application development & integration",
    period: "2026",
    icon: "systems",
    summary: "Making corporate taxi vouchers easier to distribute through a digital experience.",
    context:
      "At Checker Cabs, I develop internal applications and integrations that connect business operations with software. e-vouchers is one part of that work, created for the company’s corporate voucher needs.",
    contribution:
      "I developed e-vouchers alongside operational applications, reporting and integrations. My focus is on translating business requirements into a clear experience for the people using the system.",
    technologies: ["Web applications", "Systems integration", "Workflow design"],
    flow: ["Business requirements", "Voucher workflow", "Application delivery"],
    focus: [
      "Understand how staff and customers use vouchers.",
      "Make the distribution workflow clear and easy to follow.",
      "Coordinate application requirements with the business.",
    ],
    reflection:
      "Operational software needs to fit the people and processes around it. A useful workflow starts with understanding those needs before choosing the interface or integration.",
    link: {
      label: "Contact Checker about e-vouchers",
      href: "https://www.thecheckergroup.com/contact/",
    },
  },
  {
    slug: "document-standardization",
    name: "AI document standardization",
    organization: "Tartigrade Inc.",
    category: "Software",
    type: "AI & document workflows",
    role: "Project Manager & Software Architect",
    period: "2025–2026",
    icon: "software",
    summary: "Turning varied source documents into consistent output using approved templates.",
    context:
      "Documents arriving from different sources rarely follow the same structure. This project brings extraction, classification and standardization into a pipeline that supports approved document templates and values.",
    contribution:
      "I designed the system and backend architecture, developed the document processing pipeline, and worked with stakeholders on requirements and validation. Prototypes and architecture proposals helped turn the requirements into an implementable application.",
    technologies: ["Python", "FastAPI", "Document processing", "Machine learning"],
    flow: ["Extract content", "Classify & structure", "Generate document"],
    focus: [
      "Separate text extraction from document classification and formatting.",
      "Use approved templates to guide the generated output.",
      "Validate results with stakeholder feedback and representative documents.",
    ],
    reflection:
      "Formatting is only one part of standardization. Preserving the meaning and structure of the source matters just as much as producing a consistent document.",
  },
  {
    slug: "community-web-application",
    name: "Donation centre web application",
    organization: "MCC Downtown Centre",
    category: "Community",
    type: "Community technology",
    role: "Software Team Lead",
    period: "2025–Present",
    icon: "delivery",
    summary: "Bringing designers and developers together around a community web application.",
    context:
      "Community applications need to work for people with different levels of technical confidence. At MCC Downtown Centre, the work combines usability, accessibility and practical delivery needs.",
    contribution:
      "I lead UI/UX designers and developers, coordinate development tasks and review code. My work also includes backend architecture, React development and public API integration.",
    technologies: ["React", "API integration", "Code review", "Agile delivery"],
    flow: ["Community needs", "Design & development", "Review & integration"],
    focus: [
      "Translate community needs into clear tasks for the team.",
      "Keep usability and accessibility part of design discussions.",
      "Review implementation decisions across frontend and backend work.",
    ],
    reflection:
      "Leading a software team means helping people make shared decisions. Clear requirements and regular review are as valuable as the code itself.",
  },
  {
    slug: "employee-management",
    name: "Employee Management Dashboard",
    organization: "Personal project",
    category: "Software",
    type: "Web & mobile",
    role: "Full stack development",
    period: "2025",
    icon: "software",
    summary: "A centralized employee platform with web, mobile and role-based access.",
    context:
      "An employee management platform needs a coherent experience across devices while keeping access to employee information appropriate to each person’s role.",
    contribution:
      "I built a centralized platform with Next.js and React Native. The project includes authentication and role-based access control, with maintainability and scalability considered in the application design.",
    technologies: ["Next.js", "React Native", "Authentication", "Role-based access"],
    flow: ["Authenticate", "Check permissions", "Access employee tools"],
    focus: [
      "Design web and mobile access around a shared purpose.",
      "Treat authentication and permissions as separate concerns.",
      "Keep application structure maintainable as features grow.",
    ],
    reflection:
      "A convenient interface must still respect permissions. Security decisions need to be part of the application architecture from the beginning.",
  },
  {
    slug: "heartcare-ml",
    name: "HeartCare ML",
    organization: "University of Calgary · Academic project",
    category: "Research",
    type: "Machine learning study",
    role: "ECG classification project",
    period: "2025",
    icon: "software",
    summary: "Exploring CNN and LSTM approaches to heartbeat classification with ECG data.",
    context:
      "HeartCare ML is an academic arrhythmia classification project using the MIT-BIH dataset. The study compares a 1D convolutional neural network with an LSTM approach to sequential ECG data.",
    contribution:
      "The project work covers ECG data preparation, model training and evaluation. It connects machine learning coursework with a concrete time-series classification problem.",
    technologies: ["Python", "1D CNN", "LSTM", "MIT-BIH dataset"],
    flow: ["Prepare ECG records", "Train models", "Compare predictions"],
    focus: [
      "Use a consistent data preparation process for both approaches.",
      "Compare convolutional and recurrent models on the same task.",
      "Keep the academic study distinct from a clinical application.",
    ],
    reflection:
      "Model comparisons are meaningful only when the data preparation and evaluation process are clear. This is an academic project, not a diagnostic service.",
  },
  {
    slug: "aws-performance-study",
    name: "AI Pong on AWS",
    organization: "University of Calgary · Academic project",
    category: "Research",
    type: "Performance evaluation",
    role: "Cloud workload experiments",
    period: "2026",
    icon: "systems",
    summary: "Studying how a cloud-hosted application responds to changing traffic patterns.",
    context:
      "This performance evaluation project uses an AI Pong application deployed with EC2, an Application Load Balancer and an Auto Scaling Group. A separate client generator drives the workload.",
    contribution:
      "The study examines baseline, ramp-up, spike and stability workloads. It looks at response time, failures and scaling behavior to understand how the application responds as demand changes.",
    technologies: ["AWS EC2", "Application Load Balancer", "Auto Scaling", "Load testing"],
    flow: ["Generate workload", "Observe scaling", "Analyze response times"],
    focus: [
      "Keep workload generation separate from the application server.",
      "Compare traffic patterns rather than relying on a single load level.",
      "Relate latency changes to saturation and scale-out behavior.",
    ],
    reflection:
      "A single average response time cannot explain how a system behaves. The workload shape and the timing of scaling decisions provide essential context.",
  },
];
