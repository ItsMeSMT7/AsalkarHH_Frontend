import { motion } from 'framer-motion'
import { LuUsers, LuShieldCheck, LuHammer, LuLeaf } from 'react-icons/lu'
import { fadeIn } from '../utils/animations'
import styles from './Style/TrustBar.module.css'

const trustMetrics = [
  { id: 1, icon: <LuUsers size={20} />, text: '500+ Happy Customers' },
  { id: 2, icon: <LuShieldCheck size={20} />, text: '100% Chemical Free' },
  { id: 3, icon: <LuHammer size={20} />, text: 'Traditional Cold Press' },
  { id: 4, icon: <LuLeaf size={20} />, text: 'Fresh & Natural' }
]

const TrustBar = () => {
  return (
    <motion.section
      className={styles.trustBar}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className={styles.grid}>
          {trustMetrics.map(metric => (
            <div key={metric.id} className={styles.item}>
              <span className={styles.icon}>{metric.icon}</span>
              <span className={styles.text}>{metric.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default TrustBar