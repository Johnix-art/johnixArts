import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiInstagram, FiMail, FiSend, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal.jsx'
import styles from './Contact.module.css'

const PAGE = { initial:{ opacity:0 }, animate:{ opacity:1 }, exit:{ opacity:0 }, transition:{ duration:0.4 } }

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  const isValid = form.name.trim() && form.email.trim() && form.message.trim()

  return (
    <motion.div {...PAGE} className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <p className={styles.eyebrow}>Get in Touch</p>
          <h1 className={styles.pageTitle}>Let's Begin<br /><em>a Conversation</em></h1>
        </div>
      </div>

      <div className={styles.body}>
        {/* Info column */}
        <div className={styles.infoCol}>
          <ScrollReveal>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Email</p>
              <a href="mailto:hello@johnixarts.com" className={styles.infoValue}>hello@johnixarts.com</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Instagram</p>
              <a href="https://www.instagram.com/johnix_art/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>@johnixarts</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>WhatsApp</p>
              <a href="https://wa.me/2348149548286" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>+234 8149548286</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Response Time</p>
              <p className={styles.infoPlain}>Within 48 hours</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={320}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Based in</p>
              <p className={styles.infoPlain}>Abuja, Nigeria — Worldwide Reach</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className={styles.infoNote}>
              <p>Whether you're interested in acquiring an existing work, commissioning something new, or simply want to discuss the art — I'd love to hear from you.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={480}>
            <div className={styles.socials}>
              <a href="mailto:hello@johnixarts.com" className={styles.socialBtn} aria-label="Email"><FiMail size={17} /></a>
              <a href="https://instagram.com/johnixarts" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram"><FiInstagram size={17} /></a>
              <a href="https://wa.me/234000000000" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="WhatsApp"><FaWhatsapp size={17} /></a>
            </div>
          </ScrollReveal>
        </div>

        {/* Form column */}
        <motion.div className={styles.formCol}
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7 }}>
          {submitted ? (
            <div className={styles.success}>
              <div className={styles.successIcon}><FiCheck size={26} /></div>
              <h2 className={styles.successTitle}>Message sent</h2>
              <p className={styles.successText}>Thank you for reaching out. I'll reply within 48 hours.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label htmlFor="name" className={styles.label}>Your Name <abbr title="required">*</abbr></label>
                  <input id="name" name="name" type="text" className={styles.input}
                    placeholder="Full name" value={form.name} onChange={handleChange} required autoComplete="name" />
                </div>
                <div className={styles.formField}>
                  <label htmlFor="email" className={styles.label}>Email Address <abbr title="required">*</abbr></label>
                  <input id="email" name="email" type="email" className={styles.input}
                    placeholder="your@email.com" value={form.email} onChange={handleChange} required autoComplete="email" />
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <select id="subject" name="subject" className={styles.input} value={form.subject} onChange={handleChange}>
                  <option value="">Select a subject…</option>
                  <option value="commission">Commission Enquiry</option>
                  <option value="acquisition">Acquiring Existing Work</option>
                  <option value="exhibition">Exhibition / Collaboration</option>
                  <option value="press">Press / Media</option>
                  <option value="general">General Enquiry</option>
                </select>
              </div>
              <div className={styles.formField}>
                <label htmlFor="message" className={styles.label}>Message <abbr title="required">*</abbr></label>
                <textarea id="message" name="message" className={`${styles.input} ${styles.textarea}`}
                  placeholder="Tell me what you have in mind…" rows={7}
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={loading || !isValid}>
                {loading ? 'Sending…' : <><FiSend size={14} /> Send Message</>}
              </button>
              <p className={styles.formNote}>I respond to all messages personally, within 48 hours.</p>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
