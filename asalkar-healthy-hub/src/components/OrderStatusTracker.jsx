import styles from './Style/OrderStatusTracker.module.css';

const STEPS = [
  { key: 'CONFIRMED', label: 'Order Confirmed', icon: '✅' },
  { key: 'SHIPPED', label: 'In Courier', icon: '🚚' },
  { key: 'DELIVERED', label: 'Delivered', icon: '📦' },
];

const STATUS_INDEX = { PENDING: -1, CONFIRMED: 0, SHIPPED: 1, DELIVERED: 2 };

const OrderStatusTracker = ({ orderStatus, deliveryDate, compact = false }) => {
  if (orderStatus === 'CANCELLED') {
    return (
      <div className={styles.cancelledBar}>
        <span className={styles.cancelledIcon}>❌</span>
        <span>Order Cancelled</span>
      </div>
    );
  }

  if (orderStatus === 'CANCEL_REQUESTED') {
    const activeIndex = STATUS_INDEX['CONFIRMED'] ?? 0;
    return (
      <div className={styles.tracker}>
        <div className={styles.cancelRequestBadge}>
          ⏳ Cancellation Pending
        </div>
        <div
          className={`${styles.steps} ${compact ? styles.compact : ''}`}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className={`${styles.step} ${
                i <= activeIndex ? styles.active : ''
              }`}
            >
              <div className={styles.stepIcon}>{step.icon}</div>
              {!compact && (
                <div className={styles.stepLabel}>{step.label}</div>
              )}
              {i < STEPS.length - 1 && (
                <div
                  className={`${styles.connector} ${
                    i < activeIndex ? styles.activeConnector : ''
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className={styles.statusMessage}>
          Your cancellation request is under review
        </p>
      </div>
    );
  }

  const activeIndex = STATUS_INDEX[orderStatus] ?? -1;

  const getMessage = () => {
    switch (orderStatus) {
      case 'PENDING':
        return 'Processing your order...';
      case 'CONFIRMED':
        return 'Your order has been confirmed';
      case 'SHIPPED':
        return 'Your order is on the way';
      case 'DELIVERED':
        return `Order delivered${
          deliveryDate
            ? ` on ${new Date(deliveryDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}`
            : ' successfully'
        }`;
      default:
        return '';
    }
  };

  return (
    <div className={styles.tracker}>
      <div className={`${styles.steps} ${compact ? styles.compact : ''}`}>
        {STEPS.map((step, i) => (
          <div
            key={step.key}
            className={`${styles.step} ${
              i <= activeIndex ? styles.active : ''
            }`}
          >
            <div className={styles.stepIcon}>{step.icon}</div>
            {!compact && (
              <div className={styles.stepLabel}>{step.label}</div>
            )}
            {i < STEPS.length - 1 && (
              <div
                className={`${styles.connector} ${
                  i < activeIndex ? styles.activeConnector : ''
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <p className={styles.statusMessage}>{getMessage()}</p>
    </div>
  );
};

export default OrderStatusTracker;