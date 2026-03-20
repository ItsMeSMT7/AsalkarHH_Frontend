import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getCartKey = useCallback(() => {
    return user ? `vitahub_cart_${user.userId || user.id}` : null;
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const cartKey = getCartKey();
      if (cartKey) {
        const savedCart = localStorage.getItem(cartKey);
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart));
          } catch (e) {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      }
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user, getCartKey]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
      }
    }
  }, [cartItems, isAuthenticated, user, getCartKey]);

  const addToCart = (product, quantity = 1) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return false;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          alert(
            `Only ${product.stock} units of ${product.name} available in our warehouse`
          );
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
        }
        return updated;
      }
      let finalQty = quantity;
      if (finalQty > product.stock) {
        alert(
          `Only ${product.stock} units of ${product.name} available in our warehouse`
        );
        finalQty = product.stock;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          weight: product.weight,
          imageUrl: product.imageUrl,
          stock: product.stock,
          quantity: finalQty,
        },
      ];
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          if (newQuantity > item.stock) {
            alert(
              `Only ${item.stock} units of ${item.name} available in our warehouse`
            );
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const updateCartStock = (productId, newStock) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const adjustedQty =
              item.quantity > newStock ? newStock : item.quantity;
            return { ...item, stock: newStock, quantity: adjustedQty };
          }
          return item;
        })
        .filter((item) => item.stock > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (isAuthenticated && user) {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.removeItem(cartKey);
      }
    }
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartStock,
    clearCart,
    cartCount,
    cartTotal,
    showLoginModal,
    setShowLoginModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;








// import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// const CartContext = createContext(null)

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   return context
// }

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([])
//   const [isCartOpen, setIsCartOpen] = useState(false)

//   const addToCart = useCallback((product) => {
//     setCartItems(prev => {
//       const existing = prev.find(item => item.id === product.id)
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       }
//       return [...prev, { ...product, quantity: 1 }]
//     })
//   }, [])

//   const removeFromCart = useCallback((productId) => {
//     setCartItems(prev => prev.filter(item => item.id !== productId))
//   }, [])

//   const updateQuantity = useCallback((productId, quantity) => {
//     if (quantity <= 0) {
//       setCartItems(prev => prev.filter(item => item.id !== productId))
//       return
//     }
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     )
//   }, [])

//   const clearCart = useCallback(() => {
//     setCartItems([])
//   }, [])

//   const openCart = useCallback(() => setIsCartOpen(true), [])
//   const closeCart = useCallback(() => setIsCartOpen(false), [])

//   const cartTotal = useMemo(() => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   }, [cartItems])

//   const cartCount = useMemo(() => {
//     return cartItems.reduce((count, item) => count + item.quantity, 0)
//   }, [cartItems])

//   const generateWhatsAppMessage = useCallback(() => {
//     if (cartItems.length === 0) return ''
//     let message = 'Hello, I would like to order the following products from Asalkar Healthy Hub Vita:\n\n'
//     cartItems.forEach(item => {
//       message += `${item.name} - ${item.size} - ₹${item.price} (x${item.quantity})\n`
//     })
//     message += `\nTotal: ₹${cartTotal}\n\n`
//     message += 'Please confirm availability and delivery details.\n\nThank you!'
//     return encodeURIComponent(message)
//   }, [cartItems, cartTotal])

//   const value = useMemo(() => ({
//     cartItems,
//     isCartOpen,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     openCart,
//     closeCart,
//     cartTotal,
//     cartCount,
//     generateWhatsAppMessage
//   }), [cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, cartTotal, cartCount, generateWhatsAppMessage])

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   )
// }