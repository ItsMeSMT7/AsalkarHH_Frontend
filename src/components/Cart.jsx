import { motion, AnimatePresence } from 'framer-motion'
import { LuX, LuMinus, LuPlus, LuTrash2, LuShoppingBag } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Style/Cart.module.css'

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    generateWhatsAppMessage
  } = useCart()

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    if (message) {
      window.open(`https://wa.me/918421429515?text=${message}`, '_blank')
    }
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <motion.aside
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Your Cart</h3>
                <span className={styles.itemCount}>({cartCount} items)</span>
              </div>
              <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
                <LuX size={22} />
              </button>
            </div>

            <div className={styles.itemsList}>
              {cartItems.length === 0 ? (
                <div className={styles.empty}>
                  <LuShoppingBag size={48} className={styles.emptyIcon} />
                  <h4 className={styles.emptyTitle}>Your cart is empty</h4>
                  <p className={styles.emptyText}>
                    Browse our products and add items to your cart.
                  </p>
                  <Link to="/products" className={styles.emptyBtn} onClick={closeCart}>
                    View Products
                  </Link>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <span className={styles.itemSize}>{item.size}</span>
                      <span className={styles.itemPrice}>₹{item.price}</span>
                      <div className={styles.itemActions}>
                        <div className={styles.quantityControl}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={styles.qtyBtn}
                            aria-label="Decrease quantity"
                          >
                            <LuMinus size={14} />
                          </button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={styles.qtyBtn}
                            aria-label="Increase quantity"
                          >
                            <LuPlus size={14} />
                          </button>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotalRow}>
                  <span className={styles.subtotalLabel}>Subtotal</span>
                  <span className={styles.subtotalValue}>₹{cartTotal}</span>
                </div>
                <button className={styles.whatsappBtn} onClick={handleWhatsAppOrder}>
                  <FaWhatsapp size={20} />
                  Order on WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart