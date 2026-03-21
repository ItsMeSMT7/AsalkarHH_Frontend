import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { LuQuote, LuStar, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { fadeInUp } from '../utils/animations'
import { testimonials } from '../data/data'
import styles from './Style/Testimonials.module.css'

const Testimonials = () => {
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [goNext])

  const t = testimonials[current]

  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
        </motion.div>

        <motion.div
          className={styles.carouselWrapper}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <button
            className={styles.arrowBtn}
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <LuChevronLeft size={20} />
          </button>

          <div className={styles.card}>
            <LuQuote size={36} className={styles.quoteIcon} />
            <div key={current} className={styles.fadeWrapper}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.stars}>
                {[...Array(t.rating)].map((_, i) => (
                  <LuStar key={i} size={18} className={styles.starIcon} fill="#FBBF24" />
                ))}
              </div>
              <div className={styles.author}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={styles.avatar}
                  loading="lazy"
                />
                <div>
                  <h4 className={styles.name}>{t.name}</h4>
                  <span className={styles.location}>{t.location}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className={styles.arrowBtn}
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <LuChevronRight size={20} />
          </button>
        </motion.div>

        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials