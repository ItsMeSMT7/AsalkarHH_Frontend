import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './Style/PageHero.module.css'

const PageHero = ({ title, subtitle, breadcrumbs }) => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {breadcrumbs && (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link to="/" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{title}</span>
            </nav>
          )}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}

export default PageHero