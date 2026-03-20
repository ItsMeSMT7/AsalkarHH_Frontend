import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, Mail, Lock, Phone, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/Signup.module.css';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) { navigate(returnUrl, { replace: true }); return null; }

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: '' }); setApiError(''); };

  const validate = () => {
    const n = {};
    if (!formData.fullName.trim()) n.fullName = 'Full name is required';
    if (!formData.email.trim()) n.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) n.email = 'Enter a valid email address';
    if (!formData.phone.trim()) n.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) n.phone = 'Enter a valid 10-digit Indian phone number';
    if (!formData.password) n.password = 'Password is required';
    else if (formData.password.length < 6) n.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) n.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) n.confirmPassword = 'Passwords do not match';
    setErrors(n); return Object.keys(n).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!validate()) return;
    setLoading(true); setApiError('');
    try { await signup(formData); navigate(returnUrl, { replace: true }); }
    catch (err) { setApiError(err.message || 'Signup failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <PageHero title="Create Account" subtitle="Join Asalkar Healthy Hub Vita family" />
      <section className={styles.signupSection}>
        <div className={styles.container}>
          <motion.div className={styles.formCard} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.formHeader}><UserPlus size={32} className={styles.headerIcon} /><h2>Sign Up</h2><p>Create your free account to start shopping</p></div>
            {apiError && <div className={styles.errorMessage}>{apiError}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}><label>Full Name *</label><div className={styles.inputWrapper}><User size={18} className={styles.inputIcon} /><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" /></div>{errors.fullName && <span className={styles.fieldError}>{errors.fullName}</span>}</div>
              <div className={styles.inputGroup}><label>Email Address *</label><div className={styles.inputWrapper}><Mail size={18} className={styles.inputIcon} /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" /></div>{errors.email && <span className={styles.fieldError}>{errors.email}</span>}</div>
              <div className={styles.inputGroup}><label>Phone Number *</label><div className={styles.inputWrapper}><Phone size={18} className={styles.inputIcon} /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit phone number" maxLength={10} /></div>{errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}</div>
              <div className={styles.inputGroup}><label>Password *</label><div className={styles.inputWrapper}><Lock size={18} className={styles.inputIcon} /><input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 characters" /><button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.password && <span className={styles.fieldError}>{errors.password}</span>}</div>
              <div className={styles.inputGroup}><label>Confirm Password *</label><div className={styles.inputWrapper}><Lock size={18} className={styles.inputIcon} /><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" /><button type="button" className={styles.eyeButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}</div>
              <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? <span className={styles.spinner}></span> : <><UserPlus size={18} /> Create Account</>}</button>
            </form>
            <div className={styles.formFooter}><p>Already have an account? <Link to={`/login${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}>Sign In</Link></p></div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signup;