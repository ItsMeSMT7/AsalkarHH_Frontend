import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Cart from './components/Cart';

import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          background: '#f5f0e8',
        }}
      >
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent(
          location.pathname
        )}&message=Please login to continue`}
        replace
      />
    );
  }

  return children;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 140px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;








// import { useEffect } from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import { AnimatePresence, motion } from 'framer-motion'
// import AOS from 'aos'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Cart from './components/Cart'
// import WhatsAppButton from './components/WhatsAppButton'
// import ScrollToTop from './components/ScrollToTop'
// import Home from './pages/Home'
// import Products from './pages/Products'
// import About from './pages/About'
// import Contact from './pages/Contact'

// function App() {
//   const location = useLocation()

//   useEffect(() => {
//     AOS.init({
//       duration: 600,
//       easing: 'ease-out',
//       once: true,
//       offset: 60,
//       disable: window.innerWidth < 768 ? 'phone' : false
//     })
//   }, [])

//   useEffect(() => {
//     AOS.refresh()
//   }, [location.pathname])

//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       <Cart />
//       <main>
//         <AnimatePresence mode="wait">
//           <Routes location={location} key={location.pathname}>
//             <Route
//               path="/"
//               element={
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Home />
//                 </motion.div>
//               }
//             />
//             <Route
//               path="/products"
//               element={
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Products />
//                 </motion.div>
//               }
//             />
//             <Route
//               path="/about"
//               element={
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <About />
//                 </motion.div>
//               }
//             />
//             <Route
//               path="/contact"
//               element={
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Contact />
//                 </motion.div>
//               }
//             />
//           </Routes>
//         </AnimatePresence>
//       </main>
//       <Footer />
//       <WhatsAppButton />
//     </>
//   )
// }

// export default App