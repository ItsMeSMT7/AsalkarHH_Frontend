import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { cancelOrder } from '../api/userOrderApi';
import styles from './Style/CancelOrderModal.module.css';

const REASONS = [
  'Changed my mind', 'Found better price elsewhere', 'Ordered by mistake',
  'Delivery taking too long', 'Want to change address or items', 'Other',
];

const CancelOrderModal = ({ orderId, onClose, onCancelled }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFinalReason = () => selectedReason === 'Other' ? customReason : selectedReason;

  const handleSubmit = async () => {
    const reason = getFinalReason();
    if (!reason || reason.length < 10) { setError('Please provide a reason (at least 10 characters)'); return; }
    setLoading(true); setError('');
    try {
      await cancelOrder(orderId, { reason });
      onCancelled(); onClose();
    } catch (err) { setError(err.message || 'Failed to submit cancellation request'); }
    finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className={styles.modal} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
          <div className={styles.header}>
            <AlertTriangle size={32} className={styles.warnIcon} />
            <h3>Cancel Order #{orderId}</h3>
            <p>Please tell us why you want to cancel</p>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.reasons}>
            {REASONS.map((reason) => (
              <label key={reason} className={`${styles.reasonOption} ${selectedReason === reason ? styles.selected : ''}`}>
                <input type="radio" name="reason" value={reason} checked={selectedReason === reason} onChange={(e) => setSelectedReason(e.target.value)} />
                {reason}
              </label>
            ))}
          </div>
          {selectedReason === 'Other' && (
            <textarea className={styles.customInput} value={customReason} onChange={(e) => setCustomReason(e.target.value)} placeholder="Please describe your reason (min 10 characters)..." rows={3} />
          )}
          <div className={styles.actions}>
            <button className={styles.confirmBtn} onClick={handleSubmit} disabled={loading || !selectedReason}>
              {loading ? 'Submitting...' : 'Submit Cancellation Request'}
            </button>
            <button className={styles.keepBtn} onClick={onClose}>Keep My Order</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CancelOrderModal;