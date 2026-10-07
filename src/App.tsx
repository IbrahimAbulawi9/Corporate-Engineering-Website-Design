import { FormEvent, ReactNode, useEffect, useState } from "react";

type Lang = "en" | "ar";
type IconName =
  | "arrow"
  | "building"
  | "check"
  | "chevron"
  | "close"
  | "crane"
  | "download"
  | "engineering"
  | "hardhat"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "play"
  | "search"
  | "shield"
  | "tools"
  | "users";

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

const dictionary = {
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    projects: "Projects",
    sectors: "Sectors",
    company: "Company",
    news: "News",
    careers: "Careers",
    contact: "Contact",
    quote: "Request a Quote",
    heroTitle: "Building Today. Shaping Tomorrow.",
    heroText:
      "Integrated engineering, construction, and project delivery built on precision, accountability, and an uncompromising commitment to quality.",
    explore: "Explore Our Projects",
    trusted: "Trusted engineering partner",
    since: "Established 1998",
    scroll: "Discover our work",
    learn: "Learn More",
    viewAll: "View All Projects",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    projects: "مشاريعنا",
    sectors: "القطاعات",
    company: "الشركة",
    news: "الأخبار",
    careers: "الوظائف",
    contact: "اتصل بنا",
    quote: "اطلب عرض سعر",
    heroTitle: "نبني اليوم. لنصنع الغد.",
    heroText:
      "حلول متكاملة في الهندسة والإنشاء وإدارة المشاريع، ترتكز على الدقة والمسؤولية والالتزام الراسخ بالجودة.",
    explore: "استكشف مشاريعنا",
    trusted: "شريككم الهندسي الموثوق",
    since: "تأسست عام 1998",
    scroll: "اكتشف أعمالنا",
    learn: "اعرف المزيد",
    viewAll: "عرض جميع المشاريع",
  },
};

const serviceItems = [
  ["Building Construction", "End-to-end delivery of landmark residential, commercial, and public buildings.", "building"],
  ["Civil & Infrastructure", "High-performance roads, utilities, earthworks, and urban infrastructure.", "crane"],
  ["MEP Solutions", "Integrated mechanical, electrical, plumbing, HVAC, and fire protection systems.", "tools"],
  ["Engineering & PM", "Disciplined design coordination, cost control, planning, and project leadership.", "engineering"],
  ["Finishing & Fit-Out", "Precision interiors and exterior finishes crafted to exacting standards.", "check"],
  ["Maintenance & Renovation", "Proactive asset care, rehabilitation, and facility lifecycle support.", "hardhat"],
] as const;

const projects = [
  { name: "Al Waha Business District", place: "Riyadh", type: "Commercial", year: "2024", status: "Completed", image: images.commercial },
  { name: "North Riyadh Residences", place: "Riyadh", type: "Residential", year: "2025", status: "Ongoing", image: images.residential },
  { name: "Industrial Logistics Hub", place: "Dammam", type: "Industrial", year: "2024", status: "Completed", image: images.concrete },
  { name: "Civic Administration Center", place: "Jeddah", type: "Government", year: "2025", status: "Ongoing", image: images.civic },
  { name: "Eastern Utilities Corridor", place: "Al Khobar", type: "Infrastructure", year: "2023", status: "Completed", image: images.detail },
  { name: "Meridian Medical Campus", place: "Riyadh", type: "Healthcare", year: "2026", status: "Upcoming", image: images.construction },
];

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

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button className={`logo ${light ? "logo-light" : ""}`} onClick={() => go("home")} aria-label="Al-Rafaya home">
      <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="logo-copy"><b>AL-RAFAYA</b><small>ENGINEERING & CONTRACTING</small></span>
    </button>
  );
}

function go(page: string) {
  window.location.hash = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Button({ children, variant = "primary", onClick, icon = true, type = "button" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "light" | "outline"; onClick?: () => void; icon?: boolean; type?: "button" | "submit";
}) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{children}{icon && <Icon name="arrow" />}</button>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>;
}

function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return <div className={`section-head ${center ? "center" : ""}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const t = dictionary[lang];
  const nav = [
    ["home", t.home], ["about", t.about], ["services", t.services], ["projects", t.projects],
    ["sectors", t.sectors], ["company", t.company], ["careers", t.careers], ["contact", t.contact],
  ];
  const submenus: Record<string, string[]> = {
    services: ["Construction", "Infrastructure", "MEP", "Finishing", "Engineering & Project Management", "Maintenance"],
    projects: ["All Projects", "Ongoing Projects", "Completed Projects"],
    company: ["About Us", "Our Team", "Certifications", "Quality & Safety", "Sustainability", "Careers"],
  };
  return (
    <>
      <div className="topbar"><div className="container topbar-inner"><span><Icon name="phone" size={15} /> +966 11 245 8800</span><span><Icon name="mail" size={15} /> info@alrafaya.com.sa</span><span className="topbar-end">Sunday – Thursday&nbsp;&nbsp; 8:00 AM – 5:00 PM</span></div></div>
      <header className="navbar">
        <div className="container nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([id, label]) => (
              <div className="nav-item" key={id} onMouseEnter={() => setDropdown(id)} onMouseLeave={() => setDropdown("")}>
                <button className={location.hash.slice(1) === id || (!location.hash && id === "home") ? "active" : ""} onClick={() => go(id)}>
                  {label}{submenus[id] && <Icon name="chevron" size={14} />}
                </button>
                {submenus[id] && dropdown === id && <div className="dropdown">{submenus[id].map((item) => <button key={item} onClick={() => go(id === "company" && item === "Careers" ? "careers" : id)}>{item}<Icon name="arrow" size={15} /></button>)}</div>}
              </div>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="lang" onClick={() => setLang(lang === "en" ? "ar" : "en")}>{lang === "en" ? "العربية" : "English"}</button>
            <Button onClick={() => go("quote")}>{t.quote}</Button>
            <button className="menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" size={25} /></button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-top"><Logo /><button aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" /></button></div>
        <div className="mobile-links">{nav.map(([id, label], i) => <button key={id} onClick={() => { go(id); setOpen(false); }}><span>0{i + 1}</span>{label}<Icon name="arrow" /></button>)}</div>
        <Button onClick={() => { go("quote"); setOpen(false); }}>{t.quote}</Button>
      </div>
    </>
  );
}

function Stats() {
  const stats = [["26+", "Years of Experience"], ["180+", "Completed Projects"], ["14", "Ongoing Projects"], ["320+", "Engineers & Professionals"], ["08", "Sectors Served"]];
  return <section className="stats"><div className="container stats-grid">{stats.map(([n, l]) => <div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>;
}

function ProjectCard({ project, large = false }: { project: typeof projects[number]; large?: boolean }) {
  return (
    <article className={`project-card ${large ? "project-large" : ""}`} onClick={() => go("project-detail")}>
      <img src={project.image} alt={project.name} />
      <div className="project-shade" />
      <div className="project-status">{project.status}</div>
      <div className="project-info"><span>{project.type} · {project.year}</span><h3>{project.name}</h3><p><Icon name="map" size={16} /> {project.place}, Saudi Arabia</p><button aria-label={`View ${project.name}`}><Icon name="arrow" /></button></div>
    </article>
  );
}

function Home({ lang }: { lang: Lang }) {
  const t = dictionary[lang];
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Residential", "Commercial", "Industrial", "Infrastructure", "Hospitality", "Government"];
  const shown = filter === "All" ? projects.slice(0, 4) : projects.filter((p) => p.type === filter).slice(0, 4);
  return (
    <main>
      <section className="hero">
        <img className="hero-bg" src={images.hero} alt="Aerial view of a major construction site in Saudi Arabia" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-cred"><span><Icon name="shield" size={17} /> {t.trusted}</span><span>{t.since}</span></div>
          <Eyebrow light>Engineering excellence, built to last</Eyebrow>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions"><Button variant="light" onClick={() => go("quote")}>{t.quote}</Button><Button variant="outline" onClick={() => go("projects")}>{t.explore}</Button></div>
          <button className="showreel"><Icon name="play" size={34} /><span><small>PLAY SHOWREEL</small>See how we build</span></button>
        </div>
        <div className="hero-side">AL–RAFAYA <span /> ENGINEERING & CONTRACTING</div>
        <button className="hero-scroll" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}><span />{t.scroll}</button>
      </section>
      <Stats />

      <section className="section about-section" id="about">
        <div className="container split">
          <div className="about-visual">
            <img src={images.construction} alt="Al-Rafaya construction project with tower crane" />
            <div className="experience"><strong>26</strong><span>YEARS OF<br />EXCELLENCE</span></div>
            <div className="image-caption">Precision in every detail <span>01 / 03</span></div>
          </div>
          <div className="about-copy">
            <SectionHead eyebrow="Who we are" title="Built on trust. Driven by engineering." />
            <p className="lead">Al-Rafaya is a Saudi engineering and contracting company delivering complex, high-value projects across the Kingdom.</p>
            <p>Since 1998, we have earned the confidence of public and private sector clients by combining technical depth, disciplined execution, and local insight. From first concept to final handover, every project is managed with clarity and care.</p>
            <div className="principles">
              <div><Icon name="shield" /><span><b>Uncompromised Quality</b><small>ISO-aligned systems at every stage</small></span></div>
              <div><Icon name="users" /><span><b>Expert Teams</b><small>320+ skilled professionals</small></span></div>
            </div>
            <Button variant="secondary" onClick={() => go("about")}>Learn More About Us</Button>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="head-row"><SectionHead eyebrow="Our capabilities" title="Integrated expertise. One trusted partner." text="From complex civil works to precision fit-outs, our multidisciplinary teams deliver total project certainty." /><span className="section-index">02</span></div>
          <div className="services-grid">
            {serviceItems.map(([name, desc, icon], i) => <article className="service-card" key={name}><div className="service-top"><span>0{i + 1}</span><Icon name={icon} size={30} /></div><h3>{name}</h3><p>{desc}</p><button onClick={() => go("service-detail")}>View Details <Icon name="arrow" /></button></article>)}
          </div>
          <div className="section-link"><Button variant="secondary" onClick={() => go("services")}>Explore All Services</Button></div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="head-row"><SectionHead eyebrow="Selected work" title="Projects that define progress." text="A portfolio shaped by technical ambition, purposeful design, and enduring value." /><Button variant="secondary" onClick={() => go("projects")}>{t.viewAll}</Button></div>
          <div className="filter-row" role="tablist">{filters.map((item) => <button role="tab" aria-selected={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <div className="projects-grid">{shown.length ? shown.map((p, i) => <ProjectCard project={p} large={i === 0} key={p.name} />) : <div className="empty">No featured projects in this category yet.</div>}</div>
        </div>
      </section>

      <section className="sectors">
        <div className="container sectors-inner">
          <div className="sectors-copy"><Eyebrow light>Sectors we serve</Eyebrow><h2>Building capability across the industries that matter.</h2><p>Our sector expertise helps clients navigate complexity and deliver lasting impact.</p><Button variant="light" onClick={() => go("sectors")}>Explore All Sectors</Button></div>
          <div className="sector-list">{["Residential", "Commercial", "Industrial", "Infrastructure", "Hospitality", "Healthcare", "Education", "Government"].map((sector, i) => <button key={sector} onClick={() => go("sectors")}><span>0{i + 1}</span>{sector}<Icon name="arrow" /></button>)}</div>
        </div>
      </section>

      <section className="section why">
        <div className="container">
          <SectionHead eyebrow="The Al-Rafaya standard" title="Why clients choose us." text="A delivery culture shaped by accountability, expertise, and a commitment to getting every detail right." center />
          <div className="values-grid">{[
            ["26+ Years", "Proven Experience", "Decades of successful delivery across diverse and demanding projects."],
            ["Zero Compromise", "Safety First", "Proactive risk management protects our people, partners, and communities."],
            ["320+ Experts", "Professional Team", "Multidisciplinary talent united by high standards and shared purpose."],
            ["96%", "On-Time Delivery", "Disciplined planning and transparent controls keep projects moving forward."],
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

function Process() {
  const steps = ["Consultation", "Planning", "Design & Engineering", "Procurement", "Construction", "Quality & Safety", "Handover"];
  return <section className="section process"><div className="container"><SectionHead eyebrow="How we work" title="A clear path from vision to reality." /><div className="process-line">{steps.map((s, i) => <div className="process-step" key={s}><span>{String(i + 1).padStart(2, "0")}</span><i /><h3>{s}</h3></div>)}</div></div></section>;
}

function Quality() {
  return (
    <section className="quality">
      <div className="quality-image"><img src={images.team} alt="Construction professionals collaborating on site" /><div><b>Every decision. Every detail.</b><span>Measured against the highest standards.</span></div></div>
      <div className="quality-content"><Eyebrow light>Our commitments</Eyebrow><h2>Quality, safety, and responsibility are built in.</h2>
        <div className="quality-list">{[
          ["01", "Quality", "Rigorous inspection, testing, and assurance systems embedded throughout delivery."],
          ["02", "Safety", "A prevention-first culture supported by training, leadership, and clear accountability."],
          ["03", "Sustainability", "Responsible materials, efficient methods, and reduced environmental impact."],
        ].map(([n, title, text]) => <div key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        <Button variant="light" onClick={() => go("company")}>Our Commitments</Button>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section certifications"><div className="container">
      <SectionHead eyebrow="Certified to deliver" title="Standards you can trust." text="Our systems and teams are independently assessed against recognized international standards." center />
      <div className="cert-grid">{[["ISO", "9001:2015", "Quality Management"], ["ISO", "45001:2018", "Occupational Health & Safety"], ["ISO", "14001:2015", "Environmental Management"], ["CLASS", "Grade I", "Contractor Classification"]].map(([mark, code, name]) => <div className="cert" key={code}><strong>{mark}</strong><span>{code}</span><small>{name}</small></div>)}</div>
      <div className="trusted"><span>TRUSTED BY LEADING ORGANIZATIONS</span><div>{["PIF", "ROSHN", "MODON", "SABIC", "aramco", "MOMRAH"].map((x) => <b key={x}>{x}</b>)}</div></div>
    </div></section>
  );
}

function News() {
  const posts = [
    ["Company News", "18 NOV 2025", "Al-Rafaya awarded major Riyadh infrastructure contract", images.construction],
    ["Project Milestone", "02 OCT 2025", "Structural works completed at Al Waha Business District", images.commercial],
    ["Sustainability", "14 SEP 2025", "Advancing responsible construction across our operations", images.civic],
  ];
  return <section className="section news"><div className="container"><div className="head-row"><SectionHead eyebrow="News & insights" title="What’s happening at Al-Rafaya." /><Button variant="secondary" onClick={() => go("news")}>View All News</Button></div><div className="news-grid">{posts.map(([category, date, title, img]) => <article className="news-card" key={title}><div><img src={img} alt="" /><span>{category}</span></div><small>{date}</small><h3>{title}</h3><button onClick={() => go("news")}>Read Story <Icon name="arrow" /></button></article>)}</div></div></section>;
}

function FinalCta() {
  return <section className="final-cta"><div className="container"><div><Eyebrow light>Start a conversation</Eyebrow><h2>Have a project in mind?<br />Let’s build it together.</h2></div><div><p>Tell us about your project and discover what a dependable engineering partner can make possible.</p><span><Button variant="light" onClick={() => go("quote")}>Request a Quote</Button><Button variant="outline" onClick={() => go("contact")}>Contact Us</Button></span></div></div></section>;
}

function PageHero({ eyebrow, title, text, image = images.skyline }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-overlay" /><div className="container"><div className="breadcrumbs"><button onClick={() => go("home")}>Home</button><span>/</span><b>{eyebrow}</b></div><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>;
}

function AboutPage() {
  return <main><PageHero eyebrow="About Al-Rafaya" title="Engineering progress. Building confidence." text="For more than 26 years, we have helped shape the Kingdom’s built environment through responsible, precise, and dependable delivery." />
    <section className="section"><div className="container split"><div className="about-copy"><SectionHead eyebrow="Our story" title="A Saudi company with an enduring ambition." /><p className="lead">Founded in Riyadh in 1998, Al-Rafaya began with a clear conviction: better engineering creates better outcomes for everyone.</p><p>Today, we bring together more than 320 professionals across construction, infrastructure, MEP, fit-out, and project management. Our growth has been deliberate—built on client trust, technical capability, and consistent delivery.</p><Button variant="secondary" onClick={() => go("company")}>Meet Our Team</Button></div><div className="about-visual"><img src={images.team} alt="Al-Rafaya engineering team" /></div></div></section>
    <section className="vision"><div className="container vision-grid"><div><span>01</span><h2>Our Vision</h2><p>To be the Kingdom’s most trusted engineering and contracting partner, recognized for shaping resilient, sustainable places.</p></div><div><span>02</span><h2>Our Mission</h2><p>To deliver projects with engineering rigor, transparent partnership, and an unwavering commitment to safety, quality, and value.</p></div></div></section>
    <Timeline /><section className="section"><div className="container"><SectionHead eyebrow="What guides us" title="Values that show up in our work." center /><div className="values-grid">{["Integrity", "Excellence", "Accountability", "Collaboration"].map((v, i) => <div className="value-card" key={v}><strong>0{i + 1}</strong><h3>{v}</h3><p>{["We act with honesty and transparency in every relationship.", "We raise the standard through discipline and continuous improvement.", "We take ownership of outcomes, from commitment to completion.", "We succeed by sharing expertise and working as one team."][i]}</p></div>)}</div></div></section><Stats /><FinalCta /></main>;
}

function Timeline() {
  return <section className="section timeline"><div className="container"><SectionHead eyebrow="Our journey" title="Built steadily. Growing purposefully." /><div className="timeline-grid">{[["1998", "Company established in Riyadh"], ["2006", "Expanded into civil infrastructure"], ["2014", "Achieved Grade I classification"], ["2020", "Launched integrated MEP division"], ["2025", "180+ projects delivered nationwide"]].map(([year, text]) => <div key={year}><strong>{year}</strong><i /><p>{text}</p></div>)}</div></div></section>;
}

function ServicesPage() {
  return <main><PageHero eyebrow="Our Services" title="Integrated capability. Exceptional delivery." text="Multidisciplinary expertise, brought together under one accountable partner." image={images.detail} /><section className="section"><div className="container"><SectionHead eyebrow="End-to-end expertise" title="Everything your project needs." text="Our specialists work as one team from early planning through construction, commissioning, and long-term care." /><div className="service-list">{serviceItems.map(([name, desc, icon], i) => <article key={name}><span>0{i + 1}</span><div className="service-icon"><Icon name={icon} size={34} /></div><div><h2>{name}</h2><p>{desc}</p><ul>{(["Building Construction", "Civil & Infrastructure"].includes(name) ? ["Residential & commercial", "Industrial facilities", "Government buildings", "Turnkey delivery"] : ["Design coordination", "Specialist execution", "Quality assurance", "Lifecycle support"]).map(x => <li key={x}><Icon name="check" size={16} />{x}</li>)}</ul></div><button onClick={() => go("service-detail")}><Icon name="arrow" /></button></article>)}</div></div></section><Process /><FinalCta /></main>;
}

function ServiceDetail() {
  return <main><PageHero eyebrow="Construction" title="Building Construction" text="From complex commercial developments to landmark public buildings, we turn ambitious plans into enduring assets." image={images.construction} />
    <section className="section"><div className="container detail-layout"><aside><b>ON THIS PAGE</b>{["Overview", "What We Do", "Capabilities", "Our Process", "Quality & Safety", "Related Projects", "FAQ"].map(x => <a href={`#${x.toLowerCase().replaceAll(" ", "-")}`} key={x}>{x}</a>)}</aside><div><SectionHead eyebrow="Service overview" title="Complete construction delivery, without compromise." /><p className="lead">Our construction teams manage every dimension of delivery—from mobilization and structural works through MEP integration, finishes, commissioning, and handover.</p><p>We combine proven field leadership with disciplined project controls to protect quality, program, budget, and safety. Every project benefits from clear communication and a single point of accountability.</p><h2 className="content-title">What we do</h2><div className="capability-grid">{["Residential Construction", "Commercial Buildings", "Industrial Facilities", "Government & Civic", "Healthcare & Education", "Turnkey Delivery"].map((x, i) => <div key={x}><span>0{i + 1}</span><h3>{x}</h3><p>Integrated planning, execution, coordination, and assurance by experienced specialists.</p></div>)}</div></div></div></section><Process /><Quality /><section className="section"><div className="container"><SectionHead eyebrow="Related work" title="Construction in practice." /><div className="project-row">{projects.slice(0, 3).map(p => <ProjectCard key={p.name} project={p} />)}</div></div></section><FaqSection /><FinalCta /></main>;
}

function ProjectsPage() {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const visible = projects.filter(p => (type === "All" || p.type === type) && (status === "All" || p.status === status) && p.name.toLowerCase().includes(term.toLowerCase()));
  return <main><PageHero eyebrow="Our Projects" title="A portfolio built to perform." text="Explore selected work across the sectors and communities we serve." image={images.commercial} /><section className="section project-listing"><div className="container"><div className="search-bar"><label><Icon name="search" /><input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search projects" /></label><select value={type} onChange={e => setType(e.target.value)} aria-label="Project category"><option>All</option>{["Residential", "Commercial", "Industrial", "Infrastructure", "Healthcare", "Government"].map(x => <option key={x}>{x}</option>)}</select><select value={status} onChange={e => setStatus(e.target.value)} aria-label="Project status"><option>All</option><option>Completed</option><option>Ongoing</option><option>Upcoming</option></select></div><div className="result-count">{visible.length} PROJECTS <span>Sorted by latest</span></div><div className="listing-grid">{visible.map(p => <ProjectCard key={p.name} project={p} />)}</div>{!visible.length && <div className="empty"><Icon name="search" size={32} />No projects match your current filters.</div>}</div></section><FinalCta /></main>;
}

function ProjectDetail() {
  return <main><section className="project-hero"><img src={images.commercial} alt="Al Waha Business District" /><div className="project-shade" /><div className="container"><span className="project-status">COMPLETED · 2024</span><h1>Al Waha<br />Business District</h1><p><Icon name="map" /> Riyadh, Saudi Arabia</p></div></section><section className="project-facts"><div className="container">{[["Client", "Al Waha Development Co."], ["Project Type", "Commercial"], ["Built-up Area", "86,000 m²"], ["Contract Value", "SAR 480M"], ["Duration", "30 Months"], ["Completion", "September 2024"]].map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div></section><section className="section"><div className="container editorial"><Eyebrow>Project overview</Eyebrow><h2>A workplace destination engineered for a new era.</h2><div><p className="lead">Al Waha Business District is a high-performance mixed-use campus that brings together Grade A office space, retail, and landscaped public areas.</p><p>Al-Rafaya led complete construction delivery, coordinating a complex structural system, advanced MEP infrastructure, premium finishes, and external works. The completed development creates an efficient and distinctive commercial address for Riyadh.</p></div></div></section><section className="project-gallery"><img src={images.concrete} alt="Project concrete facade" /><img src={images.civic} alt="Project public space" /><img src={images.detail} alt="Project during construction" /></section><section className="section"><div className="container detail-layout"><div><SectionHead eyebrow="Scope of work" title="Comprehensive delivery." /><div className="scope-list">{["Civil & Structural Works", "Mechanical, Electrical & Plumbing", "Interior & Exterior Finishes", "Landscape & Public Realm", "Testing & Commissioning"].map((x,i) => <div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></div><div><SectionHead eyebrow="Challenges & solutions" title="Solving complexity through coordination." /><p>With a constrained urban site and multiple specialist packages, close sequencing was essential. Our team implemented coordinated BIM reviews, just-in-time logistics, and zone-based handovers to protect the program.</p><blockquote>“Integrated planning enabled the team to complete the structural package three weeks ahead of the baseline program.”</blockquote></div></div></section><FinalCta /></main>;
}

function SectorsPage() {
  const sectors = ["Residential", "Commercial", "Industrial", "Infrastructure", "Hospitality", "Healthcare", "Education", "Government"];
  return <main><PageHero eyebrow="Sectors" title="Expertise for every environment." text="Deep sector understanding helps us solve the right problems and build assets that perform for decades." /><section className="section"><div className="container sectors-page">{sectors.map((x,i) => <article key={x}><img src={[images.residential, images.commercial, images.concrete, images.detail, images.civic, images.construction][i%6]} alt="" /><div><span>0{i+1}</span><h2>{x}</h2><p>Specialized engineering, construction, and delivery expertise aligned to the sector’s unique operational needs.</p><button onClick={() => go("projects")}>Explore projects <Icon name="arrow" /></button></div></article>)}</div></section><FinalCta /></main>;
}

function CompanyPage() {
  return <main><PageHero eyebrow="Our Company" title="People, standards, and purpose." text="Meet the team and commitments behind every Al-Rafaya project." image={images.team} /><section className="section"><div className="container"><SectionHead eyebrow="Leadership" title="Led by experience. United by purpose." text="Our leadership team brings deep local knowledge and multidisciplinary project expertise." /><div className="team-grid">{[["Fahad Al-Rafaya", "Chairman"], ["Khalid Al-Mansour", "Chief Executive Officer"], ["Omar Al-Harbi", "Chief Operations Officer"], ["Sarah Al-Qahtani", "Director of Engineering"]].map(([name, role],i) => <article key={name}><div className={`portrait portrait-${i}`}><Icon name="users" size={48} /></div><h3>{name}</h3><p>{role}</p><span>Executive leadership</span></article>)}</div></div></section><Quality /><Certifications /><Downloads /><FinalCta /></main>;
}

function CareersPage() {
  const jobs = [["Civil Engineer", "Engineering", "Riyadh", "5+ years"], ["Site Engineer", "Construction", "Jeddah", "3+ years"], ["Project Manager", "Project Management", "Riyadh", "10+ years"], ["Architect", "Design", "Riyadh", "5+ years"], ["Quantity Surveyor", "Commercial", "Dammam", "5+ years"], ["Electrical Engineer", "MEP", "Jeddah", "4+ years"]];
  return <main><PageHero eyebrow="Careers" title="Build what matters. Grow with us." text="Join a team of people who take pride in solving difficult problems and delivering work that lasts." image={images.team} /><section className="section"><div className="container"><SectionHead eyebrow="Open positions" title="Find your next opportunity." text="We are always looking for talented, principled professionals to join our growing team." /><div className="jobs">{jobs.map(([name,dep,place,exp]) => <article key={name}><div><span>{dep}</span><h3>{name}</h3></div><p><Icon name="map" />{place} · Full-time</p><p>{exp} experience</p><button onClick={() => document.getElementById("application")?.scrollIntoView({behavior:"smooth"})}>View Position <Icon name="arrow" /></button></article>)}</div></div></section><FormSection type="career" /><FinalCta /></main>;
}

function NewsPage() {
  return <main><PageHero eyebrow="News & Insights" title="Ideas, progress, and perspectives." text="Updates from our projects, people, and the wider engineering industry." image={images.civic} /><section className="section"><div className="container"><div className="filter-row">{["All", "Company News", "Projects", "Industry", "Engineering", "Sustainability", "Events"].map((x,i) => <button className={i===0?"active":""} key={x}>{x}</button>)}</div><News /><div className="listing-grid">{projects.slice(0,3).map((p,i) => <article className="news-card" key={p.name}><div><img src={p.image} alt="" /><span>Industry Insights</span></div><small>22 AUG 2025</small><h3>{["How digital coordination is transforming project delivery", "Engineering resilient infrastructure for growing cities", "Five principles for safer construction sites"][i]}</h3><button>Read Story <Icon name="arrow" /></button></article>)}</div></div></section><FinalCta /></main>;
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  const questions = [
    ["What types of projects does Al-Rafaya deliver?", "We deliver residential, commercial, industrial, infrastructure, hospitality, healthcare, education, and government projects across Saudi Arabia."],
    ["Can you provide design-and-build services?", "Yes. Our integrated teams can manage design coordination, engineering, procurement, construction, commissioning, and handover under one contract."],
    ["How do I request a project quotation?", "Use our Request a Quote form and share the available project details. Our business development team will respond within two working days."],
    ["Do you undertake maintenance and renovation work?", "Yes. We provide planned and reactive maintenance, facility management, rehabilitation, fit-out, and renovation services."],
  ];
  return <section className="section faq"><div className="container"><SectionHead eyebrow="Frequently asked questions" title="What would you like to know?" /><div className="accordion">{questions.map(([q,a],i) => <div className={open===i?"open":""} key={q}><button aria-expanded={open===i} onClick={() => setOpen(open===i?-1:i)}><span>0{i+1}</span>{q}<Icon name={open===i?"close":"chevron"} /></button>{open===i&&<p>{a}</p>}</div>)}</div></div></section>;
}

function FaqPage() { return <main><PageHero eyebrow="FAQ" title="Clear answers. Better decisions." text="Answers to common questions about our services, delivery approach, and working with Al-Rafaya." /><FaqSection /><FinalCta /></main>; }

function Downloads() {
  return <section className="section downloads"><div className="container"><SectionHead eyebrow="Resources" title="Documents & downloads." /><div>{["Company Profile 2025", "Corporate Brochure", "Certifications & Accreditations", "Prequalification Document", "Quality Policy", "Health & Safety Policy"].map((x,i) => <article key={x}><span>PDF · {i+2}.4 MB</span><h3>{x}</h3><button aria-label={`Download ${x}`}><Icon name="download" /></button></article>)}</div></div></section>;
}
function DownloadsPage() { return <main><PageHero eyebrow="Downloads" title="Company resources." text="Access our latest corporate, policy, and prequalification documents." /><Downloads /><FinalCta /></main>; }

function FormSection({ type }: { type: "quote" | "contact" | "career" }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  const isQuote = type === "quote";
  return <section className="section form-section" id="application"><div className="container form-layout"><div><Eyebrow>{type === "career" ? "Apply now" : "Start a conversation"}</Eyebrow><h2>{type === "career" ? "Join our team." : isQuote ? "Tell us about your project." : "How can we help?"}</h2><p>Share a few details and the right member of our team will contact you within two working days.</p><div className="contact-block"><span><Icon name="phone" /><b>Call us</b><small>+966 11 245 8800</small></span><span><Icon name="mail" /><b>Email us</b><small>info@alrafaya.com.sa</small></span><span><Icon name="map" /><b>Head office</b><small>King Fahd Road, Riyadh, Saudi Arabia</small></span></div></div>{sent ? <div className="success"><Icon name="check" size={36} /><h3>Thank you for contacting us.</h3><p>Your request has been received. Our team will be in touch shortly.</p><Button onClick={() => setSent(false)}>Send Another Request</Button></div> : <form onSubmit={submit}><div className="form-grid"><label>Full Name *<input required placeholder="Your full name" /></label><label>{type === "career" ? "Email Address *" : "Company"}<input required={type === "career"} placeholder={type === "career" ? "name@email.com" : "Company name"} /></label><label>Email Address *<input required type="email" placeholder="name@company.com" /></label><label>Phone Number *<input required type="tel" placeholder="+966" /></label>{isQuote && <><label>Project Type<select required defaultValue=""><option value="" disabled>Select project type</option><option>Construction</option><option>Infrastructure</option><option>MEP</option><option>Fit-Out</option></select></label><label>Project Location<input placeholder="City, region" /></label><label>Estimated Area<input placeholder="Square meters" /></label><label>Estimated Budget<select defaultValue=""><option value="" disabled>Select budget range</option><option>SAR 1M – 5M</option><option>SAR 5M – 25M</option><option>SAR 25M+</option></select></label></>}{type === "career" && <><label>Position<select><option>Civil Engineer</option><option>Site Engineer</option><option>Project Manager</option></select></label><label>LinkedIn Profile<input placeholder="linkedin.com/in/..." /></label></>}<label className="full">{type === "career" ? "Cover Letter" : "Project Description / Message *"}<textarea required rows={6} placeholder="Tell us about your requirements..." /></label><label className="upload full"><Icon name="download" /><span><b>{type === "career" ? "Upload your CV" : "Upload drawings, BOQ, or documents"}</b><small>PDF, DOCX, DWG or ZIP · Max 20MB</small></span><input type="file" /></label></div><div className="form-submit"><small>By submitting, you agree to our privacy policy.</small><Button type="submit">{type === "career" ? "Submit Application" : isQuote ? "Submit Request" : "Send Message"}</Button></div></form>}</div></section>;
}

function QuotePage() { return <main><PageHero eyebrow="Request a Quote" title="Let’s bring your project to life." text="Share your project requirements. Our team will review them carefully and respond with the right next steps." image={images.detail} /><FormSection type="quote" /></main>; }
function ContactPage() { return <main><PageHero eyebrow="Contact Us" title="We’re ready to listen." text="Whether you have a project, a partnership opportunity, or a question, we would be pleased to hear from you." /><FormSection type="contact" /><section className="map-placeholder"><div><Icon name="map" size={36} /><b>Al-Rafaya Head Office</b><span>King Fahd Road, Riyadh</span></div></section></main>; }

function Footer() {
  const cols = [
    ["Company", ["About Us", "Our Team", "Careers", "Certifications"]],
    ["Services", ["Construction", "Infrastructure", "MEP", "Engineering", "Finishing", "Maintenance"]],
    ["Projects", ["All Projects", "Ongoing Projects", "Completed Projects"]],
    ["Resources", ["Company Profile", "News & Insights", "FAQ", "Downloads"]],
  ];
  return <footer><div className="container footer-top"><div className="footer-brand"><Logo light /><p>Engineering confidence.<br />Building enduring value.</p><div className="socials"><button>in</button><button>ig</button><button>f</button></div></div>{cols.map(([title, links]) => <div className="footer-col" key={title as string}><b>{title}</b>{(links as string[]).map(x => <button key={x} onClick={() => go(x === "FAQ" ? "faq" : x === "Downloads" ? "downloads" : title === "Services" ? "services" : title === "Projects" ? "projects" : "company")}>{x}</button>)}</div>)}<div className="footer-contact"><b>Contact</b><p>King Fahd Road<br />Riyadh, Saudi Arabia</p><a href="tel:+966112458800">+966 11 245 8800</a><a href="mailto:info@alrafaya.com.sa">info@alrafaya.com.sa</a></div></div><div className="container footer-bottom"><span>© 2025 Al-Rafaya Engineering & Contracting Co.</span><div><button>Privacy Policy</button><button>Terms & Conditions</button></div><span>Made for progress.</span></div></footer>;
}

function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [page, setPage] = useState(location.hash.slice(1) || "home");
  useEffect(() => {
    const update = () => setPage(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const pages: Record<string, ReactNode> = {
    home: <Home lang={lang} />, about: <AboutPage />, services: <ServicesPage />, "service-detail": <ServiceDetail />,
    projects: <ProjectsPage />, "project-detail": <ProjectDetail />, sectors: <SectorsPage />, company: <CompanyPage />,
    careers: <CareersPage />, news: <NewsPage />, quote: <QuotePage />, contact: <ContactPage />, faq: <FaqPage />, downloads: <DownloadsPage />,
  };
  return <div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "arabic" : ""}><Navbar lang={lang} setLang={setLang} />{pages[page] || pages.home}<Footer /></div>;
}

export default App;
