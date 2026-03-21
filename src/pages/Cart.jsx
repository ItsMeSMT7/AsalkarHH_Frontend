import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getAllProducts } from '../api/productApi';
import { getImageUrl } from '../api/apiClient';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, updateCartStock } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stockWarnings, setStockWarnings] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/cart&message=Please login to view your cart');
      return;
    }
    syncStock();
  }, [isAuthenticated]);

  const syncStock = async () => {
    try {
      const response = await getAllProducts();
      if (response.success && response.data) {
        const warnings = [];
        response.data.forEach((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          if (cartItem && cartItem.stock !== product.stock) {
            if (product.stock < cartItem.quantity) {
              warnings.push(`Stock updated: Only ${product.stock} available for ${product.name}`);
            }
            updateCartStock(product.id, product.stock);
          }
        });
        setStockWarnings(warnings);
        if (warnings.length > 0) setTimeout(() => setStockWarnings([]), 5000);
      }
    } catch (err) {
      console.error('Failed to sync stock:', err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <PageHero title="Shopping Cart" subtitle="Your cart is empty" />
        <section className={styles.emptySection}>
          <motion.div className={styles.emptyState} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShoppingBag size={64} className={styles.emptyIcon} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven&apos;t added any products yet.</p>
            <Link to="/products" className={styles.shopBtn}>
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="Shopping Cart" subtitle={`${cartItems.length} item(s) in your cart`} />
      <section className={styles.cartSection}>
        <div className={styles.container}>
          {stockWarnings.map((w, i) => (
            <div key={i} className={styles.warningMsg}>{w}</div>
          ))}

          <div className={styles.cartLayout}>
            <div className={styles.cartItems}>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={styles.cartItem}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <img src={getImageUrl(item.imageUrl)} alt={item.name} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <h4>{item.name}</h4>
                      <p className={styles.itemWeight}>{item.weight}</p>
                      <p className={styles.itemPrice}>₹{item.price}</p>
                    </div>
                    <div className={styles.qtyControls}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={styles.qtyBtn}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={styles.qtyBtn}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className={styles.itemSubtotal}>
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div className={styles.cartSummary} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3><ShoppingCart size={20} /> Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span className={styles.freeDelivery}>FREE</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className={styles.checkoutBtn}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <Link to="/products" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;