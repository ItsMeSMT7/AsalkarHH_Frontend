import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../api/apiClient';
import StockBadge from './StockBadge';
import LoginPromptModal from './LoginPromptModal';
import styles from './Style/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart, showLoginModal, setShowLoginModal } = useCart();
  const [localShowModal, setLocalShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const isOutOfStock =
    product.stockStatus === 'OUT_OF_STOCK' || product.stock === 0;

  const handleAddToCart = () => {
    if (product.stock === undefined) {
      alert('Product currently not available. It will be available for order once the admin updates it.');
      return;
    }
    if (isOutOfStock) {
      alert('The product you selected is currently out of stock.');
      return;
    }
    const result = addToCart(product, 1);
    if (result === false) {
      setLocalShowModal(true);
      return;
    }
    if (result) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const closeModal = () => {
    setLocalShowModal(false);
    setShowLoginModal(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl ? getImageUrl(product.imageUrl) : product.image}
            alt={product.name}
            className={styles.image}
          />
          <div className={styles.badgeWrapper}>
            <StockBadge
              stockStatus={product.stockStatus}
              stockMessage={product.stockMessage}
              badge={product.stock !== undefined ? product.badge : null}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.category}>{product.category}</p>
          <h3 className={styles.name}>{product.name}</h3>
          {product.description && (
            <p 
              className={styles.description}
              title={product.description}
              style={{ fontSize: '0.85rem', color: '#666', margin: '4px 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {product.description}
            </p>
          )}
          <p className={styles.weight}>{product.weight || product.size}</p>

          <div className={styles.footer}>
            {product.stock !== undefined ? (
              <span className={styles.price}>
                ₹{product.price?.toFixed ? product.price.toFixed(2) : product.price}
              </span>
            ) : (
              <span className={styles.price}></span>
            )}
            <button
              className={`${styles.addBtn} ${
                isOutOfStock ? styles.disabled : ''
              } ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              {isOutOfStock
                ? 'Out of Stock'
                : added
                ? 'Added!'
                : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <LoginPromptModal
        isOpen={localShowModal || showLoginModal}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductCard;



// import { useState } from 'react'
// import { LuShoppingCart, LuCheck } from 'react-icons/lu'
// import { motion } from 'framer-motion'
// import { useCart } from '../context/CartContext'
// import styles from './Style/ProductCard.module.css'

// const getBadgeClass = (badge) => {
//   if (badge === 'Bestseller') return styles.badgeBestseller
//   if (badge === 'Popular') return styles.badgePopular
//   if (badge === 'New') return styles.badgeNew
//   return ''
// }

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart()
//   const [added, setAdded] = useState(false)

//   const handleAdd = () => {
//     addToCart(product)
//     setAdded(true)
//     setTimeout(() => setAdded(false), 1500)
//   }

//   const categoryShort = product.category.replace(' Oil', '').replace(' (Pend)', '')

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{ duration: 0.35 }}
//       className={styles.card}
//     >
//       <div className={styles.imageContainer}>
//         {product.badge && (
//           <span className={`${styles.badge} ${getBadgeClass(product.badge)}`}>
//             {product.badge}
//           </span>
//         )}
//         <span className={styles.categoryBadge}>{categoryShort}</span>
//         <img
//           src={product.image}
//           alt={product.name}
//           className={styles.productImage}
//           loading="lazy"
//         />
//       </div>
//       <div className={styles.content}>
//         <h3 className={styles.name}>{product.name}</h3>
//         <span className={styles.size}>{product.size}</span>
//         <div className={styles.priceRow}>
//           <span className={styles.price}>₹{product.price}</span>
//         </div>
//         <button
//           className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
//           onClick={handleAdd}
//           disabled={added}
//           aria-label={`Add ${product.name} ${product.size} to cart`}
//         >
//           {added ? (
//             <>
//               <LuCheck size={16} />
//               Added
//             </>
//           ) : (
//             <>
//               <LuShoppingCart size={16} />
//               Add to Cart
//             </>
//           )}
//         </button>
//       </div>
//     </motion.div>
//   )
// }

// export default ProductCard