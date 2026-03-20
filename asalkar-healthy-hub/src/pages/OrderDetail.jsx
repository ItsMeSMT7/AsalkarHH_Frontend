import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, CreditCard, MessageCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyOrderById } from '../api/userOrderApi';
import { getWhatsAppMessage } from '../api/orderApi';
import OrderStatusTracker from '../components/OrderStatusTracker';
import CancelOrderModal from '../components/CancelOrderModal';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/OrderDetail.module.css';

const OrderDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login?returnUrl=/orders/' + id); return; }
    fetchOrder();
  }, [id, isAuthenticated]);

  const fetchOrder = async () => {
    try {
      const response = await getMyOrderById(id);
      if (response.success) setOrder(response.data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = async () => {
    try {
      const response = await getWhatsAppMessage(id);
      if (response.success && response.data?.whatsappUrl) {
        window.open(response.data.whatsappUrl, '_blank');
      }
    } catch (err) {
      alert('Failed to generate WhatsApp message');
    }
  };

  const canCancel = order && ['PENDING', 'CONFIRMED'].includes(order.orderStatus);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return (<><PageHero title="Order Details" subtitle="" /><section className={styles.section}><p className={styles.loadingText}>Loading...</p></section></>);
  if (!order) return (<><PageHero title="Order Details" subtitle="" /><section className={styles.section}><p className={styles.loadingText}>Order not found</p></section></>);

  return (
    <>
      <PageHero title={`Order #${order.id}`} subtitle={`Placed on ${formatDate(order.orderDate)}`} />
      <section className={styles.section}>
        <div className={styles.container}>
          {justPlaced && (
            <motion.div className={styles.successBanner} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              🎉 Order placed successfully! {order.paymentType === 'COD' ? 'Pay on delivery.' : 'Payment confirmed.'}
            </motion.div>
          )}

          <motion.div className={styles.trackerCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <OrderStatusTracker orderStatus={order.orderStatus} deliveryDate={order.deliveryDate} />
          </motion.div>

          <div className={styles.detailGrid}>
            <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h3><Package size={20} /> Items Ordered</h3>
              <table className={styles.itemsTable}>
                <thead>
                  <tr><th>Product</th><th>Weight</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.productWeight}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price?.toFixed(2)}</td>
                      <td className={styles.subtotalCell}>₹{item.subtotal?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr><td colSpan="4" className={styles.totalLabel}>Total Amount</td><td className={styles.totalValue}>₹{order.totalAmount?.toFixed(2)}</td></tr>
                </tfoot>
              </table>
            </motion.div>

            <div className={styles.sideCards}>
              <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h3><MapPin size={20} /> Delivery Address</h3>
                <p className={styles.addressText}>
                  {order.firstName} {order.lastName}<br />
                  {order.streetAddress}<br />
                  {order.city}, {order.district}<br />
                  {order.state} - {order.pincode}<br />
                  📞 {order.phone}
                </p>
              </motion.div>

              <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3><CreditCard size={20} /> Payment Info</h3>
                <div className={styles.paymentDetails}>
                  <div><span>Method:</span><strong>{order.paymentType}</strong></div>
                  <div><span>Status:</span><strong style={{ color: order.paymentStatus === 'PAID' ? '#28a745' : '#f0ad4e' }}>{order.paymentStatus}</strong></div>
                  {order.razorpayPaymentId && <div><span>Transaction:</span><strong>{order.razorpayPaymentId}</strong></div>}
                </div>
              </motion.div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.whatsappBtn} onClick={handleWhatsApp}>
              <MessageCircle size={18} /> Share on WhatsApp
            </button>
            {canCancel && (
              <button className={styles.cancelBtn} onClick={() => setShowCancelModal(true)}>
                <XCircle size={18} /> Cancel Order
              </button>
            )}
          </div>

          {showCancelModal && (
            <CancelOrderModal
              orderId={order.id}
              onClose={() => setShowCancelModal(false)}
              onCancelled={fetchOrder}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default OrderDetail;