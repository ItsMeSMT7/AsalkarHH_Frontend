import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { createAddress, updateAddress } from '../api/addressApi';
import styles from './Style/AddressForm.module.css';

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    label: 'Home', fullName: '', phone: '', streetAddress: '',
    city: '', subDistrict: '', district: '', state: '', pincode: '', isDefault: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (address) {
      setFormData({
        label: address.label || 'Home', fullName: address.fullName || '',
        phone: address.phone || '', streetAddress: address.streetAddress || '',
        city: address.city || '', subDistrict: address.subDistrict || '',
        district: address.district || '', state: address.state || '',
        pincode: address.pincode || '', isDefault: address.isDefault || false,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.streetAddress || !formData.city || !formData.district || !formData.state || !formData.pincode) {
      setError('Please fill all required fields'); return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) { setError('Enter valid phone number'); return; }
    if (!/^\d{6}$/.test(formData.pincode)) { setError('Enter valid 6-digit pincode'); return; }
    setLoading(true);
    try {
      if (address?.id) { await updateAddress(address.id, formData); }
      else { await createAddress(formData); }
      onSave();
    } catch (err) {
      setError(err.message || 'Failed to save address');
    } finally { setLoading(false); }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.row}>
        <div className={styles.group}>
          <label>Label</label>
          <select name="label" value={formData.label} onChange={handleChange}>
            <option value="Home">Home</option><option value="Work">Work</option><option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.group}><label>Full Name *</label><input name="fullName" value={formData.fullName} onChange={handleChange} /></div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}><label>Phone *</label><input name="phone" value={formData.phone} onChange={handleChange} maxLength={10} /></div>
        <div className={styles.group}><label>Pincode *</label><input name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} /></div>
      </div>
      <div className={styles.group}><label>Street Address *</label><input name="streetAddress" value={formData.streetAddress} onChange={handleChange} /></div>
      <div className={styles.row}>
        <div className={styles.group}><label>City *</label><input name="city" value={formData.city} onChange={handleChange} /></div>
        <div className={styles.group}><label>Sub-District</label><input name="subDistrict" value={formData.subDistrict} onChange={handleChange} /></div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}><label>District *</label><input name="district" value={formData.district} onChange={handleChange} /></div>
        <div className={styles.group}><label>State *</label><input name="state" value={formData.state} onChange={handleChange} /></div>
      </div>
      <label className={styles.checkbox}><input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} /> Set as default address</label>
      <div className={styles.actions}>
        <button type="submit" className={styles.saveBtn} disabled={loading}><Save size={16} /> {loading ? 'Saving...' : 'Save Address'}</button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}><X size={16} /> Cancel</button>
      </div>
    </form>
  );
};

export default AddressForm;