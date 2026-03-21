import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, X, ShoppingCart } from 'lucide-react';
import styles from './Style/LoginPromptModal.module.css';

const LoginPromptModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
          <div className={styles.iconWrapper}>
            <ShoppingCart size={40} />
          </div>
          <h3>Login Required</h3>
          <p>Please login to add products to your cart and start shopping!</p>
          <div className={styles.buttons}>
            <button
              className={styles.loginBtn}
              onClick={() => {
                onClose();
                navigate(
                  `/login?returnUrl=${encodeURIComponent(
                    window.location.pathname
                  )}`
                );
              }}
            >
              <LogIn size={18} /> Login
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => {
                onClose();
                navigate(
                  `/signup?returnUrl=${encodeURIComponent(
                    window.location.pathname
                  )}`
                );
              }}
            >
              <UserPlus size={18} /> Sign Up
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPromptModal;