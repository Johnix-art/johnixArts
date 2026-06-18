import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useHeaderScroll } from '../../hooks/useHeaderScroll.js'
import styles from './Header.module.css'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Commissions', to: '/commissions' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useHeaderScroll(60)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled ? styles.scrolled : '',
          isHome && !scrolled ? styles.heroMode : '',
        ].join(' ')}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="Johnix Arts — Home">
            <img src="/assets/LOGO1.png" alt="Johnix Arts" className={styles.logoImg} onError={e => e.target.style.display='none'} />
            <span className={styles.logoText}>Johnix Arts</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => [styles.navLink, isActive ? styles.active : ''].join(' ')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to="/commissions" className={styles.ctaBtn}>Commission Work</Link>
            <button
              className={styles.menuBtn}
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className={styles.mobileNav}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-label="Mobile navigation"
            >
              <div className={styles.mobileHeader}>
                <span className={styles.logoText}>Johnix Arts</span>
                <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close menu">
                  <FiX size={20} />
                </button>
              </div>
              <div className={styles.mobileLinks}>
                {NAV.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) => [styles.mobileLink, isActive ? styles.mobileLinkActive : ''].join(' ')}
                    >
                      <span className={styles.mobileLinkNum}>0{i + 1}</span>
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className={styles.mobileFooter}>
                <Link to="/commissions" className={styles.mobileCtaBtn}>Commission a Piece</Link>
                <p className={styles.mobileTagline}>Original Art · Worldwide</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
