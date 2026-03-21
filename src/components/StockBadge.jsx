import styles from './Style/StockBadge.module.css';

const StockBadge = ({ stockStatus, stockMessage, badge }) => {
  if (stockStatus === 'OUT_OF_STOCK') {
    return <span className={`${styles.badge} ${styles.outOfStock}`}>Out of Stock</span>;
  }
  if (stockStatus === 'LOW_STOCK' && stockMessage) {
    return <span className={`${styles.badge} ${styles.lowStock}`}>{stockMessage}</span>;
  }
  if (badge) {
    const badgeClass =
      badge === 'Bestseller'
        ? styles.bestseller
        : badge === 'Popular'
        ? styles.popular
        : badge === 'New'
        ? styles.newBadge
        : styles.default;
    return <span className={`${styles.badge} ${badgeClass}`}>{badge}</span>;
  }
  return null;
};

export default StockBadge;