import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LuLeaf, LuCheck, LuArrowRight } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { fadeInUp, staggerContainer } from '../utils/animations'
import styles from './Style/Hero.module.css'
import combo_oil from "../data/Products/combo_oil.jpeg";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <motion.div
              className={styles.content}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp} className={styles.badge}>
                <LuLeaf size={14} />
                <span>100% Natural &amp; Chemical Free</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className={styles.headline}>
                Pure Cold Pressed Oils for{' '}
                <span className={styles.highlight}>Healthy</span> Living
              </motion.h1>

              <motion.p variants={fadeInUp} className={styles.subtext}>
                Extracted naturally using traditional Colden press machines. No chemicals.
                No heat. Just pure nutrition the way nature intended.
              </motion.p>

              <motion.div variants={fadeInUp} className={styles.btnGroup}>
                <Link to="/products" className="btn-primary-custom">
                  View Products
                  <LuArrowRight size={18} />
                </Link>
                <a
                  href="https://wa.me/918421429515?text=Hello%2C%20I%20am%20interested%20in%20your%20Cold%20pressed%20oils."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-custom"
                >
                  <FaWhatsapp size={18} />
                  Order on WhatsApp
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className={styles.trust}>
                <span className={styles.trustItem}>
                  <LuCheck size={16} className={styles.trustIcon} />
                  Chemical Free
                </span>
                <span className={styles.trustItem}>
                  <LuCheck size={16} className={styles.trustIcon} />
                  Cold Pressed
                </span>
                <span className={styles.trustItem}>
                  <LuCheck size={16} className={styles.trustIcon} />
                  100% Pure
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              className={styles.imageWrapper}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            >
              <div className={styles.decorCircle} />
              <div className={styles.decorDot} />
              <motion.img
                src={combo_oil}
                alt="Premium Cold pressed oil bottles"
                className={styles.heroImage}
                loading="eager"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero