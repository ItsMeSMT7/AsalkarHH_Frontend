import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Edit2, Save, X, MapPin, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/authApi';
import { getAllAddresses, deleteAddress, setDefaultAddress } from '../api/addressApi';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';
import styles from './PagesStyle/UserProfile.module.css';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '' });
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName || '', phone: user.phone || '' });
    }
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await getAllAddresses();
      if (response.success) setAddresses(response.data || []);
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { setError('Name is required'); return; }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) { setError('Enter valid 10-digit phone'); return; }
    setLoading(true);
    setError('');
    try {
      const response = await updateProfile(formData);
      if (response.success) {
        updateUser(response.data);
        setEditing(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await deleteAddress(id);
      fetchAddresses();
    } catch (err) {
      alert(err.message || 'Failed to delete address');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      fetchAddresses();
    } catch (err) {
      alert(err.message || 'Failed to set default');
    }
  };

  const handleAddressSaved = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    fetchAddresses();
  };

  return (
    <>
      <PageHero title="My Profile" subtitle="Manage your account and addresses" />
      <section className={styles.profileSection}>
        <div className={styles.container}>
          {success && <div className={styles.successMsg}>{success}</div>}
          {error && <div className={styles.errorMsg}>{error}</div>}

          <motion.div
            className={styles.profileCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.cardHeader}>
              <h2><User size={22} /> Personal Information</h2>
              {!editing && (
                <button className={styles.editBtn} onClick={() => setEditing(true)}>
                  <Edit2 size={16} /> Edit
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleProfileUpdate} className={styles.editForm}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email (cannot be changed)</label>
                  <input type="email" value={user?.email || ''} disabled className={styles.disabledInput} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    maxLength={10}
                  />
                </div>
                <div className={styles.editActions}>
                  <button type="submit" className={styles.saveBtn} disabled={loading}>
                    <Save size={16} /> {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={() => { setEditing(false); setError(''); }}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.profileInfo}>
                <div className={styles.infoRow}>
                  <User size={18} />
                  <div><span>Full Name</span><p>{user?.fullName}</p></div>
                </div>
                <div className={styles.infoRow}>
                  <Mail size={18} />
                  <div><span>Email</span><p>{user?.email}</p></div>
                </div>
                <div className={styles.infoRow}>
                  <Phone size={18} />
                  <div><span>Phone</span><p>{user?.phone}</p></div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className={styles.profileCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.cardHeader}>
              <h2><MapPin size={22} /> Saved Addresses</h2>
              <button className={styles.editBtn} onClick={() => { setShowAddressForm(true); setEditingAddress(null); }}>
                + Add New
              </button>
            </div>

            {showAddressForm && (
              <AddressForm
                address={editingAddress}
                onSave={handleAddressSaved}
                onCancel={() => { setShowAddressForm(false); setEditingAddress(null); }}
              />
            )}

            {addresses.length > 0 ? (
              <div className={styles.addressGrid}>
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={() => { setEditingAddress(addr); setShowAddressForm(true); }}
                    onDelete={() => handleDeleteAddress(addr.id)}
                    onSetDefault={() => handleSetDefault(addr.id)}
                  />
                ))}
              </div>
            ) : (
              !showAddressForm && <p className={styles.emptyText}>No saved addresses yet.</p>
            )}
          </motion.div>

          <motion.div
            className={styles.quickLinks}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/orders" className={styles.quickLink}>
              <Package size={20} />
              <span>View My Orders</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;