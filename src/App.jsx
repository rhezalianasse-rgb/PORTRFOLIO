import { Suspense, lazy, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  MessageCircle,
  Menu,
  X,
} from 'lucide-react';
import portfolio from './data/portfolio.js';
import './App.css';

const HeroScene = lazy(() => import('./components/HeroScene'));
const initials = portfolio.name
  .split(/\s+/)
  .map((part) => part.charAt(0))
  .slice(0, 2)
  .join('')
  .toUpperCase();

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.35] },
    );

    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu} aria-label={`${portfolio.name}, home`}>
        <span className="brand-mark">{initials}</span>
        <span className="brand-name">{portfolio.name.toUpperCase()}<span className="brand-dot">.</span></span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navigation.map(({ label, id }) => (
          <a
            className={activeSection === id ? 'nav-link is-active' : 'nav-link'}
            href={`#${id}`}
            key={id}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href={`mailto:${portfolio.contact.email}`} onClick={closeMenu}>
          Get in touch <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function Portrait() {
  const [imageAvailable, setImageAvailable] = useState(true);

  return (
    <div className="portrait-frame">
      <div className="portrait-frame-inner">
        {imageAvailable ? (
          <img
            className="portrait-image"
            src={portfolio.profileImage}
            alt={portfolio.profileAlt}
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <div className="portrait-empty" aria-label="Portrait not added yet">
            <span className="portrait-initials">AA</span>
            <span className="portrait-empty-note">YOUR PORTRAIT GOES HERE</span>
          </div>
        )}
        <span className="portrait-index">01 — 01</span>
        {portfolio.location && <span className="portrait-caption">{portfolio.location.toUpperCase()} <span>↗</span></span>}
      </div>
      <span className="frame-corner frame-corner-top" aria-hidden="true" />
      <span className="frame-corner frame-corner-bottom" aria-hidden="true" />
      <span className="portrait-orbit orbit-one" aria-hidden="true" />
      <span className="portrait-orbit orbit-two" aria-hidden="true" />
      <div className="portrait-note">
        <span className="note-spark">✳</span>
        <span>Curious by nature.<br />Building with purpose.</span>
      </div>
    </div>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const introVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="hero-section section-shell" id="home">
      <div className="hero-marquee" aria-hidden="true">PORTFOLIO</div>
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={introVariants}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow"><span className="eyebrow-line" /> SOFTWARE DEVELOPMENT STUDENT</p>
          <h1>
            Hi, I&apos;m<br />
            <span className="hero-name">{portfolio.name}<span className="hero-period">.</span></span>
          </h1>
          <p className="hero-role">{portfolio.role}</p>
          <p className="hero-description">
            I build modern web experiences and turn ideas into functional applications.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my projects <ArrowRight size={17} />
            </a>
            <a className="button button-text" href={`mailto:${portfolio.contact.email}`}>
              Let&apos;s talk <ArrowUpRight size={17} />
            </a>
            <a className="button button-secondary" href="/CV_Rhezali_Anass.pdf" download="CV_Rhezali_Anass.pdf">
              Download my CV <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="footnote-line" />
            <span>Currently studying at <strong>{portfolio.education}</strong></span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="scene-wrap" aria-hidden="true">
            <Suspense fallback={null}><HeroScene /></Suspense>
          </div>
          <div className="visual-glow" aria-hidden="true" />
          <Portrait />
          <div className="visual-label label-top"><span>FIG. 01</span><span>DEVELOPER IN THE MAKING</span></div>
          <div className="visual-label label-bottom"><span>CREATIVITY × CODE</span><span>2026</span></div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <span>SCROLL TO EXPLORE</span>
        <span className="scroll-cue-icon"><ArrowDown size={14} /></span>
      </a>
      <span className="hero-side-note" aria-hidden="true">INDEPENDENT THINKER · LIFELONG LEARNER</span>
    </section>
  );
}

function SectionHeading({ number, eyebrow, title, highlight }) {
  return (
    <div className="section-heading">
      <p className="eyebrow section-eyebrow"><span className="section-number">{number}</span>{eyebrow}</p>
      <h2>{title} {highlight && <span>{highlight}</span>}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="about-section section-shell section-space" id="about">
      <div className="about-heading">
        <SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" title="More than just" highlight="the code." />
      </div>
      <div className="about-content">
        <div className="about-main">
          <p className="about-lead">
            I&apos;m a Development student at <span>{portfolio.education}</span>, currently working
            toward my {portfolio.diploma} diploma.
          </p>
          <p className="about-description">
            I enjoy learning software development, building web projects and exploring creative
            ways to solve problems. Every project is a chance to learn something new and make
            something useful.
          </p>
          <a className="inline-link" href={`mailto:${portfolio.contact.email}`}>Get in touch <ArrowUpRight size={16} /></a>
        </div>
        <div className="about-side">
          <div className="about-graphic" aria-hidden="true">
            <div className="graphic-orbit graphic-orbit-a" />
            <div className="graphic-orbit graphic-orbit-b" />
            <div className="graphic-center"><Code2 size={26} strokeWidth={1.4} /></div>
            <span className="graphic-dot graphic-dot-a" />
            <span className="graphic-dot graphic-dot-b" />
            <span className="graphic-dot graphic-dot-c" />
          </div>
          <div className="study-card">
            <span className="study-card-icon"><Code2 size={16} /></span>
            <div>            <span className="study-label">DIPLOMA IN PROGRESS</span><strong>{portfolio.diploma}</strong></div>
            <span className="study-card-mark">↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section section-shell section-space" id="skills">
      <div className="skills-heading-row">
        <SectionHeading number="02" eyebrow="TOOLS OF THE TRADE" title="Always learning," highlight="always building." />
        <p className="skills-intro">My current toolkit includes the technologies I use to build web applications and work with data.</p>
      </div>
      {portfolio.skills.length > 0 ? (
        <div className="skills-list">
          {portfolio.skills.map((skill) => (
            <span className="skill-chip" key={skill}>{skill}</span>
          ))}
        </div>
      ) : (
        <div className="skills-empty">
          <span className="skills-empty-index">SKILLS / 00</span>
          <div className="skills-empty-message"><span className="skills-empty-mark">+</span><span>Add confirmed skills in <code>src/data/portfolio.js</code></span></div>
          <span className="skills-empty-note">NO MADE-UP PROFICIENCY SCORES. JUST THE REAL THING.</span>
        </div>
      )}
    </section>
  );
}

function Projects() {
  const projects = portfolio.projects;

  return (
    <section className="projects-section section-shell section-space" id="projects">
      <div className="projects-heading-row">
        <SectionHeading number="03" eyebrow="SELECTED WORK" title="Ideas made" highlight="real." />
        <span className="project-counter">{String(projects.length).padStart(2, '0')} <span>PROJECTS</span></span>
      </div>
      {projects.length > 0 ? (
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-art project-art-${(index % 3) + 1}`}>
                {project.image ? <img src={project.image} alt="" loading="lazy" /> : <div className="project-art-placeholder"><Code2 size={30} /></div>}
                <span className="project-art-index">0{index + 1}</span>
                {project.status && <span className="project-status">{project.status}</span>}
              </div>
              <div className="project-info">
                <div>
                  <h3>
                    <a href={project.github || project.demo} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                  </h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-links">
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}><Code2 size={17} /></a>}
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live`}><ArrowUpRight size={18} /></a>}
                </div>
              </div>
              {!!project.technologies?.length && <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
            </article>
          ))}
        </div>
      ) : (
        <div className="projects-empty">
          <div className="projects-empty-art" aria-hidden="true">
            <span className="empty-window empty-window-back" />
            <span className="empty-window empty-window-front"><i /><i /><i /><b>⌘</b></span>
            <span className="empty-star">✳</span>
            <span className="empty-cross">+</span>
          </div>
          <div className="projects-empty-copy">
            <span className="empty-label">THE NEXT CHAPTER</span>
            <h3>Good things are<br /><span>in progress.</span></h3>
            <p>As I build and finish projects, they&apos;ll find their way here. No placeholders pretending to be finished work — just the real thing, when it&apos;s ready.</p>
            <a className="inline-link" href={`mailto:${portfolio.contact.email}`}>Let&apos;s connect <ArrowUpRight size={16} /></a>
          </div>
        </div>
      )}
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-shell section-space" id="contact">
      <div className="contact-content">
        <div className="contact-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> CONTACT</p>
          <h2>Let&apos;s talk<span>.</span></h2>
        </div>
        <div className="contact-links">
          <a
            className="contact-method contact-email"
            href={`mailto:${portfolio.contact.email}`}
            aria-label={`Email ${portfolio.contact.email}`}
          >
            <span className="contact-method-icon"><ArrowUpRight size={18} /></span>
            <span className="contact-method-copy">
              <span className="contact-method-label">EMAIL</span>
              <span className="contact-method-value">{portfolio.contact.email}</span>
            </span>
            <ArrowUpRight className="contact-method-arrow" size={16} />
          </a>
          {portfolio.socialLinks.map(({ label, url }) => (
            <a
              className="contact-method contact-social"
              href={url}
              key={label}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <span className="contact-method-icon">
                {label === 'WhatsApp' ? <MessageCircle size={18} /> : <Code2 size={18} />}
              </span>
              <span className="contact-method-copy">
                <span className="contact-method-label">{label === 'WhatsApp' ? 'MESSAGE ME' : 'CONNECT'}</span>
                <span className="contact-method-value">
                  {label === 'WhatsApp' ? 'WhatsApp · 0654811996' : label === 'GitHub' ? 'github.com/rhezalianasse-rgb' : label}
                </span>
              </span>
              <ArrowUpRight className="contact-method-arrow" size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <a className="footer-brand" href="#home">{portfolio.name.toUpperCase()}<span>.</span></a>
      <span className="footer-credit">Designed &amp; built with React <span className="footer-heart">✳</span></span>
      <span className="footer-copyright">© {new Date().getFullYear()} ART ANASS</span>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.title = `${portfolio.name} | Software Developer Portfolio`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', portfolio.metaDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', portfolio.metaDescription);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-shell">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
