import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlus, FiMinus } from 'react-icons/fi'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal.jsx'
import styles from './Commissions.module.css'

const PAGE = { initial:{ opacity:0 }, animate:{ opacity:1 }, exit:{ opacity:0 }, transition:{ duration:0.4 } }

const TYPES = [
  { n:'01', title:'Portrait Commission', desc:'From a single subject to full-family portraits. Charcoal or pencil on paper, canvas paper, or Bristol board.', from:'₦35,000', time:'3–6 weeks', sizes:['A3 (30×42cm)','A2 (42×59cm)','A1 (59×84cm)','Custom'] },
  { n:'02', title:'Landscape Study', desc:'A place that matters to you — rendered in sustained, careful study. From reference photographs or original visits.', from:'₦40,000', time:'4–8 weeks', sizes:['Medium (50×70cm)','Large (70×100cm)','Custom'] },
  { n:'03', title:'Abstract Work', desc:'A commission defined by colour, mood, and emotional resonance. Collaborative by nature — your vision, realised.', from:'₦50,000', time:'4–10 weeks', sizes:['Various formats available'] },
  { n:'04', title:'Painting Commission', desc:'Oil or acrylic on canvas. Richer colour, greater presence. For collectors seeking a work with true permanence.', from:'₦60,000', time:'6–12 weeks', sizes:['Medium (60×80cm)','Large (80×100cm)','Statement (100×130cm)'] },
]

const PROCESS = [
  { n:'01', title:'Initial Enquiry', desc:'Tell me about what you have in mind — subject, size, medium, intended space. No commitment at this stage.' },
  { n:'02', title:'Consultation', desc:'We discuss your vision in detail. I share preliminary ideas, ask questions, and we agree on the scope of the work.' },
  { n:'03', title:'Deposit & Brief', desc:'A 50% deposit confirms the commission. Preliminary sketches are shared for your approval before the final piece.' },
  { n:'04', title:'Creation', desc:'The work is made. I document the process and share progress at key stages. Your feedback is welcomed throughout.' },
  { n:'05', title:'Delivery', desc:'On completion, you receive professional photographs of the work. Delivery or collection is arranged. Balance payment due.' },
]

const FAQS = [
  { q:'Can I commission a portrait from a photograph?', a:'Yes — high-resolution photographs work well as reference. I can advise on what makes a good reference image after you get in touch.' },
  { q:'Do you offer payment plans?', a:'A 50% deposit is required to begin work. The remaining balance is due on completion. For larger commissions, staged payments can be arranged.' },
  { q:'Can I give a commission as a gift?', a:"Absolutely. Many commissions I receive are gifts. I can coordinate the reveal and maintain full confidentiality throughout the process." },
  { q:"What if I'm not satisfied?", a:'I share progress images and seek approval at key stages. Significant revisions can be requested before the work is considered complete.' },
  { q:'Do you ship internationally?', a:'Yes. Works are professionally packaged and shipped worldwide. Shipping costs are additional and vary by destination.' },
  { q:'How far in advance should I commission?', a:'I accept a limited number of commissions at a time. I recommend enquiring at least 8–12 weeks before you need the work delivered.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqBtn} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        {open ? <FiMinus size={15} /> : <FiPlus size={15} />}
      </button>
      {open && (
        <motion.p className={styles.faqAnswer}
          initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.25 }}>
          {a}
        </motion.p>
      )}
    </div>
  )
}

export default function Commissions() {
  return (
    <motion.div {...PAGE} className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <p className={styles.eyebrow}>Commission a Work</p>
          <h1 className={styles.pageTitle}>Original Art<br /><em>Made for You</em></h1>
          <p className={styles.pageDesc}>A commissioned work is a unique collaboration — between your vision and the artist's hand. Every piece is one of a kind, created specifically for you.</p>
        </div>
      </div>

      {/* Commission types */}
      <section className={styles.typesSection}>
        <div className={styles.typesInner}>
          <ScrollReveal><p className={styles.eyebrow}>What I Offer</p></ScrollReveal>
          <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>Commission<br /><em>Options</em></h2></ScrollReveal>
          <div className={styles.typesGrid}>
            {TYPES.map((t, i) => (
              <ScrollReveal key={t.n} delay={i * 80}>
                <div className={styles.typeCard}>
                  <div className={styles.typeNum}>{t.n}</div>
                  <h3 className={styles.typeTitle}>{t.title}</h3>
                  <p className={styles.typeDesc}>{t.desc}</p>
                  <div className={styles.typeMeta}>
                    <div><span className={styles.metaLabel}>From</span><span className={styles.metaVal}>{t.from}</span></div>
                    <div><span className={styles.metaLabel}>Timeline</span><span className={styles.metaVal}>{t.time}</span></div>
                  </div>
                  <div className={styles.typeSizes}>
                    {t.sizes.map(s => <span key={s} className={styles.sizeTag}>{s}</span>)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <div className={styles.processHead}>
            <p className={styles.eyebrow}>How It Works</p>
            <h2 className={styles.sectionTitle}>The commission<br /><em>process</em></h2>
          </div>
          <div className={styles.processSteps}>
            {PROCESS.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 70}>
                <div className={styles.processStep}>
                  <span className={styles.processNum}>{s.n}</span>
                  <div>
                    <h3 className={styles.processTitle}>{s.title}</h3>
                    <p className={styles.processDesc}>{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHead}>
            <p className={styles.eyebrow}>Questions</p>
            <h2 className={styles.sectionTitle}>Frequently<br /><em>Asked</em></h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <p className={styles.eyebrowLight}>Ready to Begin?</p>
          <ScrollReveal><h2 className={styles.ctaTitle}>Let's make<br /><em>something together</em></h2></ScrollReveal>
          <ScrollReveal delay={100}><p className={styles.ctaText}>Send an enquiry and I'll be in touch within 48 hours to discuss your commission.</p></ScrollReveal>
          <ScrollReveal delay={200}>
            <Link to="/contact" className={styles.btnGold}>Send an Enquiry <FiArrowRight size={14} /></Link>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
