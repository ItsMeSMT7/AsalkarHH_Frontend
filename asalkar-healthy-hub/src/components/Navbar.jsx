import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Style/Navbar.module.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);
  const firstName = user?.fullName?.split(' ')[0] || 'User';

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobile}>
          🌿 <span>Asalkar Healthy Hub</span>
        </Link>

        <ul className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
          <li>
            <Link to="/" onClick={closeMobile}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobile}>
              About
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMobile}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobile}>
              Contact
            </Link>
          </li>

          <div className={styles.mobileAuth}>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" onClick={closeMobile}>
                    <User size={16} /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={closeMobile}>
                    <Package size={16} /> My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/cart" onClick={closeMobile}>
                    <ShoppingCart size={16} /> Cart{' '}
                    {cartCount > 0 && `(${cartCount})`}
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin" onClick={closeMobile}>
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    className={styles.mobileLogout}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={styles.mobileLoginBtn}
                    onClick={closeMobile}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={styles.mobileSignupBtn}
                    onClick={closeMobile}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>

        <div className={styles.rightSection}>
          {isAuthenticated ? (
            <>
              <Link to="/cart" className={styles.cartLink}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
              </Link>

              <div className={styles.userDropdown}>
                <button
                  className={styles.userBtn}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User size={18} />
                  <span className={styles.userName}>Hi, {firstName}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      dropdownOpen ? styles.rotated : ''
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div
                    className={styles.dropdown}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} /> My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className={styles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button
                      className={styles.logoutItem}
                      onClick={handleLogout}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link to="/signup" className={styles.signupBtn}>
                Sign Up
              </Link>
            </div>
          )}

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







// import { useState, useEffect } from 'react'
// import { Link, NavLink, useLocation } from 'react-router-dom'
// import { LuShoppingBag, LuMenu, LuX } from 'react-icons/lu'
// import { useCart } from '../context/CartContext'
// import { navLinks } from '../data/data'
// import styles from './Style/Navbar.module.css'
// import brandLogo from '../data/Products/logo.png'

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const { cartCount, openCart, generateWhatsAppMessage } = useCart()
//   const location = useLocation()
//   const isHome = location.pathname === '/'

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     handleScroll()
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   useEffect(() => {
//     setMobileOpen(false)
//   }, [location.pathname])

//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = ''
//     }
//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [mobileOpen])

//   const showSolid = scrolled || !isHome

//   const handleOrderNow = (e) => {
//     e.preventDefault()
//     if (cartCount === 0) {
//       window.open('https://wa.me/918421429515?text=Hello%2C%20I%20am%20interested%20in%20your%20Cold%20pressed%20oils.%20Please%20share%20more%20details.', '_blank')
//     } else {
//       const message = generateWhatsAppMessage()
//       if (message) {
//         window.open(`https://wa.me/918421429515?text=${message}`, '_blank')
//       }
//     }
//     setMobileOpen(false)
//   }

//   return (
//     <header className={`${styles.navbar} ${showSolid ? styles.scrolled : ''}`}>
//       <div className="container">
//         <nav className={styles.navInner}>
//           <Link to="/" className={styles.logo} aria-label="Asalkar Healthy Hub Vita Home">
//             <img src={brandLogo} alt="Asalkar Healthy Hub Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginRight: '8px' }} />
//             <span className={styles.logoTextGreen}>Asalkar</span>
//             <span className={styles.logoTextDark}>Healthy Hub</span>
//           </Link>

//           <ul className={styles.navLinks}>
//             {navLinks.map(link => (
//               <li key={link.id}>
//                 <NavLink
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           <div className={styles.navRight}>
//             <button
//               className={styles.cartBtn}
//               onClick={openCart}
//               aria-label={`Open cart with ${cartCount} items`}
//             >
//               <LuShoppingBag size={22} />
//               {cartCount > 0 && (
//                 <span className={styles.cartBadge}>{cartCount}</span>
//               )}
//             </button>
//             <button onClick={handleOrderNow} className={styles.orderBtn}>
//               Order Now
//             </button>
//             <button
//               className={styles.hamburger}
//               onClick={() => setMobileOpen(true)}
//               aria-label="Open navigation menu"
//             >
//               <LuMenu size={26} />
//             </button>
//           </div>
//         </nav>
//       </div>

//       {mobileOpen && (
//         <div
//           className={styles.mobileOverlay}
//           onClick={() => setMobileOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       <div
//         className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
//         role="dialog"
//         aria-modal="true"
//         aria-label="Navigation menu"
//       >
//         <div className={styles.mobileMenuHeader}>
//           <Link
//             to="/"
//             className={styles.logo}
//             onClick={() => setMobileOpen(false)}
//             aria-label="Go to homepage"
//           >
//             <img src={brandLogo} alt="Asalkar Healthy Hub Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain', marginRight: '8px' }} />
//             <span className={styles.logoTextGreen}>Asalkar</span>
//             <span className={styles.logoTextDark}>HH</span>
//           </Link>
//           <button
//             className={styles.closeBtn}
//             onClick={() => setMobileOpen(false)}
//             aria-label="Close navigation menu"
//           >
//             <LuX size={24} />
//           </button>
//         </div>
//         <ul className={styles.mobileNavLinks}>
//           {navLinks.map(link => (
//             <li key={link.id}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
//                 }
//                 onClick={() => setMobileOpen(false)}
//               >
//                 {link.label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         <div className={styles.mobileMenuFooter}>
//           <button
//             className={styles.mobileOrderBtn}
//             onClick={handleOrderNow}
//           >
//             Order Now
//           </button>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar