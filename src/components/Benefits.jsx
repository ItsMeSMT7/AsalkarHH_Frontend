import { motion } from 'framer-motion'
import { LuFlaskConicalOff, LuHammer, LuHeartPulse, LuDroplets } from 'react-icons/lu'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { benefits } from '../data/data'
import styles from './Style/Benefits.module.css'

const iconMap = {
  flask: <LuFlaskConicalOff size={28} />,
  hammer: <LuHammer size={28} />,
  heart: <LuHeartPulse size={28} />,
  droplet: <LuDroplets size={28} />
}

const Benefits = () => {
  return (
    <section className={styles.section} id="benefits">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">The Purity You Can Trust</h2>
          <p className="section-description">
            Our oils are extracted using the traditional Cold press method that preserves
            all natural nutrients, flavor, and aroma.
          </p>
        </motion.div>

        <motion.div
          className="row g-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {benefits.map(benefit => (
            <motion.div
              key={benefit.id}
              className="col-lg-3 col-md-6 col-12"
              variants={fadeInUp}
            >
              <div className={styles.card}>
                <div className={styles.iconWrapper}>
                  {iconMap[benefit.icon]}
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDesc}>{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits