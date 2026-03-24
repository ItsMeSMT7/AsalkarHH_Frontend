import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../api/apiClient';
import styles from './Style/AdminProductModal.module.css';

const CATEGORIES = [
  'Cold Pressed Coconut Oil',
  'Cold Pressed Groundnut Oil',
  'Cold Pressed Safflower Oil',
  'Cold Pressed Sunflower Oil',
  'Safflower Oil Cake (Pend)',
  'Sunflower Oil Cake (Pend)',
  'Groundnut Oil Cake (Pend)',
  'Coconut Oil Cake (Pend)',
  
];

const BADGES = ['', 'Bestseller', 'Popular', 'New'];

const AdminProductModal = ({ isOpen, onClose, onSave, product, loading }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Coconut Oil',
    price: '',
    weight: '',
    stock: '',
    badge: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const isEditMode = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || 'Coconut Oil',
        price: product.price?.toString() || '',
        weight: product.weight || '',
        stock: product.stock?.toString() || '',
        badge: product.badge || '',
      });
      if (product.imageUrl) {
        setImagePreview(getImageUrl(product.imageUrl));
      }
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Coconut Oil',
        price: '',
        weight: '',
        stock: '',
        badge: '',
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: 'Only JPG, PNG, WEBP images allowed',
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: 'Image must be less than 5MB',
      }));
      return;
    }

    setImageFile(file);
    setErrors((prev) => ({ ...prev, image: '' }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(isEditMode && product?.imageUrl ? getImageUrl(product.imageUrl) : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Enter a valid price';
    }
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required (e.g. 1 Litre, 500 ml)';
    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Enter a valid stock quantity';
    }
    if (!isEditMode && !imageFile) {
      newErrors.image = 'Product image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = new FormData();
    submitData.append('name', formData.name.trim());
    submitData.append('description', formData.description.trim());
    submitData.append('category', formData.category);
    submitData.append('price', formData.price);
    submitData.append('weight', formData.weight.trim());
    submitData.append('stock', formData.stock);
    if (formData.badge) {
      submitData.append('badge', formData.badge);
    }
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2>{isEditMode ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formBody}>
              {/* Left: Image Upload */}
              <div className={styles.imageSection}>
                <label className={styles.imageLabel}>Product Image *</label>
                <div
                  className={styles.imageUploadArea}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <Upload size={32} />
                      <p>Click to upload image</p>
                      <span>JPG, PNG, WEBP (max 5MB)</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className={styles.hiddenInput}
                />
                {imagePreview && (
                  <div className={styles.imageActions}>
                    <button
                      type="button"
                      className={styles.changeImgBtn}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon size={14} /> Change Image
                    </button>
                    {imageFile && (
                      <button
                        type="button"
                        className={styles.removeImgBtn}
                        onClick={handleRemoveImage}
                      >
                        <X size={14} /> Remove
                      </button>
                    )}
                  </div>
                )}
                {errors.image && (
                  <span className={styles.fieldError}>{errors.image}</span>
                )}
              </div>

              {/* Right: Form Fields */}
              <div className={styles.fieldsSection}>
                <div className={styles.formGroup}>
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Cold Pressed Coconut Oil"
                  />
                  {errors.name && (
                    <span className={styles.fieldError}>{errors.name}</span>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className={styles.fieldError}>
                        {errors.category}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Badge</label>
                    <select
                      name="badge"
                      value={formData.badge}
                      onChange={handleChange}
                    >
                      {BADGES.map((b) => (
                        <option key={b} value={b}>
                          {b || 'None'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 450"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <span className={styles.fieldError}>{errors.price}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Weight *</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 1 Litre, 500 ml"
                    />
                    {errors.weight && (
                      <span className={styles.fieldError}>{errors.weight}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      min="0"
                    />
                    {errors.stock && (
                      <span className={styles.fieldError}>{errors.stock}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product — ingredients, benefits, usage..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  <>
                    <Save size={16} />
                    {isEditMode ? 'Update Product' : 'Add Product'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminProductModal;