import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getAllAddresses } from '../api/addressApi';
import { placeOrder } from '../api/orderApi';
import { createPaymentOrder, verifyPayment } from '../api/paymentApi';
import { getImageUrl } from '../api/apiClient';
import AddressForm from '../components/AddressForm';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/Checkout.module.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentType, setPaymentType] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shippingData, setShippingData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    streetAddress: '', city: '', subDistrict: '', district: '', state: '', pincode: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/checkout&message=Please login to continue shopping');
      return;
    }
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    fetchAddresses();
    if (user) {
      const nameParts = (user.fullName || '').split(' ');
      setShippingData((prev) => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        phone: user.phone || '',
        email: user.email || '',
      }));
    }
  }, [isAuthenticated, user]);

  const fetchAddresses = async () => {
    try {
      const response = await getAllAddresses();
      if (response.success && response.data) {
        setAddresses(response.data);
        const defaultAddr = response.data.find((a) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          fillFromAddress(defaultAddr);
        }
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const fillFromAddress = (addr) => {
    setShippingData((prev) => ({
      ...prev,
      firstName: addr.fullName?.split(' ')[0] || prev.firstName,
      lastName: addr.fullName?.split(' ').slice(1).join(' ') || prev.lastName,
      phone: addr.phone || prev.phone,
      streetAddress: addr.streetAddress || '',
      city: addr.city || '',
      subDistrict: addr.subDistrict || '',
      district: addr.district || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
    }));
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr.id);
    fillFromAddress(addr);
    setShowNewAddress(false);
  };

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    const { firstName, lastName, phone, streetAddress, city, district, state, pincode } = shippingData;
    if (!firstName || !lastName || !phone || !streetAddress || !city || !district || !state || !pincode) {
      setError('Please fill all required shipping fields');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter valid 10-digit phone number');
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setError('Enter valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);
    setError('');

    const orderData = {
      ...shippingData,
      paymentType,
      items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
      addressId: selectedAddressId,
    };

    try {
      const response = await placeOrder(orderData);
      if (!response.success) {
        setError(response.message);
        setLoading(false);
        return;
      }

      const order = response.data;

      if (paymentType === 'COD') {
        clearCart();
        navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          setError('Failed to load payment gateway. Please try again.');
          setLoading(false);
          return;
        }

        const paymentResponse = await createPaymentOrder(order.id);
        if (!paymentResponse.success) {
          setError(paymentResponse.message);
          setLoading(false);
          return;
        }

        const paymentData = paymentResponse.data;

        const options = {
          key: paymentData.keyId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          name: 'Asalkar Healthy Hub Vita',
          description: `Order #${order.id}`,
          order_id: paymentData.razorpayOrderId,
          handler: async function (razorpayResponse) {
            try {
              const verifyData = {
                orderId: order.id,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpaySignature: razorpayResponse.razorpay_signature,
              };
              await verifyPayment(verifyData);
              clearCart();
              navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
            } catch (err) {
              setError('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: `${shippingData.firstName} ${shippingData.lastName}`,
            email: shippingData.email,
            contact: shippingData.phone,
          },
          theme: { color: '#4a7c59' },
          modal: {
            ondismiss: function () {
              setError('Payment was cancelled. Your order is saved. You can retry payment.');
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      if (paymentType === 'COD') setLoading(false);
    }
  };

  return (
    <>
      <PageHero title="Checkout" subtitle="Complete your order" />
      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          {error && <div className={styles.errorMsg}>{error}</div>}

          <div className={styles.checkoutLayout}>
            <div className={styles.leftCol}>
              <motion.div className={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h3><MapPin size={20} /> Shipping Address</h3>

                {addresses.length > 0 && (
                  <div className={styles.savedAddresses}>
                    <p className={styles.sectionLabel}>Saved Addresses:</p>
                    <div className={styles.addressCards}>
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`${styles.addressOption} ${selectedAddressId === addr.id ? styles.selected : ''}`}
                          onClick={() => handleAddressSelect(addr)}
                        >
                          {selectedAddressId === addr.id && <Check size={18} className={styles.checkIcon} />}
                          <strong>{addr.label}</strong>
                          <p>{addr.fullName}</p>
                          <p>{addr.streetAddress}, {addr.city}</p>
                          <p>{addr.district}, {addr.state} - {addr.pincode}</p>
                        </div>
                      ))}
                    </div>
                    <button className={styles.newAddrBtn} onClick={() => setShowNewAddress(!showNewAddress)}>
                      {showNewAddress ? 'Use Saved Address' : '+ Add New Address'}
                    </button>
                  </div>
                )}

                {(addresses.length === 0 || showNewAddress) && (
                  <div className={styles.shippingForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>First Name *</label>
                        <input name="firstName" value={shippingData.firstName} onChange={handleChange} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Last Name *</label>
                        <input name="lastName" value={shippingData.lastName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Phone *</label>
                        <input name="phone" value={shippingData.phone} onChange={handleChange} maxLength={10} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email</label>
                        <input name="email" type="email" value={shippingData.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Street Address *</label>
                      <input name="streetAddress" value={shippingData.streetAddress} onChange={handleChange} />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>City *</label>
                        <input name="city" value={shippingData.city} onChange={handleChange} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Sub-District</label>
                        <input name="subDistrict" value={shippingData.subDistrict} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>District *</label>
                        <input name="district" value={shippingData.district} onChange={handleChange} />
                      </div>
                      <div className={styles.formGroup}>
                        <label>State *</label>
                        <input name="state" value={shippingData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className={styles.formGroup} style={{ maxWidth: '200px' }}>
                      <label>Pincode *</label>
                      <input name="pincode" value={shippingData.pincode} onChange={handleChange} maxLength={6} />
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div className={styles.section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3><CreditCard size={20} /> Payment Method</h3>
                <div className={styles.paymentOptions}>
                  <label className={`${styles.paymentOption} ${paymentType === 'COD' ? styles.selected : ''}`}>
                    <input type="radio" name="paymentType" value="COD" checked={paymentType === 'COD'} onChange={(e) => setPaymentType(e.target.value)} />
                    <Truck size={20} />
                    <div>
                      <strong>Cash on Delivery</strong>
                      <span>Pay when you receive</span>
                    </div>
                  </label>
                  <label className={`${styles.paymentOption} ${paymentType === 'ONLINE' ? styles.selected : ''}`}>
                    <input type="radio" name="paymentType" value="ONLINE" checked={paymentType === 'ONLINE'} onChange={(e) => setPaymentType(e.target.value)} />
                    <CreditCard size={20} />
                    <div>
                      <strong>Pay Online</strong>
                      <span>UPI, Cards, Net Banking</span>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            <motion.div className={styles.rightCol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                <div className={styles.summaryItems}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <img src={getImageUrl(item.imageUrl)} alt={item.name} />
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemMeta}>{item.weight} × {item.quantity}</p>
                      </div>
                      <p className={styles.itemTotal}>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryBreakdown}>
                  <div className={styles.breakdownRow}>
                    <span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Delivery</span><span className={styles.free}>FREE</span>
                  </div>
                  <div className={styles.breakdownTotal}>
                    <span>Total</span><span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className={styles.placeOrderBtn} onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? 'Processing...' : paymentType === 'COD' ? '🛒 Place Order (COD)' : '💳 Pay & Place Order'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;