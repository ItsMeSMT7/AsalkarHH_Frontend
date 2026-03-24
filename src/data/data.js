export const navLinks = [
  { id: 1, label: 'Home', path: '/' },
  { id: 2, label: 'Products', path: '/products' },
  { id: 3, label: 'About', path: '/about' },
  { id: 4, label: 'Contact', path: '/contact' }
]

export const contactInfo = {
  phone: '+91 8421429515',
  phoneRaw: '918421429515',
  email: 'asalkarhh@gmail.com',
  address: 'Maharashtra, India',
  hours: 'Monday – Saturday: 9:00 AM – 7:00 PM',
  hoursClosed: 'Sunday: Closed',
  whatsapp: '918421429515',
  owner: 'Rajkumar Asalkar'
}

export const benefits = [
  {
    id: 1,
    icon: 'flask',
    title: '100% Chemical Free',
    description: 'No preservatives, no additives, no artificial colors. Just pure oil the way nature made it.'
  },
  {
    id: 2,
    icon: 'hammer',
    title: 'Cold Pressed',
    description: 'Extracted using traditional Colden Ghani/Kolhu machines that maintain low temperature during pressing.'
  },
  {
    id: 3,
    icon: 'heart',
    title: 'Rich in Nutrients',
    description: 'Cold pressing retains vitamins, antioxidants, and essential fatty acids that heat-based extraction destroys.'
  },
  {
    id: 4,
    icon: 'droplet',
    title: 'Pure Authentic Taste',
    description: 'Experience the real flavor and aroma of each oil — exactly how our grandparents used to have it.'
  }
]

export const processSteps = [
  {
    id: 1,
    step: '01',
    icon: 'seed',
    title: 'Seed Selection',
    description: 'We carefully source the finest quality seeds and nuts from trusted local farmers across Maharashtra.'
  },
  {
    id: 2,
    step: '02',
    icon: 'press',
    title: 'Cold Pressing',
    description: 'Seeds are pressed using traditional Colden Ghani machines at low temperature to preserve all nutrients.'
  },
  {
    id: 3,
    step: '03',
    icon: 'filter',
    title: 'Natural Filtration',
    description: 'Oil is filtered naturally through cotton cloth. No chemical refining or artificial processing involved.'
  },
  {
    id: 4,
    step: '04',
    icon: 'package',
    title: 'Fresh Packaging',
    description: 'Freshly pressed oil is packed in food-grade bottles and delivered to ensure maximum freshness.'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Pune',
    rating: 5,
    quote: 'This is the purest groundnut oil I have ever used. The aroma takes me back to my grandmother\'s kitchen. Truly authentic and chemical-free!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
  },
  {
    id: 2,
    name: 'Amit Deshmukh',
    location: 'Mumbai',
    rating: 5,
    quote: 'We switched to Asalkar\'s coconut oil for all our cooking. The difference in taste and quality is remarkable. My family loves it!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
  },
  {
    id: 3,
    name: 'Sunita Patil',
    location: 'Kolhapur',
    rating: 5,
    quote: 'I was looking for genuinely Cold pressed safflower oil and finally found it. You can tell it\'s the real thing from the color and smell. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
  },
  {
    id: 4,
    name: 'Rajesh Kulkarni',
    location: 'Nagpur',
    rating: 5,
    quote: 'Best quality sunflower oil in the market. No comparison with the refined oils sold in stores. My kids\' health has improved since we switched.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
  }
]

export const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1595981234058-a9302fb97229?w=600&q=80',
    alt: 'Traditional Colden oil press machine',
    category: 'process'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1474979266404-7f28db3f3298?w=600&q=80',
    alt: 'Premium oil bottles lineup',
    category: 'products'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&q=80',
    alt: 'Fresh peanuts and seeds closeup',
    category: 'ingredients'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80',
    alt: 'Golden oil being poured',
    category: 'process'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    alt: 'Local farming fields in Maharashtra',
    category: 'farming'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    alt: 'Healthy natural food arrangement',
    category: 'lifestyle'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
    alt: 'Fresh Groundnuts for Oil Pressing',
    category: 'ingredients'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80',
    alt: 'Healthy Cooking with Sunflower Oil',
    category: 'lifestyle'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1585827732971-ce9a3e2c39e2?w=600&q=80',
    alt: 'Organic Seeds and Nuts Collection',
    category: 'ingredients'
  }
]

export const productCategories = [
  'All Products',
  'Coconut Oil',
  'Groundnut Oil',
  'Sunflower Oil',
  'Safflower Oil',
  'Oil Cake (Pend)'
]

// Temporary fallback to prevent import errors until components are updated to fetch from the database
export const featuredProducts = [];
export const products = [];