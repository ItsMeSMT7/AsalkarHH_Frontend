import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../api/userOrderApi';
import OrderStatusTracker from '../components/OrderStatusTracker';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/OrderHistory.module.css';

const OrderHistory = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/orders&message=Please login to view your orders');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      if (response.success) setOrders(response.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#f0ad4e', CONFIRMED: '#4a7c59', SHIPPED: '#2196f3',
      DELIVERED: '#28a745', CANCEL_REQUESTED: '#ff9800', CANCELLED: '#dc3545',
    };
    return colors[status] || '#666';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <>
        <PageHero title="My Orders" subtitle="View your order history" />
        <section className={styles.section}><p className={styles.loadingText}>Loading orders...</p></section>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <PageHero title="My Orders" subtitle="View your order history" />
        <section className={styles.emptySection}>
          <motion.div className={styles.emptyState} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShoppingBag size={64} className={styles.emptyIcon} />
            <h3>No orders yet</h3>
            <p>Start shopping to see your orders here!</p>
            <Link to="/products" className={styles.shopBtn}><ShoppingBag size={18} /> Browse Products</Link>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="My Orders" subtitle={`${orders.length} order(s)`} />
      <section className={styles.section}>
        <div className={styles.container}>
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              className={styles.orderCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.orderHeader}>
                <div className={styles.orderId}>
                  <Package size={18} />
                  <span>Order #{order.id}</span>
                </div>
                <span className={styles.orderDate}>{formatDate(order.orderDate)}</span>
              </div>

              <div className={styles.orderBody}>
                <div className={styles.orderInfo}>
                  <div className={styles.itemCount}>{order.items?.length || 0} item(s)</div>
                  <div className={styles.paymentInfo}>
                    {order.paymentType} • <span style={{ color: getStatusColor(order.paymentStatus) }}>{order.paymentStatus}</span>
                  </div>
                </div>
                <OrderStatusTracker orderStatus={order.orderStatus} deliveryDate={order.deliveryDate} compact />
                <div className={styles.orderFooter}>
                  <div className={styles.totalAmount}>
                    <span>Total:</span>
                    <strong>₹{order.totalAmount?.toFixed(2)}</strong>
                  </div>
                  <Link to={`/orders/${order.id}`} className={styles.viewBtn}>
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default OrderHistory;