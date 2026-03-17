import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LuShoppingBag, LuMenu, LuX } from 'react-icons/lu'
import { useCart } from '../context/CartContext'
import { navLinks } from '../data/data'
import styles from './Style/Navbar.module.css'
import brandLogo from '../data/Products/logo.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount, openCart, generateWhatsAppMessage } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const showSolid = scrolled || !isHome

  const handleOrderNow = (e) => {
    e.preventDefault()
    if (cartCount === 0) {
      window.open('https://wa.me/918421429515?text=Hello%2C%20I%20am%20interested%20in%20your%20Cold%20pressed%20oils.%20Please%20share%20more%20details.', '_blank')
    } else {
      const message = generateWhatsAppMessage()
      if (message) {
        window.open(`https://wa.me/918421429515?text=${message}`, '_blank')
      }
    }
    setMobileOpen(false)
  }

  return (
    <header className={`${styles.navbar} ${showSolid ? styles.scrolled : ''}`}>
      <div className="container">
        <nav className={styles.navInner}>
          <Link to="/" className={styles.logo} aria-label="Asalkar Healthy Hub Vita Home">
            <img src={brandLogo} alt="Asalkar Healthy Hub Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain', marginRight: '8px' }} />
            <span className={styles.logoTextGreen}>Asalkar</span>
            <span className={styles.logoTextDark}>Healthy Hub</span>
          </Link>

          <ul className={styles.navLinks}>
            {navLinks.map(link => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.navRight}>
            <button
              className={styles.cartBtn}
              onClick={openCart}
              aria-label={`Open cart with ${cartCount} items`}
            >
              <LuShoppingBag size={22} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>
            <button onClick={handleOrderNow} className={styles.orderBtn}>
              Order Now
            </button>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <LuMenu size={26} />
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            to="/"
            className={styles.logo}
            onClick={() => setMobileOpen(false)}
            aria-label="Go to homepage"
          >
            <img src={brandLogo} alt="Asalkar Healthy Hub Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain', marginRight: '8px' }} />
            <span className={styles.logoTextGreen}>Asalkar</span>
            <span className={styles.logoTextDark}>HH</span>
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <LuX size={24} />
          </button>
        </div>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map(link => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          <button
            className={styles.mobileOrderBtn}
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar