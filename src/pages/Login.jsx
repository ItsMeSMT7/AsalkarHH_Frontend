import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHero from '../components/PageHero';
import styles from './PagesStyle/Login.module.css';

const Login = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, returnUrl]);

  if (isAuthenticated) return null;

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier.trim()) { setError('Please enter your email or phone number'); return; }
    if (!formData.password) { setError('Please enter your password'); return; }
    setLoading(true); setError('');
    try { await login(formData.identifier, formData.password); navigate(returnUrl, { replace: true }); }
    catch (err) { setError(err.message || 'Login failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <PageHero title="Login" subtitle="Welcome back to Asalkar Healthy Hub" />
      <section className={styles.loginSection}>
        <div className={styles.container}>
          <motion.div className={styles.formCard} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.formHeader}>
              <LogIn size={32} className={styles.headerIcon} />
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>
            {searchParams.get('message') && <div className={styles.infoMessage}>{searchParams.get('message')}</div>}
            {error && <div className={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="identifier">Email or Phone Number</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input type="text" id="identifier" name="identifier" value={formData.identifier} onChange={handleChange} placeholder="Enter email or phone number" autoComplete="username" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" />
                  <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <span className={styles.spinner}></span> : <><LogIn size={18} /> Sign In</>}
              </button>
            </form>
            <div className={styles.formFooter}>
              <p>Don&apos;t have an account? <Link to={`/signup${returnUrl !== '/' ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}>Create Account</Link></p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Login;