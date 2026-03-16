import { useState } from 'react'
import { LuShoppingCart, LuCheck } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import styles from './Style/ProductCard.module.css'

const getBadgeClass = (badge) => {
  if (badge === 'Bestseller') return styles.badgeBestseller
  if (badge === 'Popular') return styles.badgePopular
  if (badge === 'New') return styles.badgeNew
  return ''
}

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const categoryShort = product.category.replace(' Oil', '').replace(' (Pend)', '')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        {product.badge && (
          <span className={`${styles.badge} ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <span className={styles.categoryBadge}>{categoryShort}</span>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.size}>{product.size}</span>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
        </div>
        <button
          className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
          onClick={handleAdd}
          disabled={added}
          aria-label={`Add ${product.name} ${product.size} to cart`}
        >
          {added ? (
            <>
              <LuCheck size={16} />
              Added
            </>
          ) : (
            <>
              <LuShoppingCart size={16} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard