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
              <span>+91 98765 43210</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} />
              <span>asalkarhealthyhub@gmail.com</span>
            </div>
            <a
              href="https://wa.me/919876543210"
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







// import { Link } from 'react-router-dom'
// import { LuLeaf, LuPhone, LuMail, LuMapPin, LuClock } from 'react-icons/lu'
// import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
// import styles from './Style/Footer.module.css'

// const Footer = () => {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className={styles.footer}>
//       <div className="container">
//         <div className="row g-4">
//           <div className="col-lg-3 col-md-6">
//             <div className={styles.brand}>
//               <Link to="/" className={styles.logo}>
//                 <LuLeaf className={styles.logoIcon} />
//                 Asalkar Healthy Hub Vita
//               </Link>
//               <p className={styles.brandDesc}>
//                 Pure Cold pressed oils extracted using traditional Colden press machines.
//                 Bringing health and authenticity to every Indian kitchen.
//               </p>
//               <div className={styles.socials}>
//                 <a href="#" className={styles.socialLink} aria-label="Facebook">
//                   <FaFacebookF size={14} />
//                 </a>
//                 <a href="#" className={styles.socialLink} aria-label="Instagram">
//                   <FaInstagram size={14} />
//                 </a>
//                 <a
//                   href="https://wa.me/918421429515"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={styles.socialLink}
//                   aria-label="WhatsApp"
//                 >
//                   <FaWhatsapp size={14} />
//                 </a>
//                 <a href="#" className={styles.socialLink} aria-label="YouTube">
//                   <FaYoutube size={14} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-3 col-md-6">
//             <h4 className={styles.colTitle}>Quick Links</h4>
//             <ul className={styles.linkList}>
//               <li><Link to="/" className={styles.link}>Home</Link></li>
//               <li><Link to="/products" className={styles.link}>Products</Link></li>
//               <li><Link to="/about" className={styles.link}>About Us</Link></li>
//               <li><Link to="/contact" className={styles.link}>Contact</Link></li>
//               <li>
//                 <a
//                   href="https://wa.me/918421429515?text=Hello%2C%20I%20want%20to%20place%20an%20order."
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={styles.link}
//                 >
//                   Order on WhatsApp
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className="col-lg-3 col-md-6">
//             <h4 className={styles.colTitle}>Our Products</h4>
//             <ul className={styles.linkList}>
//               <li><Link to="/products" className={styles.link}>Coconut Oil</Link></li>
//               <li><Link to="/products" className={styles.link}>Groundnut Oil</Link></li>
//               <li><Link to="/products" className={styles.link}>Sunflower Oil</Link></li>
//               <li><Link to="/products" className={styles.link}>Safflower Oil</Link></li>
//               <li><Link to="/products" className={styles.link}>Oil Cake (Pend)</Link></li>
//             </ul>
//           </div>

//           <div className="col-lg-3 col-md-6">
//             <h4 className={styles.colTitle}>Contact Us</h4>
//             <ul className={styles.contactList}>
//               <li className={styles.contactItem}>
//                 <LuPhone size={15} className={styles.contactIcon} />
//                 <a href="tel:+918421429515" className={styles.contactLink}>+91 8421429515</a>
//               </li>
//               <li className={styles.contactItem}>
//                 <LuMail size={15} className={styles.contactIcon} />
//                 <a href="mailto:asalkarhh@gmail.com" className={styles.contactLink}>asalkarhh@gmail.com</a>
//               </li>
//               <li className={styles.contactItem}>
//                 <LuMapPin size={15} className={styles.contactIcon} />
//                 <span>Vita, Maharashtra </span>
//               </li>
//               <li className={styles.contactItem}>
//                 <LuClock size={15} className={styles.contactIcon} />
//                 <span>Mon-Sat: 9AM - 7PM</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className={styles.bottom}>
//           <span className={styles.copy}>
//             &copy; {currentYear} Asalkar Healthy Hub Vita. All Rights Reserved.
//           </span>
//           <span className={styles.madeWith}>
//             Made with 🌿 for a healthier India
//           </span>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer