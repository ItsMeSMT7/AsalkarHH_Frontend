import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LuLeaf } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { fadeInUp } from '../utils/animations'
import styles from './Style/CTA.module.css'

const CTA = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.card}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <LuLeaf size={30} className={styles.icon} />
          <h2 className={styles.headline}>Start Your Healthy Lifestyle Today</h2>
          <p className={styles.subtext}>
            Order fresh Cold pressed oils directly from our farm. Delivered with love to
            your doorstep.
          </p>
          <div className={styles.btnGroup}>
            <Link to="/products" className={styles.btnWhite}>
              Shop Now
            </Link>
            <a
              href="https://wa.me/918421429515?text=Hello%2C%20I%20would%20like%20to%20order%20Cold%20pressed%20oils."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutline}
            >
              <FaWhatsapp size={18} />
              WhatsApp Order
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA