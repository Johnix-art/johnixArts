import { Link } from 'react-router-dom'
import { FiInstagram, FiMail, FiFacebook, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.brandName}>Johnix Arts</h2>
            <p className={styles.tagline}>
              Original charcoal, pencil &amp; paint works.<br />
              Fine art for collectors, commissions &amp; exhibitions.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/johnix_art/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}><FiInstagram size={17} /></a>
              <a href="https://x.com/Johnix_art?s=20" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={styles.socialLink}><FaXTwitter size={16} /></a>
              <a href="https://web.facebook.com/john.ikechukwu.761402?rdid=s9Q3FW50Kz4siWg6&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1ANAzcWR48%2F%3F_rdc%3D1%26_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}><FiFacebook size={17} /></a>
              <a href="https://wa.me/2348149548286" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialLink}><FaWhatsapp size={17} /></a>
              <a href="mailto:hello@johnixarts.com" aria-label="Email" className={styles.socialLink}><FiMail size={17} /></a>
              <a href="https://linktr.ee/johnike" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}><FiLinkedin size={17} /></a>
            </div>
          </div>
          <nav className={styles.nav} aria-label="Footer navigation">
            <div className={styles.navCol}>
              <span className={styles.navHead}>Explore</span>
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About</Link>
            </div>
            <div className={styles.navCol}>
              <span className={styles.navHead}>Work with Me</span>
              <Link to="/commissions">Commissions</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Johnix Arts. All rights reserved. Artworks may not be reproduced without permission.
          </p>
          <span className={styles.edition}>Fine Art · Original Works · Worldwide</span>
        </div>
      </div>
    </footer>
  )
}
