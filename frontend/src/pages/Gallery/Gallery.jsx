import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import Lightbox from '../../components/Lightbox/Lightbox.jsx'
import { artworks, categories } from '../../data/artworks.js'
import styles from './Gallery.module.css'

const PAGE = { initial:{ opacity:0 }, animate:{ opacity:1 }, exit:{ opacity:0 }, transition:{ duration:0.4 } }

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [lbIdx, setLbIdx] = useState(null)

  const filtered = useMemo(() => {
    let list = cat === 'All' ? artworks : artworks.filter(a => a.category === cat)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.medium.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
    }
    return list
  }, [cat, search])

  return (
    <motion.div {...PAGE} className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <p className={styles.eyebrow}>The Collection</p>
          <h1 className={styles.pageTitle}>Gallery</h1>
          <p className={styles.pageDesc}>An ongoing archive of original works — charcoal, pencil, paint. Each piece a sustained act of looking.</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <div className={styles.catFilters} role="group" aria-label="Filter by category">
            {categories.map(c => (
              <button key={c} className={[styles.catBtn, cat === c ? styles.catActive : ''].join(' ')}
                onClick={() => setCat(c)} aria-pressed={cat === c}>
                {c}
                <span className={styles.catCount}>{c === 'All' ? artworks.length : artworks.filter(a => a.category === c).length}</span>
              </button>
            ))}
          </div>
          <div className={styles.searchWrap}>
            <FiSearch size={13} className={styles.searchIcon} />
            <input type="search" placeholder="Search works…" value={search}
              onChange={e => setSearch(e.target.value)} className={styles.searchInput} aria-label="Search artworks" />
            {search && <button className={styles.clearSearch} onClick={() => setSearch('')} aria-label="Clear search"><FiX size={13} /></button>}
          </div>
        </div>
      </div>

      <div className={styles.resultsBar}>
        <div className={styles.resultsBarInner}>
          <span>{filtered.length} work{filtered.length !== 1 ? 's' : ''}</span>
          {(cat !== 'All' || search) && (
            <button className={styles.clearFilter} onClick={() => { setCat('All'); setSearch('') }}>
              Clear filters <FiX size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridWrap}>
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key={cat + search} className={styles.grid}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
              {filtered.map((art, i) => (
                <motion.article key={art.id} className={styles.card}
                  initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay: i*0.03, duration:0.4 }}>
                  <div className={styles.cardImg}
                    onClick={() => setLbIdx(i)} role="button" tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setLbIdx(i)} aria-label={`Quick view ${art.title}`}>
                    <img src={art.image} alt={art.title} loading="lazy" />
                    <div className={styles.quickView}>Quick View</div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span className={styles.cardCat}>{art.category}</span>
                      <span className={art.available ? styles.available : styles.sold}>{art.available ? 'Available' : 'Sold'}</span>
                    </div>
                    <h2 className={styles.cardTitle}><Link to={`/gallery/${art.id}`}>{art.title}</Link></h2>
                    <p className={styles.cardMedium}>{art.medium}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardDims}>{art.dimensions}</span>
                      <Link to={`/gallery/${art.id}`} className={styles.cardDetail}>Details →</Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div className={styles.empty} initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <p>No works match your search.</p>
              <button onClick={() => { setCat('All'); setSearch('') }}>Show all works</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {lbIdx !== null && (
        <Lightbox images={filtered} currentIndex={lbIdx} onClose={() => setLbIdx(null)}
          onPrev={() => setLbIdx((lbIdx - 1 + filtered.length) % filtered.length)}
          onNext={() => setLbIdx((lbIdx + 1) % filtered.length)} />
      )}
    </motion.div>
  )
}
