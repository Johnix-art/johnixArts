import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowDown } from 'react-icons/fi'
import Lightbox from '../../components/Lightbox/Lightbox.jsx'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal.jsx'
import { artworks, featuredArtworks } from '../../data/artworks.js'
import styles from './Home.module.css'

const PAGE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4 } }
const showcase = artworks.slice(0, 9)

export default function Home() {
  const [lbIdx, setLbIdx] = useState(null)
  const [lbSet, setLbSet] = useState([])
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [])

  const openLb = (set, idx) => { setLbSet(set); setLbIdx(idx) }
  const closeLb = () => setLbIdx(null)

  return (
    <motion.div {...PAGE}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <video ref={videoRef} src="/assets/Advert.mp4" preload="auto" autoPlay muted loop playsInline className={styles.heroVideo} aria-hidden="true" />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <motion.p className={styles.heroEyebrow} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3,duration:0.8 }}>
            Original Fine Art
          </motion.p>
          <motion.h1 className={styles.heroTitle} initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.5,duration:1 }}>
            Arts that Speaks beyound <br /><em>Paper and Canvas</em>
          </motion.h1>
          <motion.p className={styles.heroSub} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.8,duration:0.8 }}>
            Portraits, abstracts and landscapes — handcrafted for collectors, exhibitions and private commissions.
          </motion.p>
          <motion.div className={styles.heroCtas} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:1,duration:0.8 }}>
            <Link to="/gallery" className={styles.btnPrimary}>View Gallery <FiArrowRight size={15} /></Link>
            <Link to="/commissions" className={styles.btnGhost}>Commission a Piece</Link>
          </motion.div>
        </div>
        <motion.div className={styles.heroScroll} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }} aria-hidden="true">
          <FiArrowDown size={15} /><span>Scroll</span>
        </motion.div>
      </section>

      {/* STRIP */}
      <div className={styles.strip}>
        {['Original Artworks','Worldwide Commissions','Premium Materials','Gallery Exhibitions'].map(t => (
          <span key={t} className={styles.stripItem}>{t}</span>
        ))}
      </div>

      {/* FEATURED */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <div className={styles.sectionHead}>
            <div>
              <ScrollReveal><p className={styles.eyebrow}>Featured Works</p></ScrollReveal>
              <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>Selected from<br /><em>The Collection</em></h2></ScrollReveal>
            </div>
            <ScrollReveal direction="right"><Link to="/gallery" className={styles.viewAll}>View All Works <FiArrowRight size={13} /></Link></ScrollReveal>
          </div>
          <div className={styles.featuredGrid}>
            {featuredArtworks.slice(0, 6).map((art, i) => (
              <ScrollReveal key={art.id} delay={i * 80} className={`${styles.featCard} ${i === 0 ? styles.featLarge : ''}`}>
                <div className={styles.featImgWrap} onClick={() => openLb(featuredArtworks, i)} role="button" tabIndex={0}
                     onKeyDown={(e) => e.key === 'Enter' && openLb(featuredArtworks, i)} aria-label={`Quick view ${art.title}`}>
                  <img src={art.image} alt={art.title} loading="lazy" />
                  <div className={styles.featOverlay}>Quick View</div>
                </div>
                <div className={styles.featInfo}>
                  <div>
                    <p className={styles.cardCat}>{art.category}</p>
                    <h3 className={styles.cardTitle}><Link to={`/gallery/${art.id}`}>{art.title}</Link></h3>
                  </div>
                  <div className={styles.cardMeta}>
                    <span>{art.medium}</span>
                    <span className={art.available ? styles.available : styles.sold}>{art.available ? 'Available' : 'Sold'}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTIST INTRO */}
      <section className={styles.artistSection}>
        <div className={styles.artistInner}>
          <ScrollReveal direction="left" className={styles.artistImgCol}>
            <div className={styles.artistImgWrap}>
              <img src="/assets/ARTISTPIC.png" alt="Johnix — Fine Artist" />
            </div>
            <div className={styles.credential}>
              <span className={styles.credNum}>15+</span>
              <span className={styles.credLabel}>Years of Practice</span>
            </div>
          </ScrollReveal>
          <div className={styles.artistTextCol}>
            <ScrollReveal><p className={styles.eyebrow}>The Artist</p></ScrollReveal>
            <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>Art as a form<br /><em>of presence</em></h2></ScrollReveal>
            <ScrollReveal delay={200}><p className={styles.artistText}>My work lives at the intersection of the observed and the felt. Through charcoal, pencil, and paint, I pursue the weight of a moment — the way light falls on a face, the tension held in a landscape, the emotion encoded in abstraction.</p></ScrollReveal>
            <ScrollReveal delay={300}><p className={styles.artistText}>Every work begins in silence and close observation. The medium is always in conversation with the subject — charcoal with its capacity for depth and erasure; pencil with its precision and vulnerability; paint with its sensual generosity.</p></ScrollReveal>
            <ScrollReveal delay={400}><Link to="/about" className={styles.textLink}>About Me <FiArrowRight size={13} /></Link></ScrollReveal>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className={styles.galleryPreview}>
        <div className={styles.galleryPreviewHead}>
          <ScrollReveal><p className={styles.eyebrow}>The Gallery</p></ScrollReveal>
          <ScrollReveal delay={100}><h2 className={styles.sectionTitle}>Explore my full<br /><em>collection</em></h2></ScrollReveal>
        </div>
        <div className={styles.masonry}>
          {showcase.map((art, i) => (
            <ScrollReveal key={art.id} delay={(i % 4) * 80}
              className={`${styles.masonryItem} ${i % 3 === 0 ? styles.masonryTall : ''}`}>
              <div className={styles.masonryInner} onClick={() => openLb(showcase, i)}
                   role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openLb(showcase, i)} aria-label={`View ${art.title}`}>
                <img src={art.image} alt={art.title} loading="lazy" />
                <div className={styles.masonryOverlay}>
                  <span>{art.title}</span>
                  <small>{art.category}</small>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className={styles.galleryPreviewCta}>
          <Link to="/gallery" className={styles.btnPrimary}>Enter the Gallery <FiArrowRight size={15} /></Link>
        </div>
      </section>

      {/* COMMISSION CTA */}
      <section className={styles.commissionCta}>
        <ScrollReveal className={styles.commissionCtaInner}>
          <p className={styles.eyebrowLight}>Commission an Original</p>
          <h2 className={styles.commissionTitle}>A piece made<br /><em>only for you</em></h2>
          <p className={styles.commissionText}>From intimate portrait studies to large-scale abstracts — every commissioned work is a unique collaboration between artist and collector.</p>
          <Link to="/commissions" className={styles.btnGold}>Start the Conversation <FiArrowRight size={15} /></Link>
        </ScrollReveal>
      </section>

      {lbIdx !== null && (
        <Lightbox images={lbSet} currentIndex={lbIdx} onClose={closeLb}
          onPrev={() => setLbIdx((lbIdx - 1 + lbSet.length) % lbSet.length)}
          onNext={() => setLbIdx((lbIdx + 1) % lbSet.length)} />
      )}
    </motion.div>
  )
}
