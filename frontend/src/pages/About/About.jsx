import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal.jsx'
import styles from './About.module.css'

const PAGE = { initial:{ opacity:0 }, animate:{ opacity:1 }, exit:{ opacity:0 }, transition:{ duration:0.4 } }

const TIMELINE = [
  { year: '2008', event: 'Began formal training in fine art and drawing' },
  { year: '2012', event: 'First solo exhibition — Abuja Art House' },
  { year: '2015', event: 'Awarded Best Emerging Artist, National Art Council' },
  { year: '2017', event: 'Featured in West African Contemporary Art Catalogue' },
  { year: '2019', event: 'International group show — London & New York' },
  { year: '2021', event: 'Commissioned by private collectors across three continents' },
  { year: '2023', event: 'Retrospective exhibition — The Johnix Arts Collection' },
  { year: '2024', event: 'Ongoing — new works, commissions, and exhibitions' },
]

const PROCESS = [
  { n: '01', title: 'Observation', desc: 'Extended looking before any mark is made. Understanding light, form, and the emotional register of the subject.' },
  { n: '02', title: 'Composition', desc: 'Placing the subject in space, considering what the empty areas say, how the eye will move across the surface.' },
  { n: '03', title: 'Construction', desc: 'Building form from broad to fine — establishing the whole before the parts. Working with and against the medium.' },
  { n: '04', title: 'Resolution', desc: 'The final refinements: adjusting values, completing details, deciding when the work has said what it needs to say.' },
]

export default function About() {
  return (
    <motion.div {...PAGE}>
      {/* Hero */}
      <section className={styles.hero} aria-label="Artist portrait">
        <div className={styles.heroImgCol}>
          <img src="/assets/ARTISTPIC.png" alt="Johnix — Fine Artist" />
        </div>
        <div className={styles.heroTextCol}>
          <motion.p className={styles.eyebrow} initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}>
            The Artist
          </motion.p>
          <motion.h1 className={styles.heroTitle} initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45, duration:0.8 }}>
            Johnix<br /><em>Fine Artist</em>
          </motion.h1>
          <motion.p className={styles.heroSub} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
            Charcoal · Pencil · Paint<br />Abuja, Nigeria — Worldwide
          </motion.p>
        </div>
      </section>

      {/* Statement */}
      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <div className={styles.statementLeft}>
            <ScrollReveal><p className={styles.eyebrow}>About Artist</p></ScrollReveal>
            <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>The Artist <br /><em>Behind the Work</em></h2></ScrollReveal>
          </div>
          <ScrollReveal className={styles.statementRight} delay={150}>
            <p>Born in 1999 , Onyegesi ikechukwu John is a passionate Nigerian artist who specializes in creating both hyper-realistic and abstract drawing and paintings using different mediums. He obtained his BA degree from the department of fine and applied art, University of Nigeria, Nsukka in 2024 .</p>
            <p>His journey in art has been one of discovery and learning and he have found solace in the strokes of a pencil, brushes and shades of charcoal and paint. His approach involves traditional techniques with personal innovations, each piece being a labor of love and patience.                </p>
            
            
            <p>I work primarily in charcoal and pencil because they demand commitment. Every mark is a decision. The possibility of erasure is always present, but the ghost of what was drawn never fully disappears. This trace — this evidence of process — is part of what the finished work communicates.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <div className={styles.processText}>
            <ScrollReveal><p className={styles.eyebrow}>The Process</p></ScrollReveal>
            <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>From observation<br /><em>to completion</em></h2></ScrollReveal>
            <div className={styles.processSteps}>
              {PROCESS.map(({ n, title, desc }, i) => (
                <ScrollReveal key={n} delay={i * 80}>
                  <div className={styles.processStep}>
                    <span className={styles.processNum}>{n}</span>
                    <div>
                      <h3 className={styles.processStepTitle}>{title}</h3>
                      <p className={styles.processStepDesc}>{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ScrollReveal direction="right" className={styles.processImgs}>
            <div className={styles.imgStack}>
              <img src="/assets/POR6.jpg" alt="Portrait study" className={styles.stackImg1}
                onContextMenu={e => e.preventDefault()} />
              <img src="/assets/ABS5.jpg" alt="Abstract work" className={styles.stackImg2}
                onContextMenu={e => e.preventDefault()} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineInner}>
          <div className={styles.timelineHead}>
            <ScrollReveal><p className={styles.eyebrow}>Journey</p></ScrollReveal>
            <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>Exhibition &amp;<br /><em>Recognition</em></h2></ScrollReveal>
          </div>
          <div className={styles.timeline} role="list">
            {TIMELINE.map(({ year, event }, i) => (
              <ScrollReveal key={year + i} delay={i * 60} className={styles.timelineItem} direction="up">
                <span className={styles.timelineYear}>{year}</span>
                <div className={styles.timelineDotWrap} aria-hidden="true">
                  <span className={styles.timelineDot} />
                </div>
                <p className={styles.timelineEvent}>{event}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <ScrollReveal><h2 className={styles.ctaTitle}>Work with<br /><em>the artist</em></h2></ScrollReveal>
          <ScrollReveal delay={100}><p className={styles.ctaText}>Commission a portrait, acquire an original, or simply start a conversation about what you're looking for.</p></ScrollReveal>
          <ScrollReveal delay={200}>
            <div className={styles.ctaBtns}>
              <Link to="/commissions" className={styles.btnGold}>Commissions <FiArrowRight size={14} /></Link>
              <Link to="/gallery" className={styles.btnGhostDark}>View Gallery</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
