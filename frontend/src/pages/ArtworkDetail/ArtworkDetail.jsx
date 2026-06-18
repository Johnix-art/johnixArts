import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMaximize2, FiArrowRight } from 'react-icons/fi'
import Lightbox from '../../components/Lightbox/Lightbox.jsx'
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal.jsx'
import { getArtworkById, getRelatedArtworks } from '../../data/artworks.js'
import styles from './ArtworkDetail.module.css'

const PAGE = { initial:{ opacity:0 }, animate:{ opacity:1 }, exit:{ opacity:0 }, transition:{ duration:0.4 } }

export default function ArtworkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const artwork = getArtworkById(id)
  const [lbOpen, setLbOpen] = useState(false)

  if (!artwork) {
    return (
      <div className={styles.notFound}>
        <p>Artwork not found.</p>
        <Link to="/gallery" className={styles.backBtn}><FiArrowLeft size={14} /> Back to Gallery</Link>
      </div>
    )
  }

  const related = getRelatedArtworks(artwork)

  return (
    <motion.div {...PAGE} className={styles.page}>
      {/* Back bar */}
      <div className={styles.backBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
          <FiArrowLeft size={14} /> Back to Gallery
        </button>
      </div>

      {/* Detail layout */}
      <div className={styles.detail}>
        {/* Image */}
        <motion.div className={styles.imgCol}
          initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}>
          <div className={styles.imgWrap}>
            <img src={artwork.image} alt={artwork.title} className={styles.mainImg}
              onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()} />
            <button className={styles.expandBtn} onClick={() => setLbOpen(true)} aria-label="View fullscreen">
              <FiMaximize2 size={13} />
            </button>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div className={styles.infoCol}
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.1 }}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/gallery" className={styles.breadLink}>Gallery</Link>
            <span aria-hidden="true">/</span>
            <span>{artwork.category}</span>
          </nav>

          <h1 className={styles.title}>{artwork.title}</h1>

          <dl className={styles.meta}>
            {[
              { label: 'Medium', value: artwork.medium },
              { label: 'Dimensions', value: artwork.dimensions },
              { label: 'Year', value: artwork.year },
              { label: 'Category', value: artwork.category },
            ].map(({ label, value }) => (
              <div key={label} className={styles.metaItem}>
                <dt className={styles.metaLabel}>{label}</dt>
                <dd className={styles.metaValue}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.availBadge}>
            <span className={`${styles.availDot} ${artwork.available ? styles.green : styles.red}`} aria-hidden="true" />
            {artwork.available ? 'Available for acquisition' : 'Part of private collection'}
          </div>

          <p className={styles.description}>{artwork.description}</p>

          <div className={styles.actions}>
            {artwork.available
              ? <Link to="/contact" className={styles.inquireBtn}>Inquire About This Work <FiArrowRight size={14} /></Link>
              : <Link to="/commissions" className={styles.inquireBtn}>Commission a Similar Work <FiArrowRight size={14} /></Link>
            }
          </div>

          <div className={styles.edition}>
            <span className={styles.editionLabel}>Edition</span>
            <span className={styles.editionVal}>1 of 1 — Original</span>
          </div>
        </motion.div>
      </div>

      {/* Related works */}
      {related.length > 0 && (
        <section className={styles.related} aria-label="Related works">
          <div className={styles.relatedInner}>
            <h2 className={styles.relatedTitle}>Related Works</h2>
            <div className={styles.relatedGrid}>
              {related.map((art, i) => (
                <ScrollReveal key={art.id} delay={i * 80}>
                  <Link to={`/gallery/${art.id}`} className={styles.relatedCard}>
                    <div className={styles.relatedImgWrap}>
                      <img src={art.image} alt={art.title} loading="lazy"
                        onContextMenu={e => e.preventDefault()} />
                    </div>
                    <p className={styles.relatedName}>{art.title}</p>
                    <p className={styles.relatedMed}>{art.medium}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {lbOpen && (
        <Lightbox images={[artwork]} currentIndex={0} onClose={() => setLbOpen(false)}
          onPrev={() => {}} onNext={() => {}} />
      )}
    </motion.div>
  )
}
