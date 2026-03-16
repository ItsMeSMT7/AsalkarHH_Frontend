import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const CartContext = createContext(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId))
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const generateWhatsAppMessage = useCallback(() => {
    if (cartItems.length === 0) return ''
    let message = 'Hello, I would like to order the following products from Asalkar Healthy Hub Vita:\n\n'
    cartItems.forEach(item => {
      message += `${item.name} - ${item.size} - ₹${item.price} (x${item.quantity})\n`
    })
    message += `\nTotal: ₹${cartTotal}\n\n`
    message += 'Please confirm availability and delivery details.\n\nThank you!'
    return encodeURIComponent(message)
  }, [cartItems, cartTotal])

  const value = useMemo(() => ({
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    cartTotal,
    cartCount,
    generateWhatsAppMessage
  }), [cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, cartTotal, cartCount, generateWhatsAppMessage])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}