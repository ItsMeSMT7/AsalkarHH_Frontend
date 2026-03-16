import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LuShoppingCart, LuArrowRight } from 'react-icons/lu'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { featuredProducts } from '../data/data'
import styles from './Style/FeaturedProducts.module.css'

const getBadgeClass = (badge) => {
  if (badge === 'Bestseller') return styles.badgeBestseller
  if (badge === 'Popular') return styles.badgePopular
  if (badge === 'New') return styles.badgeNew
  return ''
}

const FeaturedProducts = () => {
  return (
    <section className={styles.section} id="featured-products">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-subtitle">Our Products</span>
          <h2 className="section-title">Handpicked for Your Health</h2>
          <p className="section-description">
            Explore our range of cold pressed oils — each one crafted with care for your
            family&apos;s wellbeing.
          </p>
        </motion.div>

        <motion.div
          className="row g-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {featuredProducts.map(product => (
            <motion.div
              key={product.id}
              className="col-lg-3 col-md-6 col-6"
              variants={fadeInUp}
            >
              <Link to="/products" className={styles.card}>
                <div className={styles.imageContainer}>
                  {product.badge && (
                    <span className={`${styles.badge} ${getBadgeClass(product.badge)}`}>
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>From ₹{product.startingPrice}</span>
                    <span className={styles.viewLink}>
                      View <LuArrowRight size={14} />
                    </span>
                  </div>
                  <div className={styles.cartBtnWrapper}>
                    <span className={styles.cartBtn}>
                      <LuShoppingCart size={16} />
                      View All Sizes
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.viewAll}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link to="/products" className={styles.viewAllLink}>
            View All Products <LuArrowRight size={16} className={styles.viewAllArrow} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts