import { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import styles from './Style/WhatsAppButton.module.css'

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false)
  const { isCartOpen } = useCart()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 3000)

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!visible || isCartOpen) return null

  return (
    <a
      href="https://wa.me/918421429515?text=Hello%2C%20I%20am%20interested%20in%20your%20Cold%20pressed%20oils.%20Please%20share%20more%20details."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className={styles.pulse} />
      <FaWhatsapp size={28} />
    </a>
  )
}

export default WhatsAppButton