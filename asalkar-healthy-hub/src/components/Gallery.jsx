import { motion } from 'framer-motion'
import { LuEye } from 'react-icons/lu'
import { scaleIn, staggerContainer } from '../utils/animations'
import { galleryImages } from '../data/data'
import styles from './Style/Gallery.module.css'

const colClasses = [
  'col-md-4 col-6',
  'col-md-4 col-6',
  'col-md-4 col-6',
  'col-md-6 col-6',
  'col-md-3 col-6',
  'col-md-3 col-12'
]

const Gallery = () => {
  return (
    <section className={styles.section} id="gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-subtitle">Our Gallery</span>
          <h2 className="section-title">A Glimpse Into Our World</h2>
        </motion.div>

        <motion.div
          className="row g-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={colClasses[index]}
              variants={scaleIn}
            >
              <div className={`${styles.imageCard} ${index === 3 ? styles.tall : ''}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <LuEye size={24} color="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery