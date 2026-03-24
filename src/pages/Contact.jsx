import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend, LuCheckCircle } from 'react-icons/lu'
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations'
import { contactInfo } from '../data/data'
import PageHero from '../components/PageHero'
import styles from './PagesStyle/Contact.module.css'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.title = 'Contact Us — Asalkar Healthy Hub Vita'
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // 1. Save to backend database for Admin Dashboard -> Customer Enquiries
    try {
      const dbRes = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          subject: `Website Enquiry from ${form.name}`,
        }),
      })
      if (!dbRes.ok) {
        const errTxt = await dbRes.text()
        console.error('Database returned status:', dbRes.status, 'Response:', errTxt)
      }
    } catch (dbError) {
      console.error('Failed to save enquiry to database:', dbError)
    }

    // 2. Send email via EmailJS
    try {
      await emailjs.send(
        'service_zwmisx7', // Paste your real Service ID here (e.g., 'service_xyz123')
        'template_zp2alr8',
        {
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        },
        'amoYDw_1-KhXAgCYu'
      )
    } catch (error) {
      console.error('Failed to send email:', error)
      // We continue without throwing an alert so the customer still gets the "Thank You" message
    }

    setSubmitted(true)
    setForm({ name: '', phone: '', email: '', message: '' })
    setErrors({})
    setTimeout(() => setSubmitted(false), 5000)
  }

  const infoItems = [
    { icon: <LuMapPin size={20} />, title: 'Our Location', detail: contactInfo.address },
    { icon: <LuPhone size={20} />, title: 'Call Us', detail: contactInfo.phone },
    { icon: <LuMail size={20} />, title: 'Email Us', detail: contactInfo.email },
    { icon: <LuClock size={20} />, title: 'Business Hours', detail: `${contactInfo.hours}\n${contactInfo.hoursClosed}` }
  ]

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        breadcrumbs
      />

      <section className={styles.section}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className={styles.infoHeading}>Get in Touch</h3>
                <p className={styles.infoDesc}>
                  Have a question or want to place an order? Reach out to us through any
                  of the channels below.
                </p>
                <div className={styles.infoList}>
                  {infoItems.map((item, index) => (
                    <div key={index} className={styles.infoItem}>
                      <div className={styles.infoIcon}>{item.icon}</div>
                      <div>
                        <h4 className={styles.infoTitle}>{item.title}</h4>
                        <p className={styles.infoDetail}>
                          {(item.detail || '').split('\n').map((line, i, arr) => (
                            <span key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="col-lg-7">
              <motion.div
                className={styles.formCard}
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {submitted ? (
                  <div className={styles.success}>
                    <LuCheckCircle size={48} className={styles.successIcon} />
                    <h3 className={styles.successTitle}>Thank You!</h3>
                    <p className={styles.successText}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                      {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                      />
                      {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="Enter your email address"
                        autoComplete="email"
                      />
                      {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="4"
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && <span className={styles.error}>{errors.message}</span>}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <LuSend size={18} />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className="container">
          <motion.div
            className={styles.mapWrapper}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <iframe
              title="Asalkar Healthy Hub Vita Location"
              src="https://maps.google.com/maps?q=Asalkar%20Healthy%20Hub%20Vita&z=15&output=embed"
              width="100%"
              height="350"
              style={{ border: 0, filter: 'saturate(0.8) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact