import { FormEvent, ReactNode, createContext, useContext, useEffect, useState } from "react";
import logoImg from "./images/logo.jpeg";

type Lang = "en" | "ar";
type IconName =
  | "arrow" | "building" | "check" | "chevron" | "close" | "crane" | "download"
  | "engineering" | "hardhat" | "mail" | "map" | "menu" | "phone" | "play"
  | "search" | "shield" | "tools" | "users";

const LangContext = createContext<Lang>("ar");
const useLang = () => useContext(LangContext);

const images = {
  hero: "https://images.unsplash.com/photo-1726087163038-2910e4de29e5?auto=format&fit=crop&w=2000&q=88",
  construction: "https://images.unsplash.com/photo-1726087165132-d64b2401728a?auto=format&fit=crop&w=1400&q=86",
  team: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=86",
  concrete: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1200&q=86",
  civic: "https://images.unsplash.com/photo-1569258592171-357ea26da4df?auto=format&fit=crop&w=1200&q=86",
  commercial: "https://images.unsplash.com/photo-1614595737476-42487331b8a1?auto=format&fit=crop&w=1200&q=86",
  residential: "https://images.unsplash.com/photo-1549791084-5f78368b208b?auto=format&fit=crop&w=1200&q=86",
  detail: "https://images.unsplash.com/photo-1726087162706-297148b1bf93?auto=format&fit=crop&w=1800&q=88",
  skyline: "https://images.unsplash.com/photo-1674822858255-fcc093a1ef43?auto=format&fit=crop&w=1400&q=86",
};

// ========== DICTIONARY ==========
const dictionary = {
  en: {
    // Nav
    home: "Home", about: "About Us", services: "Services", projects: "Projects",
    sectors: "Sectors", company: "Company", news: "News", careers: "Careers",
    contact: "Contact", quote: "Request a Quote",
    // Topbar
    workingHours: "Sunday – Thursday    8:00 AM – 5:00 PM",
    // Hero
    heroEyebrow: "Engineering excellence, built to last",
    heroTitle: "Building Today. Shaping Tomorrow.",
    heroText: "Integrated engineering, construction, and project delivery built on precision, accountability, and an uncompromising commitment to quality.",
    explore: "Explore Our Projects", trusted: "Trusted engineering partner",
    since: "Established 1998", scroll: "Discover our work",
    heroSide1: "AL–RAFAYA", heroSide2: "ENGINEERING & CONTRACTING",
    // Stats
    statYears: "Years of Experience", statCompleted: "Completed Projects",
    statOngoing: "Ongoing Projects", statEngineers: "Engineers & Professionals",
    statSectors: "Sectors Served",
    // About (home)
    aboutEyebrow: "Who we are", aboutTitle: "Built on trust. Driven by engineering.",
    aboutLead: "Al-Rafaya is a Saudi engineering and contracting company delivering complex, high-value projects across the Kingdom.",
    aboutP: "Since 1998, we have earned the confidence of public and private sector clients by combining technical depth, disciplined execution, and local insight. From first concept to final handover, every project is managed with clarity and care.",
    principle1Title: "Uncompromised Quality", principle1Text: "ISO-aligned systems at every stage",
    principle2Title: "Expert Teams", principle2Text: "320+ skilled professionals",
    learnMoreAbout: "Learn More About Us",
    yearsExcellence: "YEARS OF", yearsExcellence2: "EXCELLENCE",
    imageCaption: "Precision in every detail",
    // Services section
    servicesEyebrow: "Our capabilities",
    servicesTitle: "Integrated expertise. One trusted partner.",
    servicesText: "From complex civil works to precision fit-outs, our multidisciplinary teams deliver total project certainty.",
    viewDetails: "View Details", exploreAllServices: "Explore All Services",
    // Projects section
    projectsEyebrow: "Selected work", projectsTitle: "Projects that define progress.",
    projectsText: "A portfolio shaped by technical ambition, purposeful design, and enduring value.",
    viewAll: "View All Projects", noProjects: "No featured projects in this category yet.",
    // Sectors section
    sectorsEyebrow: "Sectors we serve",
    sectorsTitle: "Building capability across the industries that matter.",
    sectorsText: "Our sector expertise helps clients navigate complexity and deliver lasting impact.",
    exploreAllSectors: "Explore All Sectors",
    // Why section
    whyEyebrow: "The Al-Rafaya standard", whyTitle: "Why clients choose us.",
    whyText: "A delivery culture shaped by accountability, expertise, and a commitment to getting every detail right.",
    why1Big: "26+ Years", why1Title: "Proven Experience", why1Text: "Decades of successful delivery across diverse and demanding projects.",
    why2Big: "Zero Compromise", why2Title: "Safety First", why2Text: "Proactive risk management protects our people, partners, and communities.",
    why3Big: "320+ Experts", why3Title: "Professional Team", why3Text: "Multidisciplinary talent united by high standards and shared purpose.",
    why4Big: "96%", why4Title: "On-Time Delivery", why4Text: "Disciplined planning and transparent controls keep projects moving forward.",
    // Process
    processEyebrow: "How we work", processTitle: "A clear path from vision to reality.",
    processSteps: ["Consultation","Planning","Design & Engineering","Procurement","Construction","Quality & Safety","Handover"],
    // Quality
    qualityImageTitle: "Every decision. Every detail.", qualityImageText: "Measured against the highest standards.",
    qualityEyebrow: "Our commitments", qualityTitle: "Quality, safety, and responsibility are built in.",
    quality1Title: "Quality", quality1Text: "Rigorous inspection, testing, and assurance systems embedded throughout delivery.",
    quality2Title: "Safety", quality2Text: "A prevention-first culture supported by training, leadership, and clear accountability.",
    quality3Title: "Sustainability", quality3Text: "Responsible materials, efficient methods, and reduced environmental impact.",
    qualityBtn: "Our Commitments",
    // Certifications
    certEyebrow: "Certified to deliver", certTitle: "Standards you can trust.",
    certText: "Our systems and teams are independently assessed against recognized international standards.",
    cert1: "Quality Management", cert2: "Occupational Health & Safety",
    cert3: "Environmental Management", cert4: "Contractor Classification",
    trustedBy: "TRUSTED BY LEADING ORGANIZATIONS",
    // News
    newsEyebrow: "News & insights", newsTitle: "What's happening at Al-Rafaya.",
    viewAllNews: "View All News", readStory: "Read Story",
    news1Cat: "Company News", news1Date: "18 NOV 2025", news1Title: "Al-Rafaya awarded major Riyadh infrastructure contract",
    news2Cat: "Project Milestone", news2Date: "02 OCT 2025", news2Title: "Structural works completed at Al Waha Business District",
    news3Cat: "Sustainability", news3Date: "14 SEP 2025", news3Title: "Advancing responsible construction across our operations",
    // Final CTA
    ctaEyebrow: "Start a conversation", ctaTitle1: "Have a project in mind?",
    ctaTitle2: "Let's build it together.",
    ctaText: "Tell us about your project and discover what a dependable engineering partner can make possible.",
    contactUs: "Contact Us",
    // About page
    aboutPageEyebrow: "About Al-Rafaya", aboutPageTitle: "Engineering progress. Building confidence.",
    aboutPageText: "For more than 26 years, we have helped shape the Kingdom's built environment through responsible, precise, and dependable delivery.",
    storyEyebrow: "Our story", storyTitle: "A Saudi company with an enduring ambition.",
    storyLead: "Founded in Riyadh in 1998, Al-Rafaya began with a clear conviction: better engineering creates better outcomes for everyone.",
    storyP: "Today, we bring together more than 320 professionals across construction, infrastructure, MEP, fit-out, and project management. Our growth has been deliberate—built on client trust, technical capability, and consistent delivery.",
    meetTeam: "Meet Our Team",
    visionTitle: "Our Vision", visionText: "To be the Kingdom's most trusted engineering and contracting partner, recognized for shaping resilient, sustainable places.",
    missionTitle: "Our Mission", missionText: "To deliver projects with engineering rigor, transparent partnership, and an unwavering commitment to safety, quality, and value.",
    guidesEyebrow: "What guides us", guidesTitle: "Values that show up in our work.",
    values: ["Integrity","Excellence","Accountability","Collaboration"],
    valuesDesc: [
      "We act with honesty and transparency in every relationship.",
      "We raise the standard through discipline and continuous improvement.",
      "We take ownership of outcomes, from commitment to completion.",
      "We succeed by sharing expertise and working as one team.",
    ],
    // Timeline
    journeyEyebrow: "Our journey", journeyTitle: "Built steadily. Growing purposefully.",
    timeline: [
      ["1998","Company established in Riyadh"],
      ["2006","Expanded into civil infrastructure"],
      ["2014","Achieved Grade I classification"],
      ["2020","Launched integrated MEP division"],
      ["2025","180+ projects delivered nationwide"],
    ] as [string,string][],
    // Services page
    servicesPageEyebrow: "Our Services", servicesPageTitle: "Integrated capability. Exceptional delivery.",
    servicesPageText: "Multidisciplinary expertise, brought together under one accountable partner.",
    endToEndEyebrow: "End-to-end expertise", endToEndTitle: "Everything your project needs.",
    endToEndText: "Our specialists work as one team from early planning through construction, commissioning, and long-term care.",
    serviceBulletsA: ["Residential & commercial","Industrial facilities","Government buildings","Turnkey delivery"],
    serviceBulletsB: ["Design coordination","Specialist execution","Quality assurance","Lifecycle support"],
    // Service detail
    sdEyebrow: "Construction", sdTitle: "Building Construction",
    sdText: "From complex commercial developments to landmark public buildings, we turn ambitious plans into enduring assets.",
    onThisPage: "ON THIS PAGE",
    sdToc: ["Overview","What We Do","Capabilities","Our Process","Quality & Safety","Related Projects","FAQ"],
    sdOverviewEyebrow: "Service overview", sdOverviewTitle: "Complete construction delivery, without compromise.",
    sdLead: "Our construction teams manage every dimension of delivery—from mobilization and structural works through MEP integration, finishes, commissioning, and handover.",
    sdP: "We combine proven field leadership with disciplined project controls to protect quality, program, budget, and safety. Every project benefits from clear communication and a single point of accountability.",
    sdWhatWeDo: "What we do",
    sdCaps: ["Residential Construction","Commercial Buildings","Industrial Facilities","Government & Civic","Healthcare & Education","Turnkey Delivery"],
    sdCapText: "Integrated planning, execution, coordination, and assurance by experienced specialists.",
    sdRelatedEyebrow: "Related work", sdRelatedTitle: "Construction in practice.",
    // Projects page
    projectsPageEyebrow: "Our Projects", projectsPageTitle: "A portfolio built to perform.",
    projectsPageText: "Explore selected work across the sectors and communities we serve.",
    searchProjects: "Search projects", sortedByLatest: "Sorted by latest",
    projectsLabel: "PROJECTS", noMatch: "No projects match your current filters.",
    // Project detail
    completedLabel: "COMPLETED", clientLabel: "Client",
    projectTypeLabel: "Project Type", builtupLabel: "Built-up Area",
    contractValueLabel: "Contract Value", durationLabel: "Duration", completionLabel: "Completion",
    projectOverviewEyebrow: "Project overview",
    projectOverviewTitle: "A workplace destination engineered for a new era.",
    projectOverviewLead: "Al Waha Business District is a high-performance mixed-use campus that brings together Grade A office space, retail, and landscaped public areas.",
    projectOverviewP: "Al-Rafaya led complete construction delivery, coordinating a complex structural system, advanced MEP infrastructure, premium finishes, and external works. The completed development creates an efficient and distinctive commercial address for Riyadh.",
    scopeEyebrow: "Scope of work", scopeTitle: "Comprehensive delivery.",
    scopeItems: ["Civil & Structural Works","Mechanical, Electrical & Plumbing","Interior & Exterior Finishes","Landscape & Public Realm","Testing & Commissioning"],
    challengesEyebrow: "Challenges & solutions", challengesTitle: "Solving complexity through coordination.",
    challengesP: "With a constrained urban site and multiple specialist packages, close sequencing was essential. Our team implemented coordinated BIM reviews, just-in-time logistics, and zone-based handovers to protect the program.",
    challengesQuote: "\"Integrated planning enabled the team to complete the structural package three weeks ahead of the baseline program.\"",
    // Sectors page
    sectorsPageEyebrow: "Sectors", sectorsPageTitle: "Expertise for every environment.",
    sectorsPageText: "Deep sector understanding helps us solve the right problems and build assets that perform for decades.",
    sectorDesc: "Specialized engineering, construction, and delivery expertise aligned to the sector's unique operational needs.",
    exploreProjects: "Explore projects",
    // Company page
    companyPageEyebrow: "Our Company", companyPageTitle: "People, standards, and purpose.",
    companyPageText: "Meet the team and commitments behind every Al-Rafaya project.",
    leadershipEyebrow: "Leadership", leadershipTitle: "Led by experience. United by purpose.",
    leadershipText: "Our leadership team brings deep local knowledge and multidisciplinary project expertise.",
    teamRoles: ["Chairman","Chief Executive Officer","Chief Operations Officer","Director of Engineering"],
    execLeadership: "Executive leadership",
    // Careers
    careersEyebrow: "Careers", careersTitle: "Build what matters. Grow with us.",
    careersText: "Join a team of people who take pride in solving difficult problems and delivering work that lasts.",
    openPositionsEyebrow: "Open positions", openPositionsTitle: "Find your next opportunity.",
    openPositionsText: "We are always looking for talented, principled professionals to join our growing team.",
    fullTime: "Full-time", experience: "experience", viewPosition: "View Position",
    // News page
    newsPageEyebrow: "News & Insights", newsPageTitle: "Ideas, progress, and perspectives.",
    newsPageText: "Updates from our projects, people, and the wider engineering industry.",
    industryInsights: "Industry Insights",
    newsItems: [
      "How digital coordination is transforming project delivery",
      "Engineering resilient infrastructure for growing cities",
      "Five principles for safer construction sites",
    ],
    // FAQ
    faqEyebrow: "Frequently asked questions", faqTitle: "What would you like to know?",
    faqQuestions: [
      ["What types of projects does Al-Rafaya deliver?","We deliver residential, commercial, industrial, infrastructure, hospitality, healthcare, education, and government projects across Saudi Arabia."],
      ["Can you provide design-and-build services?","Yes. Our integrated teams can manage design coordination, engineering, procurement, construction, commissioning, and handover under one contract."],
      ["How do I request a project quotation?","Use our Request a Quote form and share the available project details. Our business development team will respond within two working days."],
      ["Do you undertake maintenance and renovation work?","Yes. We provide planned and reactive maintenance, facility management, rehabilitation, fit-out, and renovation services."],
    ] as [string,string][],
    faqPageEyebrow: "FAQ", faqPageTitle: "Clear answers. Better decisions.",
    faqPageText: "Answers to common questions about our services, delivery approach, and working with Al-Rafaya.",
    // Downloads
    downloadsEyebrow: "Resources", downloadsTitle: "Documents & downloads.",
    downloadItems: ["Company Profile 2025","Corporate Brochure","Certifications & Accreditations","Prequalification Document","Quality Policy","Health & Safety Policy"],
    downloadsPageEyebrow: "Downloads", downloadsPageTitle: "Company resources.",
    downloadsPageText: "Access our latest corporate, policy, and prequalification documents.",
    // Form
    applyNow: "Apply now", startConversation: "Start a conversation",
    joinTeam: "Join our team.", tellUsProject: "Tell us about your project.", howCanHelp: "How can we help?",
    formIntro: "Share a few details and the right member of our team will contact you within two working days.",
    callUs: "Call us", emailUs: "Email us", headOffice: "Head office",
    headOfficeAddress: "King Fahd Road, Riyadh, Saudi Arabia",
    thankYou: "Thank you for contacting us.",
    thankYouText: "Your request has been received. Our team will be in touch shortly.",
    sendAnother: "Send Another Request",
    fullName: "Full Name", yourFullName: "Your full name",
    emailAddress: "Email Address", company: "Company", companyName: "Company name",
    phoneNumber: "Phone Number", projectType: "Project Type", selectProjectType: "Select project type",
    projectLocation: "Project Location", cityRegion: "City, region",
    estimatedArea: "Estimated Area", squareMeters: "Square meters",
    estimatedBudget: "Estimated Budget", selectBudget: "Select budget range",
    position: "Position", linkedin: "LinkedIn Profile",
    coverLetter: "Cover Letter", projectDesc: "Project Description / Message",
    projectPlaceholder: "Tell us about your requirements...",
    uploadCv: "Upload your CV", uploadDocs: "Upload drawings, BOQ, or documents",
    fileTypes: "PDF, DOCX, DWG or ZIP · Max 20MB",
    privacyAgree: "By submitting, you agree to our privacy policy.",
    submitApplication: "Submit Application", submitRequest: "Submit Request", sendMessage: "Send Message",
    construction: "Construction", infrastructure: "Infrastructure", mep: "MEP", fitOut: "Fit-Out",
    budget1: "SAR 1M – 5M", budget2: "SAR 5M – 25M", budget3: "SAR 25M+",
    // Quote/Contact
    quoteEyebrow: "Request a Quote", quoteTitle: "Let's bring your project to life.",
    quoteText: "Share your project requirements. Our team will review them carefully and respond with the right next steps.",
    contactEyebrow: "Contact Us", contactTitle: "We're ready to listen.",
    contactText: "Whether you have a project, a partnership opportunity, or a question, we would be pleased to hear from you.",
    headOfficeLocation: "Al-Rafaya Head Office", kingFahdRoad: "King Fahd Road, Riyadh",
    // Footer
    footerTagline1: "Engineering confidence.", footerTagline2: "Building enduring value.",
    footerCompany: "Company", footerServices: "Services", footerProjects: "Projects", footerResources: "Resources",
    footerCompanyLinks: ["About Us","Our Team","Careers","Certifications"],
    footerServicesLinks: ["Construction","Infrastructure","MEP","Engineering","Finishing","Maintenance"],
    footerProjectsLinks: ["All Projects","Ongoing Projects","Completed Projects"],
    footerResourcesLinks: ["Company Profile","News & Insights","FAQ","Downloads"],
    footerContact: "Contact", footerAddress: "King Fahd Road\nRiyadh, Saudi Arabia",
    copyright: "© 2025 Al-Rafaya Engineering & Contracting Co.",
    privacyPolicy: "Privacy Policy", termsConditions: "Terms & Conditions",
    madeForProgress: "Made for progress.",
    // Category labels
    catAll: "All", catResidential: "Residential", catCommercial: "Commercial",
    catIndustrial: "Industrial", catInfrastructure: "Infrastructure",
    catHospitality: "Hospitality", catHealthcare: "Healthcare",
    catEducation: "Education", catGovernment: "Government",
    catCompleted: "Completed", catOngoing: "Ongoing", catUpcoming: "Upcoming",
    saudiArabia: "Saudi Arabia", riyadh: "Riyadh", jeddah: "Jeddah",
    dammam: "Dammam", alKhobar: "Al Khobar",
    companyProfile: "Company Profile", newsAndInsights: "News & Insights",
    ourTeam: "Our Team", certifications: "Certifications",
    qualitySafety: "Quality & Safety", sustainability: "Sustainability",
  },
  ar: {
    // Nav
    home: "الرئيسية", about: "من نحن", services: "خدماتنا", projects: "مشاريعنا",
    sectors: "القطاعات", company: "الشركة", news: "الأخبار", careers: "الوظائف",
    contact: "اتصل بنا", quote: "اطلب عرض سعر",
    // Topbar
    workingHours: "الأحد – الخميس    ٨:٠٠ ص – ٥:٠٠ م",
    // Hero
    heroEyebrow: "تميّز هندسي مبني ليدوم",
    heroTitle: "نبني اليوم. لنصنع الغد.",
    heroText: "حلول متكاملة في الهندسة والإنشاء وإدارة المشاريع، ترتكز على الدقة والمسؤولية والالتزام الراسخ بالجودة.",
    explore: "استكشف مشاريعنا", trusted: "شريككم الهندسي الموثوق",
    since: "تأسست عام 1998", scroll: "اكتشف أعمالنا",
    heroSide1: "الرفايعة", heroSide2: "للهندسة والمقاولات",
    // Stats
    statYears: "سنة من الخبرة", statCompleted: "مشروع مكتمل",
    statOngoing: "مشروع قيد التنفيذ", statEngineers: "مهندس ومتخصص",
    statSectors: "قطاعات نخدمها",
    // About (home)
    aboutEyebrow: "من نحن", aboutTitle: "بُنيت على الثقة. تقودها الهندسة.",
    aboutLead: "الرفايعة شركة سعودية للهندسة والمقاولات، تنفذ مشاريع معقدة وعالية القيمة في جميع أنحاء المملكة.",
    aboutP: "منذ عام 1998، اكتسبنا ثقة عملائنا من القطاعين العام والخاص من خلال الجمع بين العمق التقني والتنفيذ المنضبط والفهم المحلي العميق. من الفكرة الأولى حتى التسليم النهائي، يُدار كل مشروع بوضوح وعناية.",
    principle1Title: "جودة بلا تنازلات", principle1Text: "أنظمة متوافقة مع ISO في كل مرحلة",
    principle2Title: "فرق خبيرة", principle2Text: "أكثر من 320 متخصصاً ماهراً",
    learnMoreAbout: "اعرف المزيد عنا",
    yearsExcellence: "عاماً من", yearsExcellence2: "التميّز",
    imageCaption: "الدقة في كل تفصيلة",
    // Services section
    servicesEyebrow: "قدراتنا",
    servicesTitle: "خبرة متكاملة. شريك واحد موثوق.",
    servicesText: "من الأعمال المدنية المعقدة إلى التشطيبات الدقيقة، تقدّم فرقنا متعددة التخصصات يقيناً كاملاً في المشروع.",
    viewDetails: "عرض التفاصيل", exploreAllServices: "استكشف جميع الخدمات",
    // Projects section
    projectsEyebrow: "أعمال مختارة", projectsTitle: "مشاريع ترسم ملامح التقدم.",
    projectsText: "محفظة أعمال تشكّلت بالطموح التقني والتصميم الهادف والقيمة المستدامة.",
    viewAll: "عرض جميع المشاريع", noProjects: "لا توجد مشاريع مميزة في هذه الفئة حتى الآن.",
    // Sectors section
    sectorsEyebrow: "القطاعات التي نخدمها",
    sectorsTitle: "نبني القدرات عبر القطاعات الحيوية.",
    sectorsText: "خبرتنا القطاعية تساعد العملاء على تجاوز التعقيدات وتحقيق أثر دائم.",
    exploreAllSectors: "استكشف جميع القطاعات",
    // Why section
    whyEyebrow: "معيار الرفايعة", whyTitle: "لماذا يختارنا العملاء.",
    whyText: "ثقافة تنفيذ قوامها المسؤولية والخبرة والالتزام بإتقان كل تفصيلة.",
    why1Big: "+26 سنة", why1Title: "خبرة موثوقة", why1Text: "عقود من التنفيذ الناجح عبر مشاريع متنوعة ومتطلبة.",
    why2Big: "صفر تنازلات", why2Title: "السلامة أولاً", why2Text: "إدارة استباقية للمخاطر تحمي أفرادنا وشركاءنا ومجتمعاتنا.",
    why3Big: "+320 خبيراً", why3Title: "فريق احترافي", why3Text: "كفاءات متعددة التخصصات تجمعها معايير عالية وهدف مشترك.",
    why4Big: "96%", why4Title: "التسليم في الموعد", why4Text: "تخطيط منضبط وضوابط شفافة تُبقي المشاريع في مسارها.",
    // Process
    processEyebrow: "كيف نعمل", processTitle: "مسار واضح من الرؤية إلى الواقع.",
    processSteps: ["الاستشارة","التخطيط","التصميم والهندسة","المشتريات","الإنشاء","الجودة والسلامة","التسليم"],
    // Quality
    qualityImageTitle: "كل قرار. كل تفصيلة.", qualityImageText: "تُقاس وفق أعلى المعايير.",
    qualityEyebrow: "التزاماتنا", qualityTitle: "الجودة والسلامة والمسؤولية مدمجة في كل شيء.",
    quality1Title: "الجودة", quality1Text: "أنظمة تفتيش واختبار وضمان صارمة مدمجة في جميع مراحل التنفيذ.",
    quality2Title: "السلامة", quality2Text: "ثقافة الوقاية أولاً، مدعومة بالتدريب والقيادة والمساءلة الواضحة.",
    quality3Title: "الاستدامة", quality3Text: "مواد مسؤولة، وأساليب فعّالة، وتقليل الأثر البيئي.",
    qualityBtn: "التزاماتنا",
    // Certifications
    certEyebrow: "معتمدون للتنفيذ", certTitle: "معايير تستحق ثقتكم.",
    certText: "أنظمتنا وفرقنا تخضع لتقييمات مستقلة وفق المعايير الدولية المعتمدة.",
    cert1: "إدارة الجودة", cert2: "الصحة والسلامة المهنية",
    cert3: "الإدارة البيئية", cert4: "تصنيف المقاولين",
    trustedBy: "موثوقون من قِبل كبرى المؤسسات",
    // News
    newsEyebrow: "الأخبار والرؤى", newsTitle: "ما يحدث في الرفايعة.",
    viewAllNews: "عرض جميع الأخبار", readStory: "اقرأ القصة",
    news1Cat: "أخبار الشركة", news1Date: "١٨ نوفمبر ٢٠٢٥", news1Title: "الرفايعة تفوز بعقد بنية تحتية رئيسي في الرياض",
    news2Cat: "إنجاز مشروع", news2Date: "٠٢ أكتوبر ٢٠٢٥", news2Title: "إتمام الأعمال الإنشائية في حي الواحة التجاري",
    news3Cat: "الاستدامة", news3Date: "١٤ سبتمبر ٢٠٢٥", news3Title: "نعزز البناء المسؤول في جميع عملياتنا",
    // Final CTA
    ctaEyebrow: "ابدأ حواراً", ctaTitle1: "لديك مشروع في ذهنك؟",
    ctaTitle2: "لنبنِه معاً.",
    ctaText: "حدّثنا عن مشروعك واكتشف ما يمكن أن يقدمه شريك هندسي موثوق.",
    contactUs: "اتصل بنا",
    // About page
    aboutPageEyebrow: "عن الرفايعة", aboutPageTitle: "تقدم هندسي. بناء ثقة.",
    aboutPageText: "منذ أكثر من 26 عاماً، نساهم في تشكيل البيئة العمرانية في المملكة من خلال تنفيذ مسؤول ودقيق وموثوق.",
    storyEyebrow: "قصتنا", storyTitle: "شركة سعودية بطموح راسخ.",
    storyLead: "تأسست الرفايعة في الرياض عام 1998 بقناعة واضحة: الهندسة الأفضل تخلق نتائج أفضل للجميع.",
    storyP: "اليوم، نجمع أكثر من 320 متخصصاً في الإنشاء والبنية التحتية والأنظمة الكهروميكانيكية والتشطيبات وإدارة المشاريع. كان نموّنا مدروساً — قائماً على ثقة العملاء والقدرة التقنية والتنفيذ المتسق.",
    meetTeam: "تعرّف على فريقنا",
    visionTitle: "رؤيتنا", visionText: "أن نكون الشريك الهندسي والمقاول الأكثر ثقة في المملكة، معروفين بتشكيل أماكن مرنة ومستدامة.",
    missionTitle: "مهمتنا", missionText: "تنفيذ المشاريع بصرامة هندسية وشراكة شفافة والتزام راسخ بالسلامة والجودة والقيمة.",
    guidesEyebrow: "ما يوجهنا", guidesTitle: "قيم تظهر في أعمالنا.",
    values: ["النزاهة","التميّز","المسؤولية","التعاون"],
    valuesDesc: [
      "نتصرف بصدق وشفافية في كل علاقة.",
      "نرفع مستوى المعايير عبر الانضباط والتحسين المستمر.",
      "نتحمل مسؤولية النتائج، من الالتزام حتى الإنجاز.",
      "ننجح من خلال تبادل الخبرات والعمل كفريق واحد.",
    ],
    // Timeline
    journeyEyebrow: "مسيرتنا", journeyTitle: "نمو ثابت. وهدف واضح.",
    timeline: [
      ["1998","تأسيس الشركة في الرياض"],
      ["2006","التوسع في البنية التحتية المدنية"],
      ["2014","الحصول على تصنيف الدرجة الأولى"],
      ["2020","إطلاق قسم الأنظمة الكهروميكانيكية المتكاملة"],
      ["2025","تسليم أكثر من 180 مشروعاً على مستوى المملكة"],
    ] as [string,string][],
    // Services page
    servicesPageEyebrow: "خدماتنا", servicesPageTitle: "قدرات متكاملة. تنفيذ استثنائي.",
    servicesPageText: "خبرات متعددة التخصصات، مجتمعة تحت شريك واحد مسؤول.",
    endToEndEyebrow: "خبرة شاملة", endToEndTitle: "كل ما يحتاجه مشروعك.",
    endToEndText: "يعمل متخصصونا كفريق واحد من التخطيط المبكر عبر الإنشاء والتشغيل والرعاية طويلة الأمد.",
    serviceBulletsA: ["سكني وتجاري","مرافق صناعية","مبانٍ حكومية","تسليم مفتاح"],
    serviceBulletsB: ["تنسيق التصميم","تنفيذ متخصص","ضمان الجودة","دعم دورة الحياة"],
    // Service detail
    sdEyebrow: "الإنشاء", sdTitle: "إنشاء المباني",
    sdText: "من المشاريع التجارية المعقدة إلى المباني العامة البارزة، نحوّل الخطط الطموحة إلى أصول تدوم.",
    onThisPage: "في هذه الصفحة",
    sdToc: ["نظرة عامة","ما نقوم به","القدرات","منهجيتنا","الجودة والسلامة","مشاريع ذات صلة","الأسئلة الشائعة"],
    sdOverviewEyebrow: "نظرة عامة على الخدمة", sdOverviewTitle: "تنفيذ إنشائي كامل، بلا تنازلات.",
    sdLead: "تدير فرق الإنشاء لدينا كل أبعاد التنفيذ — من التعبئة والأعمال الإنشائية عبر دمج الأنظمة الكهروميكانيكية والتشطيبات والتشغيل والتسليم.",
    sdP: "نجمع بين قيادة ميدانية مثبتة وضوابط مشروع منضبطة لحماية الجودة والبرنامج والميزانية والسلامة. يستفيد كل مشروع من تواصل واضح ومسؤولية واحدة.",
    sdWhatWeDo: "ما نقوم به",
    sdCaps: ["الإنشاء السكني","المباني التجارية","المرافق الصناعية","الحكومي والمدني","الرعاية الصحية والتعليم","التسليم المفتاحي"],
    sdCapText: "تخطيط وتنفيذ وتنسيق وضمان متكامل من قِبل متخصصين ذوي خبرة.",
    sdRelatedEyebrow: "أعمال ذات صلة", sdRelatedTitle: "الإنشاء في الواقع.",
    // Projects page
    projectsPageEyebrow: "مشاريعنا", projectsPageTitle: "محفظة مبنية للأداء.",
    projectsPageText: "استكشف أعمالاً مختارة عبر القطاعات والمجتمعات التي نخدمها.",
    searchProjects: "ابحث في المشاريع", sortedByLatest: "الترتيب حسب الأحدث",
    projectsLabel: "مشروع", noMatch: "لا توجد مشاريع تطابق عوامل التصفية الحالية.",
    // Project detail
    completedLabel: "مكتمل", clientLabel: "العميل",
    projectTypeLabel: "نوع المشروع", builtupLabel: "المساحة المبنية",
    contractValueLabel: "قيمة العقد", durationLabel: "المدة", completionLabel: "تاريخ الإنجاز",
    projectOverviewEyebrow: "نظرة عامة على المشروع",
    projectOverviewTitle: "وجهة عمل مصممة هندسياً لحقبة جديدة.",
    projectOverviewLead: "حي الواحة التجاري مجمع متعدد الاستخدامات عالي الأداء يجمع بين مساحات مكتبية من الدرجة الأولى ومتاجر ومساحات عامة منسقة.",
    projectOverviewP: "قادت الرفايعة التنفيذ الإنشائي الكامل، بتنسيق نظام إنشائي معقد وبنية تحتية متقدمة للأنظمة الكهروميكانيكية وتشطيبات فاخرة وأعمال خارجية. يخلق المشروع المكتمل عنواناً تجارياً مميزاً وفعّالاً للرياض.",
    scopeEyebrow: "نطاق العمل", scopeTitle: "تنفيذ شامل.",
    scopeItems: ["الأعمال المدنية والإنشائية","الكهروميكانيكية والسباكة","التشطيبات الداخلية والخارجية","تنسيق المواقع والفضاء العام","الاختبار والتشغيل"],
    challengesEyebrow: "التحديات والحلول", challengesTitle: "حل التعقيد عبر التنسيق.",
    challengesP: "مع موقع حضري محدود وحزم متخصصة متعددة، كان التسلسل الدقيق ضرورياً. نفّذ فريقنا مراجعات BIM منسقة ولوجستيات في الوقت المناسب وتسليماً حسب المناطق لحماية البرنامج.",
    challengesQuote: "«مكّن التخطيط المتكامل الفريق من إكمال الحزمة الإنشائية قبل ثلاثة أسابيع من البرنامج الأساسي.»",
    // Sectors page
    sectorsPageEyebrow: "القطاعات", sectorsPageTitle: "خبرة لكل بيئة.",
    sectorsPageText: "الفهم العميق للقطاع يساعدنا على حل المشكلات الصحيحة وبناء أصول تخدم لعقود.",
    sectorDesc: "خبرة هندسية وإنشائية وتنفيذية متخصصة تتوافق مع الاحتياجات التشغيلية الفريدة للقطاع.",
    exploreProjects: "استكشف المشاريع",
    // Company page
    companyPageEyebrow: "شركتنا", companyPageTitle: "أشخاص ومعايير وهدف.",
    companyPageText: "تعرّف على الفريق والالتزامات وراء كل مشروع من مشاريع الرفايعة.",
    leadershipEyebrow: "القيادة", leadershipTitle: "قيادة بالخبرة. ووحدة بالهدف.",
    leadershipText: "يجمع فريق قيادتنا بين المعرفة المحلية العميقة والخبرة متعددة التخصصات في المشاريع.",
    teamRoles: ["رئيس مجلس الإدارة","الرئيس التنفيذي","الرئيس التنفيذي للعمليات","مديرة الهندسة"],
    execLeadership: "القيادة التنفيذية",
    // Careers
    careersEyebrow: "الوظائف", careersTitle: "ابنِ ما يهم. وانمُ معنا.",
    careersText: "انضم إلى فريق يفخر بحل المشكلات الصعبة وتقديم أعمال تدوم.",
    openPositionsEyebrow: "الوظائف المتاحة", openPositionsTitle: "اعثر على فرصتك القادمة.",
    openPositionsText: "نبحث دائماً عن محترفين موهوبين وأصحاب مبادئ للانضمام إلى فريقنا المتنامي.",
    fullTime: "دوام كامل", experience: "خبرة", viewPosition: "عرض الوظيفة",
    // News page
    newsPageEyebrow: "الأخبار والرؤى", newsPageTitle: "أفكار وتقدم ورؤى.",
    newsPageText: "تحديثات من مشاريعنا وفريقنا وقطاع الهندسة الأوسع.",
    industryInsights: "رؤى القطاع",
    newsItems: [
      "كيف يغيّر التنسيق الرقمي تنفيذ المشاريع",
      "هندسة بنية تحتية مرنة للمدن النامية",
      "خمسة مبادئ لمواقع إنشاء أكثر أماناً",
    ],
    // FAQ
    faqEyebrow: "الأسئلة الشائعة", faqTitle: "ما الذي تودّ معرفته؟",
    faqQuestions: [
      ["ما أنواع المشاريع التي تنفذها الرفايعة؟","ننفذ مشاريع سكنية وتجارية وصناعية وبنية تحتية وضيافة ورعاية صحية وتعليمية وحكومية في جميع أنحاء المملكة العربية السعودية."],
      ["هل تقدمون خدمات التصميم والتنفيذ؟","نعم. تستطيع فرقنا المتكاملة إدارة تنسيق التصميم والهندسة والمشتريات والإنشاء والتشغيل والتسليم بموجب عقد واحد."],
      ["كيف أطلب عرض سعر لمشروع؟","استخدم نموذج طلب عرض السعر وشارك تفاصيل المشروع المتاحة. سيرد فريق تطوير الأعمال خلال يومي عمل."],
      ["هل تقومون بأعمال الصيانة والترميم؟","نعم. نقدم خدمات الصيانة المخططة والاستباقية وإدارة المرافق وإعادة التأهيل والتشطيب والترميم."],
    ] as [string,string][],
    faqPageEyebrow: "الأسئلة الشائعة", faqPageTitle: "إجابات واضحة. قرارات أفضل.",
    faqPageText: "إجابات عن الأسئلة الشائعة حول خدماتنا ومنهجيتنا في التنفيذ والعمل مع الرفايعة.",
    // Downloads
    downloadsEyebrow: "المصادر", downloadsTitle: "المستندات والتحميلات.",
    downloadItems: ["الملف التعريفي للشركة 2025","الكتيب التعريفي","الشهادات والاعتمادات","وثيقة التأهيل المسبق","سياسة الجودة","سياسة الصحة والسلامة"],
    downloadsPageEyebrow: "التحميلات", downloadsPageTitle: "موارد الشركة.",
    downloadsPageText: "اطّلع على أحدث المستندات التعريفية والسياسات ووثائق التأهيل المسبق.",
    // Form
    applyNow: "قدّم الآن", startConversation: "ابدأ حواراً",
    joinTeam: "انضم إلى فريقنا.", tellUsProject: "حدّثنا عن مشروعك.", howCanHelp: "كيف يمكننا المساعدة؟",
    formIntro: "شارك بعض التفاصيل وسيتواصل معك العضو المناسب من فريقنا خلال يومي عمل.",
    callUs: "اتصل بنا", emailUs: "راسلنا", headOffice: "المقر الرئيسي",
    headOfficeAddress: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    thankYou: "شكراً لتواصلك معنا.",
    thankYouText: "تم استلام طلبك. سيتواصل معك فريقنا قريباً.",
    sendAnother: "إرسال طلب آخر",
    fullName: "الاسم الكامل", yourFullName: "اسمك الكامل",
    emailAddress: "البريد الإلكتروني", company: "الشركة", companyName: "اسم الشركة",
    phoneNumber: "رقم الجوال", projectType: "نوع المشروع", selectProjectType: "اختر نوع المشروع",
    projectLocation: "موقع المشروع", cityRegion: "المدينة، المنطقة",
    estimatedArea: "المساحة التقديرية", squareMeters: "متر مربع",
    estimatedBudget: "الميزانية التقديرية", selectBudget: "اختر نطاق الميزانية",
    position: "الوظيفة", linkedin: "الملف على LinkedIn",
    coverLetter: "رسالة التقديم", projectDesc: "وصف المشروع / الرسالة",
    projectPlaceholder: "حدّثنا عن متطلباتك...",
    uploadCv: "ارفع سيرتك الذاتية", uploadDocs: "ارفع المخططات أو جدول الكميات أو المستندات",
    fileTypes: "PDF, DOCX, DWG أو ZIP · الحد الأقصى 20 ميجابايت",
    privacyAgree: "بالإرسال، أنت توافق على سياسة الخصوصية.",
    submitApplication: "إرسال الطلب", submitRequest: "إرسال الطلب", sendMessage: "إرسال الرسالة",
    construction: "إنشاء", infrastructure: "بنية تحتية", mep: "كهروميكانيكية", fitOut: "تشطيبات",
    budget1: "١ – ٥ مليون ريال", budget2: "٥ – ٢٥ مليون ريال", budget3: "أكثر من ٢٥ مليون ريال",
    // Quote/Contact
    quoteEyebrow: "طلب عرض سعر", quoteTitle: "لنحوّل مشروعك إلى واقع.",
    quoteText: "شارك متطلبات مشروعك. سيراجعها فريقنا بعناية ويرد بالخطوات التالية المناسبة.",
    contactEyebrow: "اتصل بنا", contactTitle: "نحن مستعدون للاستماع.",
    contactText: "سواء كان لديك مشروع أو فرصة شراكة أو سؤال، يسعدنا التواصل معك.",
    headOfficeLocation: "المقر الرئيسي للرفايعة", kingFahdRoad: "طريق الملك فهد، الرياض",
    // Footer
    footerTagline1: "ثقة هندسية.", footerTagline2: "نبني قيمة تدوم.",
    footerCompany: "الشركة", footerServices: "الخدمات", footerProjects: "المشاريع", footerResources: "المصادر",
    footerCompanyLinks: ["من نحن","فريقنا","الوظائف","الشهادات"],
    footerServicesLinks: ["الإنشاء","البنية التحتية","الكهروميكانيكية","الهندسة","التشطيبات","الصيانة"],
    footerProjectsLinks: ["جميع المشاريع","مشاريع قيد التنفيذ","المشاريع المكتملة"],
    footerResourcesLinks: ["الملف التعريفي","الأخبار والرؤى","الأسئلة الشائعة","التحميلات"],
    footerContact: "تواصل معنا", footerAddress: "طريق الملك فهد\nالرياض، المملكة العربية السعودية",
    copyright: "© 2025 شركة الرفايعة للهندسة والمقاولات",
    privacyPolicy: "سياسة الخصوصية", termsConditions: "الشروط والأحكام",
    madeForProgress: "صُنع من أجل التقدم.",
    // Category labels
    catAll: "الكل", catResidential: "سكني", catCommercial: "تجاري",
    catIndustrial: "صناعي", catInfrastructure: "بنية تحتية",
    catHospitality: "ضيافة", catHealthcare: "رعاية صحية",
    catEducation: "تعليم", catGovernment: "حكومي",
    catCompleted: "مكتمل", catOngoing: "قيد التنفيذ", catUpcoming: "قادم",
    saudiArabia: "المملكة العربية السعودية", riyadh: "الرياض", jeddah: "جدة",
    dammam: "الدمام", alKhobar: "الخبر",
    companyProfile: "الملف التعريفي", newsAndInsights: "الأخبار والرؤى",
    ourTeam: "فريقنا", certifications: "الشهادات",
    qualitySafety: "الجودة والسلامة", sustainability: "الاستدامة",
  },
} as const;

type Dict = typeof dictionary.en;

// ========== SERVICE ITEMS ==========
const serviceItems: { icon: IconName; name: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  { icon: "building", name: { en: "Building Construction", ar: "إنشاء المباني" },
    desc: { en: "End-to-end delivery of landmark residential, commercial, and public buildings.", ar: "تنفيذ شامل للمباني السكنية والتجارية والعامة البارزة." } },
  { icon: "crane", name: { en: "Civil & Infrastructure", ar: "الأعمال المدنية والبنية التحتية" },
    desc: { en: "High-performance roads, utilities, earthworks, and urban infrastructure.", ar: "طرق ومرافق وأعمال ترابية وبنية تحتية حضرية عالية الأداء." } },
  { icon: "tools", name: { en: "MEP Solutions", ar: "حلول الأنظمة الكهروميكانيكية" },
    desc: { en: "Integrated mechanical, electrical, plumbing, HVAC, and fire protection systems.", ar: "أنظمة متكاملة للميكانيكا والكهرباء والسباكة والتكييف ومكافحة الحريق." } },
  { icon: "engineering", name: { en: "Engineering & PM", ar: "الهندسة وإدارة المشاريع" },
    desc: { en: "Disciplined design coordination, cost control, planning, and project leadership.", ar: "تنسيق منضبط للتصميم وضبط التكاليف والتخطيط وقيادة المشروع." } },
  { icon: "check", name: { en: "Finishing & Fit-Out", ar: "التشطيبات والديكور" },
    desc: { en: "Precision interiors and exterior finishes crafted to exacting standards.", ar: "تشطيبات داخلية وخارجية دقيقة وفق أعلى المعايير." } },
  { icon: "hardhat", name: { en: "Maintenance & Renovation", ar: "الصيانة والترميم" },
    desc: { en: "Proactive asset care, rehabilitation, and facility lifecycle support.", ar: "رعاية استباقية للأصول وإعادة تأهيل ودعم دورة حياة المرافق." } },
];

// ========== PROJECTS ==========
type Project = {
  name: Record<Lang, string>;
  place: Record<Lang, string>;
  type: Record<Lang, string>;
  year: string;
  status: Record<Lang, string>;
  image: string;
};

const projects: Project[] = [
  { name: { en: "Al Waha Business District", ar: "حي الواحة التجاري" },
    place: { en: "Riyadh", ar: "الرياض" }, type: { en: "Commercial", ar: "تجاري" },
    year: "2024", status: { en: "Completed", ar: "مكتمل" }, image: images.commercial },
  { name: { en: "North Riyadh Residences", ar: "مساكن شمال الرياض" },
    place: { en: "Riyadh", ar: "الرياض" }, type: { en: "Residential", ar: "سكني" },
    year: "2025", status: { en: "Ongoing", ar: "قيد التنفيذ" }, image: images.residential },
  { name: { en: "Industrial Logistics Hub", ar: "مركز الخدمات اللوجستية الصناعي" },
    place: { en: "Dammam", ar: "الدمام" }, type: { en: "Industrial", ar: "صناعي" },
    year: "2024", status: { en: "Completed", ar: "مكتمل" }, image: images.concrete },
  { name: { en: "Civic Administration Center", ar: "مركز الإدارة المدنية" },
    place: { en: "Jeddah", ar: "جدة" }, type: { en: "Government", ar: "حكومي" },
    year: "2025", status: { en: "Ongoing", ar: "قيد التنفيذ" }, image: images.civic },
  { name: { en: "Eastern Utilities Corridor", ar: "ممر المرافق الشرقي" },
    place: { en: "Al Khobar", ar: "الخبر" }, type: { en: "Infrastructure", ar: "بنية تحتية" },
    year: "2023", status: { en: "Completed", ar: "مكتمل" }, image: images.detail },
  { name: { en: "Meridian Medical Campus", ar: "مجمع ميريديان الطبي" },
    place: { en: "Riyadh", ar: "الرياض" }, type: { en: "Healthcare", ar: "رعاية صحية" },
    year: "2026", status: { en: "Upcoming", ar: "قادم" }, image: images.construction },
];

// ========== ICON ==========
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    building: <><path d="M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1M2 21h20" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevron: <><path d="m7 10 5 5 5-5" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    crane: <><path d="M5 21V4h12M3 7h17M8 4l4 3M17 7v5M14 12h6M17 12v4M2 21h7" /></>,
    download: <><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" /></>,
    engineering: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
    hardhat: <><path d="M4 15a8 8 0 0 1 16 0M9 15V7m6 8V7M3 15h18v3H3z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M12 22s7-6 7-13a7 7 0 1 0-14 0c0 7 7 13 7 13z" /><circle cx="12" cy="9" r="2" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <><path d="M6 3h4l2 5-3 2a15 15 0 0 0 5 5l2-3 5 2v4c0 2-2 3-4 3A17 17 0 0 1 3 7c0-2 1-4 3-4z" /></>,
    play: <><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-5" /></>,
    tools: <><path d="m14 7 3-3 3 3-3 3M14 7l-9 9a2 2 0 0 0 3 3l9-9M5 5l4 4" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8M19 15a6 6 0 0 1 3 5" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

// ========== LOGO ==========
function Logo({ light = false }: { light?: boolean }) {
  return (
    <button className={`logo ${light ? "logo-light" : ""}`} onClick={() => go("home")} aria-label="Al-Rafaya home">
      <img src={logoImg} alt="شركة الرفايعة للهندسة والمقاولات"
        style={{ height: "75px", width: "auto", objectFit: "contain", display: "block" }} />
    </button>
  );
}

function go(page: string) {
  window.location.hash = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Button({ children, variant = "primary", onClick, icon = true, type = "button" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "light" | "outline";
  onClick?: () => void; icon?: boolean; type?: "button" | "submit";
}) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{children}{icon && <Icon name="arrow" />}</button>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>;
}

function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return <div className={`section-head ${center ? "center" : ""}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

// ========== NAVBAR ==========
function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const t = dictionary[lang];
  const nav = [
    ["home", t.home], ["about", t.about], ["services", t.services], ["projects", t.projects],
    ["sectors", t.sectors], ["company", t.company], ["careers", t.careers], ["contact", t.contact],
  ];
  const submenus: Record<string, string[]> = {
    services: lang === "ar"
      ? ["الإنشاء","البنية التحتية","الكهروميكانيكية","التشطيبات","الهندسة وإدارة المشاريع","الصيانة"]
      : ["Construction","Infrastructure","MEP","Finishing","Engineering & Project Management","Maintenance"],
    projects: lang === "ar"
      ? ["جميع المشاريع","مشاريع قيد التنفيذ","المشاريع المكتملة"]
      : ["All Projects","Ongoing Projects","Completed Projects"],
    company: lang === "ar"
      ? ["من نحن","فريقنا","الشهادات","الجودة والسلامة","الاستدامة","الوظائف"]
      : ["About Us","Our Team","Certifications","Quality & Safety","Sustainability","Careers"],
  };
  return (
    <>
      <div className="topbar"><div className="container topbar-inner">
  <span className="topbar-end">{t.workingHours}</span>
  <span><Icon name="mail" size={15} /> info@alrafaya.com.sa</span>
  <span><Icon name="phone" size={15} /> +966 11 245 8800</span>
</div></div>
      <header className="navbar">
        <div className="container nav-inner" style={{ direction: "ltr" }}>
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
            {nav.map(([id, label]) => (
              <div className="nav-item" key={id} onMouseEnter={() => setDropdown(id)} onMouseLeave={() => setDropdown("")}>
                <button className={location.hash.slice(1) === id || (!location.hash && id === "home") ? "active" : ""} onClick={() => go(id)}>
                  {label}{submenus[id] && <Icon name="chevron" size={14} />}
                </button>
                {submenus[id] && dropdown === id && <div className="dropdown">{submenus[id].map((item) => <button key={item} onClick={() => go(id === "company" && (item === "Careers" || item === "الوظائف") ? "careers" : id)}>{item}<Icon name="arrow" size={15} /></button>)}</div>}
              </div>
            ))}
          </nav>
         <div className="nav-actions" style={{ direction: "ltr" }}>
         <button className="lang" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "العربية" : "English"}</button>
         <Button onClick={() => go("quote")}>{t.quote}</Button>
         <button className="menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" size={25} /></button>
         </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-top" style={{ direction: "ltr" }}><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" /></button></div>
        <div className="mobile-links">{nav.map(([id, label], i) => <button key={id} onClick={() => { go(id); setOpen(false); }}><span>0{i + 1}</span>{label}<Icon name="arrow" /></button>)}</div>
        <Button onClick={() => { go("quote"); setOpen(false); }}>{t.quote}</Button>
      </div>
    </>
  );
}

// ========== STATS ==========
function Stats() {
  const t = dictionary[useLang()];
  const stats = [["26+", t.statYears],["180+", t.statCompleted],["14", t.statOngoing],["320+", t.statEngineers],["08", t.statSectors]];
  return <section className="stats"><div className="container stats-grid">{stats.map(([n, l]) => <div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>;
}

// ========== PROJECT CARD ==========
function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const lang = useLang();
  const t = dictionary[lang];
  return (
    <article className={`project-card ${large ? "project-large" : ""}`} onClick={() => go("project-detail")}>
      <img src={project.image} alt={project.name[lang]} />
      <div className="project-shade" />
      <div className="project-status">{project.status[lang]}</div>
      <div className="project-info">
        <span>{project.type[lang]} · {project.year}</span>
        <h3>{project.name[lang]}</h3>
        <p><Icon name="map" size={16} /> {project.place[lang]}، {t.saudiArabia}</p>
        <button aria-label={`View ${project.name[lang]}`}><Icon name="arrow" /></button>
      </div>
    </article>
  );
}

// ========== HOME ==========
function Home() {
  const lang = useLang();
  const t = dictionary[lang];
  const [filter, setFilter] = useState(0);
  const filters = [t.catAll, t.catResidential, t.catCommercial, t.catIndustrial, t.catInfrastructure, t.catHospitality, t.catGovernment];
  const filterValues = ["All","Residential","Commercial","Industrial","Infrastructure","Hospitality","Government"];
  const shown = filter === 0 ? projects.slice(0, 4) : projects.filter((p) => p.type.en === filterValues[filter]).slice(0, 4);
  return (
    <main>
      <section className="hero">
        <img className="hero-bg" src={images.hero} alt={t.heroTitle} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-cred"><span><Icon name="shield" size={17} /> {t.trusted}</span><span>{t.since}</span></div>
          <Eyebrow light>{t.heroEyebrow}</Eyebrow>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <Button variant="light" onClick={() => go("quote")}>{t.quote}</Button>
            <Button variant="outline" onClick={() => go("projects")}>{t.explore}</Button>
          </div>
        </div>
        <div className="hero-side">{t.heroSide1} <span /> {t.heroSide2}</div>
        <button className="hero-scroll" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}><span />{t.scroll}</button>
      </section>
      <Stats />

      <section className="section about-section" id="about">
        <div className="container split">
          <div className="about-visual">
            <img src={images.construction} alt={t.aboutTitle} />
            <div className="experience"><strong>26</strong><span>{t.yearsExcellence}<br />{t.yearsExcellence2}</span></div>
            <div className="image-caption">{t.imageCaption} <span>01 / 03</span></div>
          </div>
          <div className="about-copy">
            <SectionHead eyebrow={t.aboutEyebrow} title={t.aboutTitle} />
            <p className="lead">{t.aboutLead}</p>
            <p>{t.aboutP}</p>
            <div className="principles">
              <div><Icon name="shield" /><span><b>{t.principle1Title}</b><small>{t.principle1Text}</small></span></div>
              <div><Icon name="users" /><span><b>{t.principle2Title}</b><small>{t.principle2Text}</small></span></div>
            </div>
            <Button variant="secondary" onClick={() => go("about")}>{t.learnMoreAbout}</Button>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="head-row"><SectionHead eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} /><span className="section-index">02</span></div>
          <div className="services-grid">
            {serviceItems.map((s, i) => <article className="service-card" key={s.name.en}><div className="service-top"><span>0{i + 1}</span><Icon name={s.icon} size={30} /></div><h3>{s.name[lang]}</h3><p>{s.desc[lang]}</p><button onClick={() => go("service-detail")}>{t.viewDetails} <Icon name="arrow" /></button></article>)}
          </div>
          <div className="section-link"><Button variant="secondary" onClick={() => go("services")}>{t.exploreAllServices}</Button></div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="head-row"><SectionHead eyebrow={t.projectsEyebrow} title={t.projectsTitle} text={t.projectsText} /><Button variant="secondary" onClick={() => go("projects")}>{t.viewAll}</Button></div>
          <div className="filter-row" role="tablist">{filters.map((item, i) => <button role="tab" aria-selected={filter === i} className={filter === i ? "active" : ""} onClick={() => setFilter(i)} key={item}>{item}</button>)}</div>
          <div className="projects-grid">{shown.length ? shown.map((p, i) => <ProjectCard project={p} large={i === 0} key={p.name.en} />) : <div className="empty">{t.noProjects}</div>}</div>
        </div>
      </section>

      <section className="sectors">
        <div className="container sectors-inner">
          <div className="sectors-copy"><Eyebrow light>{t.sectorsEyebrow}</Eyebrow><h2>{t.sectorsTitle}</h2><p>{t.sectorsText}</p><Button variant="light" onClick={() => go("sectors")}>{t.exploreAllSectors}</Button></div>
          <div className="sector-list">{[t.catResidential,t.catCommercial,t.catIndustrial,t.catInfrastructure,t.catHospitality,t.catHealthcare,t.catEducation,t.catGovernment].map((sector, i) => <button key={sector} onClick={() => go("sectors")}><span>0{i + 1}</span>{sector}<Icon name="arrow" /></button>)}</div>
        </div>
      </section>

      <section className="section why">
        <div className="container">
          <SectionHead eyebrow={t.whyEyebrow} title={t.whyTitle} text={t.whyText} center />
          <div className="values-grid">{[
            [t.why1Big, t.why1Title, t.why1Text],
            [t.why2Big, t.why2Title, t.why2Text],
            [t.why3Big, t.why3Title, t.why3Text],
            [t.why4Big, t.why4Title, t.why4Text],
          ].map(([big, title, text]) => <div className="value-card" key={title}><strong>{big}</strong><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </section>

      <Process />
      <Quality />
      <Certifications />
      <News />
      <FinalCta />
    </main>
  );
}

// ========== PROCESS ==========
function Process() {
  const t = dictionary[useLang()];
  return <section className="section process"><div className="container"><SectionHead eyebrow={t.processEyebrow} title={t.processTitle} /><div className="process-line">{t.processSteps.map((s, i) => <div className="process-step" key={s}><span>{String(i + 1).padStart(2, "0")}</span><i /><h3>{s}</h3></div>)}</div></div></section>;
}

// ========== QUALITY ==========
function Quality() {
  const t = dictionary[useLang()];
  return (
    <section className="quality">
      <div className="quality-image"><img src={images.team} alt={t.qualityImageTitle} /><div><b>{t.qualityImageTitle}</b><span>{t.qualityImageText}</span></div></div>
      <div className="quality-content"><Eyebrow light>{t.qualityEyebrow}</Eyebrow><h2>{t.qualityTitle}</h2>
        <div className="quality-list">{[["01", t.quality1Title, t.quality1Text],["02", t.quality2Title, t.quality2Text],["03", t.quality3Title, t.quality3Text]].map(([n, title, text]) => <div key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        <Button variant="light" onClick={() => go("company")}>{t.qualityBtn}</Button>
      </div>
    </section>
  );
}

// ========== CERTIFICATIONS ==========
function Certifications() {
  const t = dictionary[useLang()];
  return (
    <section className="section certifications"><div className="container">
      <SectionHead eyebrow={t.certEyebrow} title={t.certTitle} text={t.certText} center />
      <div className="cert-grid">{[
        ["ISO","9001:2015",t.cert1],["ISO","45001:2018",t.cert2],["ISO","14001:2015",t.cert3],["CLASS","Grade I",t.cert4]
      ].map(([mark, code, name]) => <div className="cert" key={code}><strong>{mark}</strong><span>{code}</span><small>{name}</small></div>)}</div>
      <div className="trusted"><span>{t.trustedBy}</span><div>{["PIF","ROSHN","MODON","SABIC","aramco","MOMRAH"].map((x) => <b key={x}>{x}</b>)}</div></div>
    </div></section>
  );
}

// ========== NEWS ==========
function News() {
  const t = dictionary[useLang()];
  const posts: [string,string,string,string][] = [
    [t.news1Cat, t.news1Date, t.news1Title, images.construction],
    [t.news2Cat, t.news2Date, t.news2Title, images.commercial],
    [t.news3Cat, t.news3Date, t.news3Title, images.civic],
  ];
  return <section className="section news"><div className="container"><div className="head-row"><SectionHead eyebrow={t.newsEyebrow} title={t.newsTitle} /><Button variant="secondary" onClick={() => go("news")}>{t.viewAllNews}</Button></div><div className="news-grid">{posts.map(([category, date, title, img]) => <article className="news-card" key={title}><div><img src={img} alt="" /><span>{category}</span></div><small>{date}</small><h3>{title}</h3><button onClick={() => go("news")}>{t.readStory} <Icon name="arrow" /></button></article>)}</div></div></section>;
}

// ========== FINAL CTA ==========
function FinalCta() {
  const t = dictionary[useLang()];
  return <section className="final-cta"><div className="container"><div><Eyebrow light>{t.ctaEyebrow}</Eyebrow><h2>{t.ctaTitle1}<br />{t.ctaTitle2}</h2></div><div><p>{t.ctaText}</p><span><Button variant="light" onClick={() => go("quote")}>{t.quote}</Button><Button variant="outline" onClick={() => go("contact")}>{t.contactUs}</Button></span></div></div></section>;
}

// ========== PAGE HERO ==========
function PageHero({ eyebrow, title, text, image = images.skyline }: { eyebrow: string; title: string; text: string; image?: string }) {
  const t = dictionary[useLang()];
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-overlay" /><div className="container"><div className="breadcrumbs"><button onClick={() => go("home")}>{t.home}</button><span>/</span><b>{eyebrow}</b></div><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>;
}

// ========== ABOUT PAGE ==========
function AboutPage() {
  const t = dictionary[useLang()];
  return <main><PageHero eyebrow={t.aboutPageEyebrow} title={t.aboutPageTitle} text={t.aboutPageText} />
    <section className="section"><div className="container split"><div className="about-copy"><SectionHead eyebrow={t.storyEyebrow} title={t.storyTitle} /><p className="lead">{t.storyLead}</p><p>{t.storyP}</p><Button variant="secondary" onClick={() => go("company")}>{t.meetTeam}</Button></div><div className="about-visual"><img src={images.team} alt={t.storyTitle} /></div></div></section>
    <section className="vision"><div className="container vision-grid"><div><span>01</span><h2>{t.visionTitle}</h2><p>{t.visionText}</p></div><div><span>02</span><h2>{t.missionTitle}</h2><p>{t.missionText}</p></div></div></section>
    <Timeline /><section className="section"><div className="container"><SectionHead eyebrow={t.guidesEyebrow} title={t.guidesTitle} center /><div className="values-grid">{t.values.map((v, i) => <div className="value-card" key={v}><strong>0{i + 1}</strong><h3>{v}</h3><p>{t.valuesDesc[i]}</p></div>)}</div></div></section><Stats /><FinalCta /></main>;
}

// ========== TIMELINE ==========
function Timeline() {
  const t = dictionary[useLang()];
  return <section className="section timeline"><div className="container"><SectionHead eyebrow={t.journeyEyebrow} title={t.journeyTitle} /><div className="timeline-grid">{t.timeline.map(([year, text]) => <div key={year}><strong>{year}</strong><i /><p>{text}</p></div>)}</div></div></section>;
}

// ========== SERVICES PAGE ==========
function ServicesPage() {
  const lang = useLang();
  const t = dictionary[lang];
  return <main><PageHero eyebrow={t.servicesPageEyebrow} title={t.servicesPageTitle} text={t.servicesPageText} image={images.detail} /><section className="section"><div className="container"><SectionHead eyebrow={t.endToEndEyebrow} title={t.endToEndTitle} text={t.endToEndText} /><div className="service-list">{serviceItems.map((s, i) => <article key={s.name.en}><span>0{i + 1}</span><div className="service-icon"><Icon name={s.icon} size={34} /></div><div><h2>{s.name[lang]}</h2><p>{s.desc[lang]}</p><ul>{(i < 2 ? t.serviceBulletsA : t.serviceBulletsB).map(x => <li key={x}><Icon name="check" size={16} />{x}</li>)}</ul></div><button onClick={() => go("service-detail")}><Icon name="arrow" /></button></article>)}</div></div></section><Process /><FinalCta /></main>;
}

// ========== SERVICE DETAIL ==========
function ServiceDetail() {
  const t = dictionary[useLang()];
  return <main><PageHero eyebrow={t.sdEyebrow} title={t.sdTitle} text={t.sdText} image={images.construction} />
    <section className="section"><div className="container detail-layout"><aside><b>{t.onThisPage}</b>{t.sdToc.map(x => <a href={`#${x}`} key={x}>{x}</a>)}</aside><div><SectionHead eyebrow={t.sdOverviewEyebrow} title={t.sdOverviewTitle} /><p className="lead">{t.sdLead}</p><p>{t.sdP}</p><h2 className="content-title">{t.sdWhatWeDo}</h2><div className="capability-grid">{t.sdCaps.map((x, i) => <div key={x}><span>0{i + 1}</span><h3>{x}</h3><p>{t.sdCapText}</p></div>)}</div></div></div></section><Process /><Quality /><section className="section"><div className="container"><SectionHead eyebrow={t.sdRelatedEyebrow} title={t.sdRelatedTitle} /><div className="project-row">{projects.slice(0, 3).map(p => <ProjectCard key={p.name.en} project={p} />)}</div></div></section><FaqSection /><FinalCta /></main>;
}

// ========== PROJECTS PAGE ==========
function ProjectsPage() {
  const lang = useLang();
  const t = dictionary[lang];
  const [term, setTerm] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const types = ["All","Residential","Commercial","Industrial","Infrastructure","Healthcare","Government"];
  const typeLabels: Record<string,string> = { All: t.catAll, Residential: t.catResidential, Commercial: t.catCommercial, Industrial: t.catIndustrial, Infrastructure: t.catInfrastructure, Healthcare: t.catHealthcare, Government: t.catGovernment };
  const statusLabels: Record<string,string> = { All: t.catAll, Completed: t.catCompleted, Ongoing: t.catOngoing, Upcoming: t.catUpcoming };
  const visible = projects.filter(p => (type === "All" || p.type.en === type) && (status === "All" || p.status.en === status) && p.name[lang].toLowerCase().includes(term.toLowerCase()));
  return <main><PageHero eyebrow={t.projectsPageEyebrow} title={t.projectsPageTitle} text={t.projectsPageText} image={images.commercial} />
    <section className="section project-listing"><div className="container">
      <div className="search-bar"><label><Icon name="search" /><input value={term} onChange={e => setTerm(e.target.value)} placeholder={t.searchProjects} /></label>
        <select value={type} onChange={e => setType(e.target.value)} aria-label={t.projectTypeLabel}>{types.map(x => <option key={x} value={x}>{typeLabels[x]}</option>)}</select>
        <select value={status} onChange={e => setStatus(e.target.value)} aria-label={t.catCompleted}>{Object.keys(statusLabels).map(x => <option key={x} value={x}>{statusLabels[x]}</option>)}</select>
      </div>
      <div className="result-count">{visible.length} {t.projectsLabel} <span>{t.sortedByLatest}</span></div>
      <div className="listing-grid">{visible.map(p => <ProjectCard key={p.name.en} project={p} />)}</div>
      {!visible.length && <div className="empty"><Icon name="search" size={32} />{t.noMatch}</div>}
    </div></section><FinalCta /></main>;
}

// ========== PROJECT DETAIL ==========
function ProjectDetail() {
  const lang = useLang();
  const t = dictionary[lang];
  const p = projects[0];
  const facts: [string,string][] = [
    [t.clientLabel, lang === "ar" ? "شركة الواحة للتطوير" : "Al Waha Development Co."],
    [t.projectTypeLabel, p.type[lang]],
    [t.builtupLabel, "86,000 m²"],
    [t.contractValueLabel, lang === "ar" ? "480 مليون ريال" : "SAR 480M"],
    [t.durationLabel, lang === "ar" ? "30 شهراً" : "30 Months"],
    [t.completionLabel, lang === "ar" ? "سبتمبر 2024" : "September 2024"],
  ];
  return <main>
    <section className="project-hero"><img src={images.commercial} alt={p.name[lang]} /><div className="project-shade" /><div className="container"><span className="project-status">{t.completedLabel} · {p.year}</span><h1>{p.name[lang]}</h1><p><Icon name="map" /> {p.place[lang]}، {t.saudiArabia}</p></div></section>
    <section className="project-facts"><div className="container">{facts.map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div></section>
    <section className="section"><div className="container editorial"><Eyebrow>{t.projectOverviewEyebrow}</Eyebrow><h2>{t.projectOverviewTitle}</h2><div><p className="lead">{t.projectOverviewLead}</p><p>{t.projectOverviewP}</p></div></div></section>
    <section className="project-gallery"><img src={images.concrete} alt="" /><img src={images.civic} alt="" /><img src={images.detail} alt="" /></section>
    <section className="section"><div className="container detail-layout"><div><SectionHead eyebrow={t.scopeEyebrow} title={t.scopeTitle} /><div className="scope-list">{t.scopeItems.map((x,i) => <div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></div><div><SectionHead eyebrow={t.challengesEyebrow} title={t.challengesTitle} /><p>{t.challengesP}</p><blockquote>{t.challengesQuote}</blockquote></div></div></section><FinalCta />
  </main>;
}

// ========== SECTORS PAGE ==========
function SectorsPage() {
  const t = dictionary[useLang()];
  const sectors = [t.catResidential,t.catCommercial,t.catIndustrial,t.catInfrastructure,t.catHospitality,t.catHealthcare,t.catEducation,t.catGovernment];
  return <main><PageHero eyebrow={t.sectorsPageEyebrow} title={t.sectorsPageTitle} text={t.sectorsPageText} /><section className="section"><div className="container sectors-page">{sectors.map((x,i) => <article key={x}><img src={[images.residential, images.commercial, images.concrete, images.detail, images.civic, images.construction][i%6]} alt="" /><div><span>0{i+1}</span><h2>{x}</h2><p>{t.sectorDesc}</p><button onClick={() => go("projects")}>{t.exploreProjects} <Icon name="arrow" /></button></div></article>)}</div></section><FinalCta /></main>;
}

// ========== COMPANY PAGE ==========
function CompanyPage() {
  const t = dictionary[useLang()];
  const team: [string,string][] = [
    ["Fahad Al-Rafaya", t.teamRoles[0]],
    ["Khalid Al-Mansour", t.teamRoles[1]],
    ["Omar Al-Harbi", t.teamRoles[2]],
    ["Sarah Al-Qahtani", t.teamRoles[3]],
  ];
  return <main><PageHero eyebrow={t.companyPageEyebrow} title={t.companyPageTitle} text={t.companyPageText} image={images.team} /><section className="section"><div className="container"><SectionHead eyebrow={t.leadershipEyebrow} title={t.leadershipTitle} text={t.leadershipText} /><div className="team-grid">{team.map(([name, role],i) => <article key={name}><div className={`portrait portrait-${i}`}><Icon name="users" size={48} /></div><h3>{name}</h3><p>{role}</p><span>{t.execLeadership}</span></article>)}</div></div></section><Quality /><Certifications /><Downloads /><FinalCta /></main>;
}

// ========== CAREERS PAGE ==========
function CareersPage() {
  const lang = useLang();
  const t = dictionary[lang];
  const jobs: [string,string,string,string][] = lang === "ar" ? [
    ["مهندس مدني","الهندسة","الرياض","+5 سنوات"],
    ["مهندس موقع","الإنشاء","جدة","+3 سنوات"],
    ["مدير مشروع","إدارة المشاريع","الرياض","+10 سنوات"],
    ["معماري","التصميم","الرياض","+5 سنوات"],
    ["مساح كميات","تجاري","الدمام","+5 سنوات"],
    ["مهندس كهرباء","الكهروميكانيكية","جدة","+4 سنوات"],
  ] : [
    ["Civil Engineer","Engineering","Riyadh","5+ years"],
    ["Site Engineer","Construction","Jeddah","3+ years"],
    ["Project Manager","Project Management","Riyadh","10+ years"],
    ["Architect","Design","Riyadh","5+ years"],
    ["Quantity Surveyor","Commercial","Dammam","5+ years"],
    ["Electrical Engineer","MEP","Jeddah","4+ years"],
  ];
  return <main><PageHero eyebrow={t.careersEyebrow} title={t.careersTitle} text={t.careersText} image={images.team} /><section className="section"><div className="container"><SectionHead eyebrow={t.openPositionsEyebrow} title={t.openPositionsTitle} text={t.openPositionsText} /><div className="jobs">{jobs.map(([name,dep,place,exp]) => <article key={name}><div><span>{dep}</span><h3>{name}</h3></div><p><Icon name="map" />{place} · {t.fullTime}</p><p>{exp} {t.experience}</p><button onClick={() => document.getElementById("application")?.scrollIntoView({behavior:"smooth"})}>{t.viewPosition} <Icon name="arrow" /></button></article>)}</div></div></section><FormSection type="career" /><FinalCta /></main>;
}

// ========== NEWS PAGE ==========
function NewsPage() {
  const t = dictionary[useLang()];
  const cats = [t.catAll, t.news1Cat, t.news2Cat, t.news3Cat, langCat(), t.newsEyebrow, ""].filter(Boolean);
  const langCats = useLang() === "ar"
    ? ["الكل","أخبار الشركة","المشاريع","القطاع","الهندسة","الاستدامة","الفعاليات"]
    : ["All","Company News","Projects","Industry","Engineering","Sustainability","Events"];
  return <main><PageHero eyebrow={t.newsPageEyebrow} title={t.newsPageTitle} text={t.newsPageText} image={images.civic} /><section className="section"><div className="container"><div className="filter-row">{langCats.map((x,i) => <button className={i===0?"active":""} key={x}>{x}</button>)}</div><News /><div className="listing-grid">{projects.slice(0,3).map((p,i) => <article className="news-card" key={p.name.en}><div><img src={p.image} alt="" /><span>{t.industryInsights}</span></div><small>22 AUG 2025</small><h3>{t.newsItems[i]}</h3><button>{t.readStory} <Icon name="arrow" /></button></article>)}</div></div></section><FinalCta /></main>;
}
function langCat() { return ""; }

// ========== FAQ ==========
function FaqSection() {
  const t = dictionary[useLang()];
  const [open, setOpen] = useState(0);
  return <section className="section faq"><div className="container"><SectionHead eyebrow={t.faqEyebrow} title={t.faqTitle} /><div className="accordion">{t.faqQuestions.map(([q,a],i) => <div className={open===i?"open":""} key={q}><button aria-expanded={open===i} onClick={() => setOpen(open===i?-1:i)}><span>0{i+1}</span>{q}<Icon name={open===i?"close":"chevron"} /></button>{open===i&&<p>{a}</p>}</div>)}</div></div></section>;
}

function FaqPage() {
  const t = dictionary[useLang()];
  return <main><PageHero eyebrow={t.faqPageEyebrow} title={t.faqPageTitle} text={t.faqPageText} /><FaqSection /><FinalCta /></main>;
}

// ========== DOWNLOADS ==========
function Downloads() {
  const t = dictionary[useLang()];
  return <section className="section downloads"><div className="container"><SectionHead eyebrow={t.downloadsEyebrow} title={t.downloadsTitle} /><div>{t.downloadItems.map((x,i) => <article key={x}><span>PDF · {i+2}.4 MB</span><h3>{x}</h3><button aria-label={`Download ${x}`}><Icon name="download" /></button></article>)}</div></div></section>;
}
function DownloadsPage() {
  const t = dictionary[useLang()];
  return <main><PageHero eyebrow={t.downloadsPageEyebrow} title={t.downloadsPageTitle} text={t.downloadsPageText} /><Downloads /><FinalCta /></main>;
}

// ========== FORM ==========
function FormSection({ type }: { type: "quote" | "contact" | "career" }) {
  const t = dictionary[useLang()];
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const isQuote = type === "quote";
  return <section className="section form-section" id="application"><div className="container form-layout">
    <div>
      <Eyebrow>{type === "career" ? t.applyNow : t.startConversation}</Eyebrow>
      <h2>{type === "career" ? t.joinTeam : isQuote ? t.tellUsProject : t.howCanHelp}</h2>
      <p>{t.formIntro}</p>
      <div className="contact-block">
        <span><Icon name="phone" /><b>{t.callUs}</b><small>+966 11 245 8800</small></span>
        <span><Icon name="mail" /><b>{t.emailUs}</b><small>info@alrafaya.com.sa</small></span>
        <span><Icon name="map" /><b>{t.headOffice}</b><small>{t.headOfficeAddress}</small></span>
      </div>
    </div>
    {sent ? <div className="success"><Icon name="check" size={36} /><h3>{t.thankYou}</h3><p>{t.thankYouText}</p><Button onClick={() => setSent(false)}>{t.sendAnother}</Button></div> :
    <form onSubmit={submit}><div className="form-grid">
      <label>{t.fullName} *<input required placeholder={t.yourFullName} /></label>
      <label>{type === "career" ? `${t.emailAddress} *` : t.company}<input required={type === "career"} placeholder={type === "career" ? "name@email.com" : t.companyName} /></label>
      <label>{t.emailAddress} *<input required type="email" placeholder="name@company.com" /></label>
      <label>{t.phoneNumber} *<input required type="tel" placeholder="+966" /></label>
      {isQuote && <>
        <label>{t.projectType}<select required defaultValue=""><option value="" disabled>{t.selectProjectType}</option><option>{t.construction}</option><option>{t.infrastructure}</option><option>{t.mep}</option><option>{t.fitOut}</option></select></label>
        <label>{t.projectLocation}<input placeholder={t.cityRegion} /></label>
        <label>{t.estimatedArea}<input placeholder={t.squareMeters} /></label>
        <label>{t.estimatedBudget}<select defaultValue=""><option value="" disabled>{t.selectBudget}</option><option>{t.budget1}</option><option>{t.budget2}</option><option>{t.budget3}</option></select></label>
      </>}
      {type === "career" && <>
        <label>{t.position}<select><option>{lang === "ar" ? "مهندس مدني" : "Civil Engineer"}</option><option>{lang === "ar" ? "مهندس موقع" : "Site Engineer"}</option><option>{lang === "ar" ? "مدير مشروع" : "Project Manager"}</option></select></label>
        <label>{t.linkedin}<input placeholder="linkedin.com/in/..." /></label>
      </>}
      <label className="full">{type === "career" ? t.coverLetter : t.projectDesc} *<textarea required rows={6} placeholder={t.projectPlaceholder} /></label>
      <label className="upload full"><Icon name="download" /><span><b>{type === "career" ? t.uploadCv : t.uploadDocs}</b><small>{t.fileTypes}</small></span><input type="file" /></label>
    </div>
    <div className="form-submit"><small>{t.privacyAgree}</small><Button type="submit">{type === "career" ? t.submitApplication : isQuote ? t.submitRequest : t.sendMessage}</Button></div></form>}
  </div></section>;
}

function QuotePage() { const t = dictionary[useLang()]; return <main><PageHero eyebrow={t.quoteEyebrow} title={t.quoteTitle} text={t.quoteText} image={images.detail} /><FormSection type="quote" /></main>; }
function ContactPage() { const t = dictionary[useLang()]; return <main><PageHero eyebrow={t.contactEyebrow} title={t.contactTitle} text={t.contactText} /><FormSection type="contact" /><section className="map-placeholder"><div><Icon name="map" size={36} /><b>{t.headOfficeLocation}</b><span>{t.kingFahdRoad}</span></div></section></main>; }

// ========== FOOTER ==========
function Footer() {
  const lang = useLang();
  const t = dictionary[lang];
  const cols: [string, string[]][] = [
    [t.footerCompany, [...t.footerCompanyLinks]],
    [t.footerServices, [...t.footerServicesLinks]],
    [t.footerProjects, [...t.footerProjectsLinks]],
    [t.footerResources, [...t.footerResourcesLinks]],
  ];
  const linkTo = (title: string, x: string) => {
    if (x === "FAQ" || x === "الأسئلة الشائعة") return "faq";
    if (x === "Downloads" || x === "التحميلات") return "downloads";
    if (title === t.footerServices) return "services";
    if (title === t.footerProjects) return "projects";
    return "company";
  };
  return <footer><div className="container footer-top">
    <div className="footer-brand"><Logo light /><p>{t.footerTagline1}<br />{t.footerTagline2}</p><div className="socials"><button>in</button><button>ig</button><button>f</button></div></div>
    {cols.map(([title, links]) => <div className="footer-col" key={title}><b>{title}</b>{links.map(x => <button key={x} onClick={() => go(linkTo(title, x))}>{x}</button>)}</div>)}
    <div className="footer-contact"><b>{t.footerContact}</b><p>{t.footerAddress.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</p><a href="tel:+966112458800">+966 11 245 8800</a><a href="mailto:info@alrafaya.com.sa">info@alrafaya.com.sa</a></div>
  </div><div className="container footer-bottom"><span>{t.copyright}</span><div><button>{t.privacyPolicy}</button><button>{t.termsConditions}</button></div><span>{t.madeForProgress}</span></div></footer>;
}

// ========== APP ==========
function App() {
  const [lang, setLang] = useState<Lang>("ar");
  const [page, setPage] = useState(location.hash.slice(1) || "home");
  useEffect(() => {
    const update = () => setPage(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const pages: Record<string, ReactNode> = {
    home: <Home />, about: <AboutPage />, services: <ServicesPage />, "service-detail": <ServiceDetail />,
    projects: <ProjectsPage />, "project-detail": <ProjectDetail />, sectors: <SectorsPage />, company: <CompanyPage />,
    careers: <CareersPage />, news: <NewsPage />, quote: <QuotePage />, contact: <ContactPage />,
    faq: <FaqPage />, downloads: <DownloadsPage />,
  };
  return (
    <LangContext.Provider value={lang}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "arabic" : ""}>
        <Navbar lang={lang} setLang={setLang} />
        {pages[page] || pages.home}
        <Footer />
      </div>
    </LangContext.Provider>
  );
}

export default App;