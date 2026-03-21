import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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

  const navLinkClass = ({ isActive }) =>
    isActive ? styles.active : undefined;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobile}>
          🌿 <span>Asalkar Healthy Hub</span>
        </Link>

        <ul className={`${styles.navLinks} ${mobileOpen ? styles.open : ''}`}>
          <li>
            <NavLink to="/" end className={navLinkClass} onClick={closeMobile}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass} onClick={closeMobile}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClass} onClick={closeMobile}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass} onClick={closeMobile}>
              Contact
            </NavLink>
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
