import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Style/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3>🌿 Asalkar Healthy Hub Vita</h3>
            <p>
              Pure, natural cold-pressed oils made with traditional wooden
              press methods. No chemicals, no heat, no preservatives.
            </p>
            <p className={styles.owner}>Owner: Rajkumar Asalkar</p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className={styles.links}>
            <h4>My Account</h4>
            <Link to="/profile">My Profile</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>

          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <div className={styles.contactItem}>
              <MapPin size={16} />
              <span>Vita, Sangli, Maharashtra</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={16} />
              <span>+91 84214 29515</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>asalkarhh@gmail.com</span>
            </div>
            <a
              href="https://wa.me/918421429515"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Asalkar Healthy Hub Vita. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
