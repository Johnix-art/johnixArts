import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './Lightbox.module.css'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // touch swipe
  let touchX = 0
  const onTouchStart = (e) => { touchX = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    const diff = touchX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev()
  }

  const art = images[currentIndex]
  const src = typeof art === 'string' ? art : art?.image
  const title = art && typeof art === 'object' ? art.title : ''
  const medium = art && typeof art === 'object' ? art.medium : ''

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="dialog" aria-modal="true" aria-label="Artwork viewer"
      >
        <button className={styles.close} onClick={onClose} aria-label="Close viewer"><FiX size={19} /></button>
        {images.length > 1 && (
          <div className={styles.counter}>{currentIndex + 1} / {images.length}</div>
        )}

        <motion.div
          className={styles.wrap}
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src} alt={title || 'Artwork'}
            className={styles.img}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          {title && (
            <div className={styles.caption}>
              <span className={styles.captionTitle}>{title}</span>
              {medium && <span className={styles.captionMedium}>{medium}</span>}
            </div>
          )}
        </motion.div>

        {images.length > 1 && (
          <>
            <button className={`${styles.nav} ${styles.prev}`} onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous"><FiChevronLeft size={24} /></button>
            <button className={`${styles.nav} ${styles.next}`} onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next"><FiChevronRight size={24} /></button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
