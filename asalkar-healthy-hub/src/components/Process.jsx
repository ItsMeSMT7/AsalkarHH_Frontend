import { motion } from 'framer-motion'
import { LuWheat, LuHammer, LuFilter, LuPackage } from 'react-icons/lu'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { processSteps } from '../data/data'
import styles from './Style/Process.module.css'

const iconMap = {
  seed: <LuWheat size={24} />,
  press: <LuHammer size={24} />,
  filter: <LuFilter size={24} />,
  package: <LuPackage size={24} />
}

const Process = () => {
  return (
    <section className={styles.section} id="process">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="section-subtitle">Our Process</span>
          <h2 className="section-title">From Seed to Your Kitchen</h2>
          <p className="section-description">
            We follow a meticulous traditional process to ensure every drop of oil is pure
            and nutritious.
          </p>
        </motion.div>

        <motion.div
          className="row g-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="col-lg-3 col-md-6 col-12"
              variants={fadeInUp}
            >
              <div className={styles.step}>
                <span className={styles.stepNumber}>{step.step}</span>
                <div className={styles.iconCircle}>
                  {iconMap[step.icon]}
                </div>
                {index < processSteps.length - 1 && (
                  <div className={styles.connector} />
                )}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Process