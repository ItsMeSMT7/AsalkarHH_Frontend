import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuLeaf, LuHeartPulse, LuUsers } from 'react-icons/lu'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '../utils/animations'
import PageHero from '../components/PageHero'
import styles from './PagesStyle/About.module.css'

const About = () => {
  useEffect(() => {
    document.title = 'About Us — Asalkar Healthy Hub Vita'
  }, [])

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Our Story of Purity & Tradition"
        breadcrumbs
      />

      <section className={styles.storySection}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                className={styles.imageWrapper}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=600&q=80"
                  alt="Traditional cold press oil machine"
                  className={styles.storyImage}
                  loading="lazy"
                />
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Happy Families</span>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="section-subtitle">Our Story</span>
                <h2 className={styles.storyTitle}>Born from Tradition, Crafted with Love</h2>
                <p className={styles.paragraph}>
                  Asalkar Healthy Hub Vita was founded by Rajakumar Asalkar with a simple yet
                  powerful mission — to bring back the authentic taste and health benefits of
                  traditional cold pressed oils to every Indian kitchen.
                </p>
                <p className={styles.paragraph}>
                  In an era where most oils are extracted using chemical solvents and extreme heat,
                  destroying vital nutrients, we chose a different path. We use the age-old wooden
                  Ghani (Kolhu) method where seeds are pressed slowly at low temperatures, preserving
                  all natural vitamins, antioxidants, and flavors.
                </p>
                <p className={styles.paragraph}>
                  Every bottle of our oil carries the legacy of generations of traditional oil pressing,
                  combined with modern hygiene and packaging standards. We source our seeds directly from
                  local farmers in Maharashtra, ensuring freshness and supporting the farming community.
                </p>

                <div className={styles.highlights}>
                  <div className={styles.highlightItem}>
                    <div className={styles.highlightIcon}>
                      <LuLeaf size={18} />
                    </div>
                    <div>
                      <h4 className={styles.highlightTitle}>100% Organic</h4>
                      <p className={styles.highlightDesc}>No chemicals or preservatives</p>
                    </div>
                  </div>
                  <div className={styles.highlightItem}>
                    <div className={styles.highlightIcon}>
                      <LuHeartPulse size={18} />
                    </div>
                    <div>
                      <h4 className={styles.highlightTitle}>Health First</h4>
                      <p className={styles.highlightDesc}>Nutrient-rich cold pressed extraction</p>
                    </div>
                  </div>
                  <div className={styles.highlightItem}>
                    <div className={styles.highlightIcon}>
                      <LuUsers size={18} />
                    </div>
                    <div>
                      <h4 className={styles.highlightTitle}>Family Legacy</h4>
                      <p className={styles.highlightDesc}>Generations of traditional expertise</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className="container">
          <motion.div
            className={styles.founderCard}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
              alt="Rajakumar Asalkar - Founder"
              className={styles.founderAvatar}
              loading="lazy"
            />
            <h3 className={styles.founderName}>Rajakumar Asalkar</h3>
            <span className={styles.founderTitle}>Founder, Asalkar Healthy Hub Vita</span>
            <blockquote className={styles.founderQuote}>
              &ldquo;My vision is to make pure, chemical-free cold pressed oils accessible to every
              household. Health is not a luxury — it is a right.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="section-subtitle">Our Values</span>
            <h2 className="section-title">What Drives Us Every Day</h2>
          </motion.div>

          <motion.div
            className="row g-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="col-lg-4 col-md-6" variants={fadeInUp}>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Purity</h3>
                <p className={styles.valueDesc}>
                  We never compromise on the purity of our oils. What you get is 100% natural —
                  no additives, no preservatives, no chemicals of any kind.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-lg-4 col-md-6" variants={fadeInUp}>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Tradition</h3>
                <p className={styles.valueDesc}>
                  We honor the traditional cold press method that has been used for centuries in
                  India. Our wooden Ghani machines preserve the true essence of every seed.
                </p>
              </div>
            </motion.div>
            <motion.div className="col-lg-4 col-md-12" variants={fadeInUp}>
              <div className={styles.valueCard}>
                <h3 className={styles.valueTitle}>Community</h3>
                <p className={styles.valueDesc}>
                  We work directly with local farmers across Maharashtra, supporting sustainable
                  agriculture and ensuring fair trade for everyone in our supply chain.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About