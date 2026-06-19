export type Tier = 'Elite' | 'Ascent' | 'Titanium'

export type Product = {
  id: number
  slug: string
  name: string
  subtitle: string
  seller: string
  tier: Tier
  score: number
  price: number
  oldPrice?: number
  image: string
  gallery: string[]
  category: string
  subcategory: string
  inStock: number
  description: string[]
  features: string[]
  specs: { label: string; value: string }[]
  rating: number
  reviews: number
  badge?: { label: string; tone: 'hot' | 'new' | 'best' }
  seller_info: {
    products: number
    memberSince: string
    responseTime: string
  }
}

export const tierStyles: Record<Tier, string> = {
  Elite: 'bg-violet-100 text-violet-700',
  Ascent: 'bg-blue-100 text-blue-700',
  Titanium: 'bg-slate-200 text-slate-700',
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'corsair-virtuoso-rgb-wireless-xt-headset',
    name: 'Corsair Virtuoso RGB Wireless XT Headset',
    subtitle: 'High-Fidelity Gaming Headset',
    seller: 'Tech Haven',
    tier: 'Elite',
    score: 95,
    price: 199.99,
    oldPrice: 249.99,
    image: '/market/headphones.png',
    gallery: ['/market/headphones.png'],
    category: 'Gaming',
    subcategory: 'Audio',
    inStock: 12,
    description: [
      'Immerse yourself in premium spatial audio with the Corsair Virtuoso RGB Wireless XT, engineered for serious gamers and audiophiles alike.',
      'Featuring slipstream wireless technology, Bluetooth connectivity, and a broadcast-grade detachable microphone for crystal-clear comms.',
    ],
    features: [
      'SLIPSTREAM wireless with sub-1ms latency',
      'Hi-Fi 24bit/96kHz audio playback',
      'Broadcast-grade detachable microphone',
      'Memory foam ear cushions with breathable fabric',
      'Up to 20 hours of battery life',
    ],
    specs: [
      { label: 'Connectivity', value: 'Wireless / Bluetooth / USB' },
      { label: 'Driver', value: '50mm neodymium' },
      { label: 'Battery Life', value: '20 hours' },
      { label: 'Weight', value: '370g' },
    ],
    rating: 4.8,
    reviews: 214,
    badge: { label: '20% OFF', tone: 'hot' },
    seller_info: { products: 856, memberSince: 'Mar 2024', responseTime: '2h' },
  },
  {
    id: 2,
    slug: 'keychron-k8-pro-mechanical-keyboard',
    name: 'Keychron K8 Pro Mechanical Keyboard',
    subtitle: 'Wireless Mechanical Keyboard',
    seller: 'Tech Haven',
    tier: 'Ascent',
    score: 85,
    price: 89.99,
    image: '/market/keyboard.png',
    gallery: ['/market/keyboard.png'],
    category: 'Electronics',
    subcategory: 'Keyboards',
    inStock: 34,
    description: [
      'The Keychron K8 Pro brings QMK/VIA support to a hot-swappable, wireless mechanical keyboard built for productivity and play.',
      'Enjoy a satisfying typing experience with Gateron switches and a durable aluminum frame.',
    ],
    features: [
      'QMK/VIA fully programmable',
      'Hot-swappable Gateron Pro switches',
      'Bluetooth 5.1 and wired USB-C',
      'Double-shot PBT keycaps',
      'Up to 240 hours backlight off battery',
    ],
    specs: [
      { label: 'Layout', value: 'Tenkeyless (87 keys)' },
      { label: 'Switches', value: 'Gateron Pro Red' },
      { label: 'Connectivity', value: 'Bluetooth / USB-C' },
      { label: 'Battery', value: '4000mAh' },
    ],
    rating: 4.6,
    reviews: 142,
    badge: { label: 'NEW', tone: 'new' },
    seller_info: { products: 856, memberSince: 'Mar 2024', responseTime: '2h' },
  },
  {
    id: 3,
    slug: 'logitech-g-pro-x-superlight-2',
    name: 'Logitech G Pro X Superlight 2',
    subtitle: 'Wireless Gaming Mouse',
    seller: 'Aim Labs Store',
    tier: 'Elite',
    score: 96,
    price: 149.99,
    oldPrice: 179.99,
    image: '/store/product-mouse.png',
    gallery: ['/store/product-mouse.png'],
    category: 'Gaming',
    subcategory: 'Mice',
    inStock: 8,
    description: [
      'The next evolution of our championship-winning mouse. The Logitech G Pro X Superlight 2 is designed in collaboration with world-class esports professionals to break down any barrier between you and the win.',
      'Engineered for performance with LIGHTSPEED wireless, HERO 2 sensor, and weighing only 60g.',
    ],
    features: [
      'LIGHTSPEED wireless with up to 95 hours battery life',
      'HERO 2 sensor with up to 32,000 DPI',
      'Ultra-lightweight design - only 60g',
      'PTFE feet for smooth and effortless glide',
      '5 programmable buttons with onboard memory',
    ],
    specs: [
      { label: 'Sensor', value: 'HERO 2 (32,000 DPI)' },
      { label: 'Weight', value: '60g' },
      { label: 'Connectivity', value: 'LIGHTSPEED wireless' },
      { label: 'Battery Life', value: '95 hours' },
      { label: 'Buttons', value: '5 programmable' },
    ],
    rating: 4.9,
    reviews: 320,
    badge: { label: '15% OFF', tone: 'hot' },
    seller_info: { products: 1245, memberSince: 'May 2025', responseTime: '1h' },
  },
  {
    id: 4,
    slug: 'lg-ultragear-27-144hz-gaming-monitor',
    name: 'LG UltraGear 27" 144Hz Gaming Monitor',
    subtitle: 'QHD Gaming Monitor',
    seller: 'NextGen Store',
    tier: 'Ascent',
    score: 88,
    price: 229.99,
    image: '/market/monitor.png',
    gallery: ['/market/monitor.png'],
    category: 'Electronics',
    subcategory: 'Monitors',
    inStock: 21,
    description: [
      'Gain the competitive edge with the LG UltraGear 27" QHD gaming monitor, featuring a blazing 144Hz refresh rate and 1ms response time.',
      'NVIDIA G-SYNC compatible for tear-free, stutter-free gameplay.',
    ],
    features: [
      '27" QHD (2560x1440) IPS panel',
      '144Hz refresh rate, 1ms response',
      'NVIDIA G-SYNC compatible',
      'HDR10 with sRGB 99% color gamut',
      'Adjustable height and tilt stand',
    ],
    specs: [
      { label: 'Panel', value: '27" IPS QHD' },
      { label: 'Refresh Rate', value: '144Hz' },
      { label: 'Response Time', value: '1ms' },
      { label: 'Ports', value: 'HDMI x2, DisplayPort' },
    ],
    rating: 4.7,
    reviews: 98,
    badge: { label: 'NEW', tone: 'new' },
    seller_info: { products: 1102, memberSince: 'Jan 2024', responseTime: '3h' },
  },
  {
    id: 5,
    slug: 'apple-airpods-pro-2nd-gen',
    name: 'Apple AirPods Pro (2nd Gen)',
    subtitle: 'Active Noise Cancelling Earbuds',
    seller: 'SoundSphere',
    tier: 'Elite',
    score: 93,
    price: 189.99,
    oldPrice: 209.99,
    image: '/market/airpods.png',
    gallery: ['/market/airpods.png'],
    category: 'Accessories',
    subcategory: 'Audio',
    inStock: 45,
    description: [
      'AirPods Pro (2nd generation) deliver up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio.',
      'A single charge gives you up to 6 hours of listening time, with the MagSafe case providing up to 30 hours total.',
    ],
    features: [
      'Up to 2x more Active Noise Cancellation',
      'Adaptive Transparency mode',
      'Personalized Spatial Audio',
      'Up to 6 hours listening time (30h with case)',
      'MagSafe charging case with speaker',
    ],
    specs: [
      { label: 'Chip', value: 'Apple H2' },
      { label: 'Battery', value: '6h (30h with case)' },
      { label: 'Charging', value: 'MagSafe / USB-C' },
      { label: 'Water Resistance', value: 'IP54' },
    ],
    rating: 4.8,
    reviews: 512,
    badge: { label: '10% OFF', tone: 'hot' },
    seller_info: { products: 654, memberSince: 'Aug 2023', responseTime: '1h' },
  },
  {
    id: 6,
    slug: 'sony-a7-iii-mirrorless-camera',
    name: 'Sony A7 III Mirrorless Camera',
    subtitle: 'Full-Frame Mirrorless Camera',
    seller: 'PhotoWorld',
    tier: 'Elite',
    score: 97,
    price: 1499.99,
    image: '/market/camera.png',
    gallery: ['/market/camera.png'],
    category: 'Electronics',
    subcategory: 'Cameras',
    inStock: 6,
    description: [
      'The Sony A7 III is a full-frame mirrorless powerhouse with a 24.2MP back-illuminated sensor and 693-point phase-detection autofocus.',
      'Capture stunning 4K HDR video and shoot up to 10fps with continuous AF/AE tracking.',
    ],
    features: [
      '24.2MP full-frame Exmor R sensor',
      '693-point phase-detection AF',
      '4K HDR video recording',
      'Up to 10fps continuous shooting',
      '5-axis in-body image stabilization',
    ],
    specs: [
      { label: 'Sensor', value: '24.2MP Full-Frame' },
      { label: 'ISO Range', value: '100-51200' },
      { label: 'Video', value: '4K HDR' },
      { label: 'Stabilization', value: '5-axis IBIS' },
    ],
    rating: 4.9,
    reviews: 176,
    badge: { label: 'BEST SELLER', tone: 'best' },
    seller_info: { products: 432, memberSince: 'Feb 2023', responseTime: '4h' },
  },
  {
    id: 7,
    slug: 'apple-watch-series-9',
    name: 'Apple Watch Series 9',
    subtitle: 'Smartwatch with Always-On Display',
    seller: 'Elite Gear Store',
    tier: 'Elite',
    score: 95,
    price: 399.99,
    image: '/products/smart-watch.png',
    gallery: ['/products/smart-watch.png'],
    category: 'Accessories',
    subcategory: 'Wearables',
    inStock: 28,
    description: [
      'Apple Watch Series 9 features the powerful S9 chip, a brighter Always-On Retina display, and the magical new double tap gesture.',
      'Advanced health and fitness tracking keeps you connected and motivated all day.',
    ],
    features: [
      'S9 SiP with 4-core Neural Engine',
      'Brighter Always-On Retina display (2000 nits)',
      'Double tap gesture',
      'Advanced health sensors & ECG',
      'Carbon neutral options available',
    ],
    specs: [
      { label: 'Chip', value: 'S9 SiP' },
      { label: 'Display', value: 'Always-On Retina' },
      { label: 'Brightness', value: '2000 nits' },
      { label: 'Water Resistance', value: '50m' },
    ],
    rating: 4.8,
    reviews: 289,
    badge: { label: 'NEW', tone: 'new' },
    seller_info: { products: 1245, memberSince: 'May 2025', responseTime: '1h' },
  },
  {
    id: 8,
    slug: 'secretlab-titan-evo-2022',
    name: 'Secretlab Titan Evo 2022',
    subtitle: 'Premium Ergonomic Gaming Chair',
    seller: 'Tech Haven',
    tier: 'Ascent',
    score: 84,
    price: 449.99,
    oldPrice: 599.99,
    image: '/market/chair.png',
    gallery: ['/market/chair.png'],
    category: 'Home & Living',
    subcategory: 'Furniture',
    inStock: 15,
    description: [
      'The Secretlab Titan Evo 2022 sets the benchmark for ergonomic gaming chairs with its integrated 4-way L-ADAPT lumbar support system.',
      'Crafted with proprietary NEO Hybrid Leatherette for durability and comfort during marathon sessions.',
    ],
    features: [
      'Integrated 4-way L-ADAPT lumbar support',
      'NEO Hybrid Leatherette upholstery',
      'Magnetic memory foam head pillow',
      '4D armrests with full adjustability',
      'Multi-tilt mechanism up to 165 degrees',
    ],
    specs: [
      { label: 'Material', value: 'NEO Hybrid Leatherette' },
      { label: 'Recline', value: 'Up to 165 degrees' },
      { label: 'Max Weight', value: '130kg' },
      { label: 'Warranty', value: '5 years' },
    ],
    rating: 4.7,
    reviews: 203,
    badge: { label: '25% OFF', tone: 'hot' },
    seller_info: { products: 856, memberSince: 'Mar 2024', responseTime: '2h' },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
