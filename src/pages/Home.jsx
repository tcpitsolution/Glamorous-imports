import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import PortfolioGallery from '../components/PortfolioGallery'
import FAQ from '../components/FAQ'
import ReviewSection from '../components/ReviewSection'
import MapSection from '../components/MapSection'
import { services } from '../data/services'
import { business, whatsappUrl } from '../config/business'
import { Helmet } from 'react-helmet-async'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  const introRef = useReveal()
  const servicesRef = useReveal()
  const portfolioRef = useReveal()
  const quoteRef = useReveal()
  const reviewsRef = useReveal()
  const faqRef = useReveal()
  const locationRef = useReveal()
  const closingRef = useReveal()

  return (
    <>
      <Helmet>
        <title>Glamorous Imports | Modern Home Decoration in Georgetown, Guyana</title>
        <meta name="description" content="Discover modern home decoration inspiration from Glamorous Imports in Georgetown, Guyana. Explore interior styling ideas and contact us to discuss your space." />
      </Helmet>

      <section className="hero">
        <div className="hero-image" role="img" aria-label="Elegant contemporary living room with warm natural materials" />
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.span className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            INTERIOR DECORATION · GEORGETOWN, GUYANA
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .8 }}>
            Your Space.<br />Your Style.<br /><i>Your Story.</i>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}>
            Discover thoughtfully styled interiors and beautiful home decoration designed to bring comfort, elegance, and personality into every space.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}>
            <Link className="button button-light" to="/portfolio">Explore Inspiration <ArrowUpRight size={16} /></Link>
            <Link className="hero-secondary" to="/appointment">Book a Consultation <MoveUpRight size={16} /></Link>
          </motion.div>
        </div>
        <div className="hero-side-label">A HOME THAT FEELS LIKE YOU</div>
        <div className="hero-bottom">
          <span>MODERN HOME DECORATION</span>
          <a href="#intro">SCROLL TO DISCOVER <ArrowDown size={14} /></a>
          <span>06°48' N · GEORGETOWN</span>
        </div>
      </section>

      <section id="intro" ref={introRef} className="intro-section section-pad reveal reveal-left">
        <div className="intro-side">
          <span className="eyebrow">THE ART OF HOME</span>
          <span className="vertical-rule" />
        </div>
        <div className="intro-copy">
          <h2>Good design is not just seen.<br /><i>It is felt.</i></h2>
          <p>Glamorous Imports is a home decoration business based in Georgetown, Guyana, focused on modern home decoration and spaces that feel welcoming, elegant, and personal.</p>
          <Link className="text-link" to="/about">Discover our approach <ArrowUpRight size={16} /></Link>
        </div>
        <div className="intro-photo">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Warm, modern living room interior inspiration" loading="lazy" />
          <span>01 / A study in softness</span>
        </div>
      </section>

      <section ref={servicesRef} className="services-section section-pad reveal">
        <SectionHeading eyebrow="WHAT INSPIRES US" title={<>Thoughtful Details.<br /><i>Beautiful Spaces.</i></>} copy="Explore decoration categories and styling ideas that can help make a space feel more like you." />
        <div className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
        <p className="demo-note">These are proposed demo categories for this website concept, not a verified list of available services.</p>
        <div className="section-cta">
          <Link className="text-link" to="/services">Explore all categories <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section ref={portfolioRef} className="portfolio-section section-pad reveal reveal-scale">
        <div className="portfolio-heading">
          <SectionHeading eyebrow="A WORLD OF IDEAS" title={<>Spaces That <i>Inspire.</i></>} copy="A curated moodboard of contemporary interiors, textures, and thoughtful details." />
        </div>
        <PortfolioGallery limit={4} />
        <div className="section-cta">
          <Link className="button button-outline" to="/portfolio">Explore the inspiration gallery <ArrowUpRight size={16} /></Link>
        </div>
        <p className="demo-note">All gallery images are illustrative inspiration only and are not represented as completed Glamorous Imports projects.</p>
      </section>

      <section ref={quoteRef} className="quote-band reveal">
        <span className="quote-mark">"</span>
        <p>Let your home tell a story<br />that feels <i>uniquely yours.</i></p>
        <span className="eyebrow">GLAMOROUS IMPORTS · {business.tagline.toUpperCase()}</span>
      </section>

      <section ref={reviewsRef} className="reviews-wrap section-pad reveal reveal-right">
        <SectionHeading eyebrow="KIND WORDS, WHEN VERIFIED" title={<>What Customers<br /><i>Are Saying.</i></>} copy="The business profile lists a 4.5/5 rating from two reviews. Review text has not been provided for this demo." />
        <ReviewSection />
      </section>

      <section id="faq" ref={faqRef} className="faq-section section-pad reveal">
        <div>
          <SectionHeading eyebrow="GOOD TO KNOW" title={<>A Few Helpful<br /><i>Answers.</i></>} />
          <p className="faq-intro">Have another question? We would be happy to help you find the right next step.</p>
          <Link to="/contact" className="text-link">Ask us directly <ArrowUpRight size={16} /></Link>
        </div>
        <FAQ />
      </section>

      <section ref={locationRef} className="location-section section-pad reveal reveal-left">
        <SectionHeading eyebrow="FIND US IN GEORGETOWN" title={<>Come see things<br /><i>from a new angle.</i></>} copy="Contact the business to discuss your decoration requirements and verify details before visiting." />
        <MapSection />
      </section>

      <section ref={closingRef} className="closing-cta reveal reveal-scale">
        <div className="closing-image" />
        <div className="closing-content">
          <span className="eyebrow">YOUR SPACE, YOUR STORY</span>
          <h2>Every beautiful space<br />starts with a <i>conversation.</i></h2>
          <p>Tell us a little about the space you have in mind.</p>
          <Link className="button button-light" to="/appointment">Let's Talk About Your Space <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
