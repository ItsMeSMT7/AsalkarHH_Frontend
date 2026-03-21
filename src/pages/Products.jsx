import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { products, productCategories } from '../data/data'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import styles from './PagesStyle/Products.module.css'

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All Products')

  useEffect(() => {
    document.title = 'Our Products — Asalkar Healthy Hub Vita'
  }, [])

  const filtered = activeCategory === 'All Products'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="100% Pure Cold Pressed Oils"
        breadcrumbs
      />

      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filters}>
            {productCategories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterPill} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className="row g-3 g-md-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(product => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-4 col-6"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Products