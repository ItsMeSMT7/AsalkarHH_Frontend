import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { productCategories } from '../data/data'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import styles from './PagesStyle/Products.module.css'

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [products, setProducts] = useState([])

  useEffect(() => {
    document.title = 'Our Products — Asalkar Healthy Hub Vita'

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const responseData = await response.json()
          const productList = responseData.success ? responseData.data : (Array.isArray(responseData) ? responseData : [])
          if (productList.length > 0) {
            const mappedProducts = productList.map(item => ({
              ...item,
              size: item.weight,
              image: item.imageUrl,
              inStock: item.stockStatus !== 'OUT_OF_STOCK'
            }));

            // Sort products according to required display order
            const getCategoryRank = (cat) => {
              const c = (cat || '').toLowerCase();
              if (c.includes('pend') || c.includes('cake')) return 5; // Put all Pend at the end
              if (c.includes('coconut')) return 1;
              if (c.includes('sunflower')) return 2;
              if (c.includes('groundnut')) return 3;
              if (c.includes('safflower')) return 4;
              return 6;
            };
            
            const getSizeRank = (size) => {
              const s = (size || '').toLowerCase();
              if (s.includes('500')) return 1; // 500ml first
              if (s.includes('1')) return 2;   // 1 Litre or 1 Kg next
              if (s.includes('5')) return 3;   // 5 Litre last
              return 4;
            };

            mappedProducts.sort((a, b) => {
              const rankA = getCategoryRank(a.category);
              const rankB = getCategoryRank(b.category);
              if (rankA !== rankB) return rankA - rankB; // Sort by Category First
              return getSizeRank(a.size) - getSizeRank(b.size); // If same category, sort by Size
            });

            setProducts(mappedProducts);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [])

  const filtered = activeCategory === 'All Products'
    ? products
    : products.filter(p => {
        if (!p.category) return false
        if (activeCategory === 'Oil Cake (Pend)') {
          return p.category.toLowerCase().includes('pend') || p.category.toLowerCase().includes('cake')
        }
        return p.category.includes(activeCategory) && !p.category.toLowerCase().includes('pend')
      })

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