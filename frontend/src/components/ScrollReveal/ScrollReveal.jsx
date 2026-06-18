import { useRef, useEffect, useState } from 'react'
import styles from './ScrollReveal.module.css'

export default function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[styles.base, styles[direction], visible ? styles.visible : '', className].join(' ')}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
