import { motion } from 'framer-motion'
import { LuEye } from 'react-icons/lu'
import { scaleIn, staggerContainer } from '../utils/animations'
import styles from './Style/Gallery.module.css'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    alt: 'Cold Pressed Coconut Oil Bottles'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    alt: 'Premium Groundnut Oil Collection'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    alt: 'Golden Sunflower Fields'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    alt: 'Oil Bottle Lineup Display'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    alt: 'Pure Safflower Oil Extraction'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    alt: 'Natural Coconut Oil Process'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    alt: 'Fresh Coconuts for Oil Pressing'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    alt: 'Healthy Cooking with Natural Oils'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    alt: 'Organic Seeds and Nuts Collection'
  }
]

const colClasses = [
  'col-md-4 col-6',
  'col-md-4 col-6',
  'col-md-4 col-6',
  'col-md-6 col-6',
  'col-md-3 col-6',
  'col-md-3 col-6',
  'col-md-4 col-6',
  'col-md-4 col-6',
  'col-md-4 col-6'
]

const Gallery = () => {
  return (
    <section className={styles.section} id="gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-subtitle">Our Gallery</span>
          <h2 className="section-title">A Glimpse Into Our World</h2>
        </motion.div>

        <motion.div
          className="row g-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={colClasses[index]}
              variants={scaleIn}
            >
              <div
                className={`${styles.imageCard} ${index === 3 ? styles.tall : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <LuEye size={24} color="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery




// import { motion } from 'framer-motion'
// import { LuEye } from 'react-icons/lu'
// import { scaleIn, staggerContainer } from '../utils/animations'
// import { galleryImages } from '../data/data'
// import styles from './Style/Gallery.module.css'

// const colClasses = [
//   'col-md-4 col-6',
//   'col-md-4 col-6',
//   'col-md-4 col-6',
//   'col-md-6 col-6',
//   'col-md-3 col-6',
//   'col-md-3 col-12'
// ]

// const Gallery = () => {
//   return (
//     <section className={styles.section} id="gallery">
//       <div className="container">
//         <motion.div
//           className="section-header"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//         >
//           <span className="section-subtitle">Our Gallery</span>
//           <h2 className="section-title">A Glimpse Into Our World</h2>
//         </motion.div>

//         <motion.div
//           className="row g-3"
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {galleryImages.map((img, index) => (
//             <motion.div
//               key={img.id}
//               className={colClasses[index]}
//               variants={scaleIn}
//             >
//               <div className={`${styles.imageCard} ${index === 3 ? styles.tall : ''}`}>
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className={styles.image}
//                   loading="lazy"
//                 />
//                 <div className={styles.overlay}>
//                   <LuEye size={24} color="white" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Gallery