// Demo/fallback data when backend API is down - ensures site always shows content with images
const DEMO_IMAGES = {
  products: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400',
    'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400',
  ],
}

export const DEMO_PRODUCTS = [
  { _id: 'demo-1', name: 'Adjustable Dumbbells Set', description: 'Premium adjustable dumbbells for home gym. Space-saving design.', price: 199.99, image: DEMO_IMAGES.products[0], category: 'equipment', stock: 15, brand: 'ProFit', rating: 4.5, featured: true },
  { _id: 'demo-2', name: 'Protein Powder 2kg', description: 'Whey protein isolate for muscle recovery. 24g protein per serving.', price: 49.99, image: DEMO_IMAGES.products[1], category: 'supplements', stock: 50, brand: 'MuscleMax', rating: 4.8, featured: true },
  { _id: 'demo-3', name: 'Olympic Barbell 20kg', description: 'Professional grade olympic barbell for heavy lifting.', price: 299.99, image: DEMO_IMAGES.products[2], category: 'equipment', stock: 8, brand: 'IronKing', rating: 4.9, featured: true },
  { _id: 'demo-4', name: 'Fitness Tank Top', description: 'Breathable moisture-wicking tank for intense workouts.', price: 24.99, image: DEMO_IMAGES.products[3], category: 'apparel', stock: 100, brand: 'GymWear', rating: 4.3, featured: false },
  { _id: 'demo-5', name: 'Resistance Bands Set', description: 'Set of 5 resistance levels for versatile training.', price: 34.99, image: DEMO_IMAGES.products[4], category: 'equipment', stock: 75, brand: 'FlexBand', rating: 4.6, featured: false },
  { _id: 'demo-6', name: 'Pre-Workout Energy', description: 'Caffeine-free pre-workout for sustained energy.', price: 39.99, image: DEMO_IMAGES.products[5], category: 'supplements', stock: 40, brand: 'PowerUp', rating: 4.4, featured: false },
]

export const DEMO_ACCESSORIES = [
  { _id: 'demo-a1', name: 'Lifting Straps', description: 'Heavy-duty nylon straps for secure grip on heavy pulls.', price: 19.99, image: DEMO_IMAGES.accessories[0], category: 'straps', stock: 60, brand: 'GripPro', rating: 4.7, featured: true },
  { _id: 'demo-a2', name: 'Weight Lifting Belt', description: 'Leather belt for lower back support during squats and deadlifts.', price: 59.99, image: DEMO_IMAGES.accessories[1], category: 'belts', stock: 25, brand: 'PowerLift', rating: 4.9, featured: true },
  { _id: 'demo-a3', name: 'Gym Gloves', description: 'Padded palms to prevent calluses. Breathable mesh.', price: 24.99, image: DEMO_IMAGES.accessories[2], category: 'gloves', stock: 80, brand: 'FitHands', rating: 4.5, featured: true },
  { _id: 'demo-a4', name: 'Protein Shaker 700ml', description: 'BPA-free shaker with measurement markings.', price: 12.99, image: DEMO_IMAGES.accessories[3], category: 'shakers', stock: 150, brand: 'ShakeFit', rating: 4.6, featured: false },
  { _id: 'demo-a5', name: 'Knee Sleeves Pair', description: 'Neoprene sleeves for knee support and warmth.', price: 34.99, image: DEMO_IMAGES.accessories[0], category: 'knee_sleeves', stock: 45, brand: 'KneeGuard', rating: 4.8, featured: false },
  { _id: 'demo-a6', name: 'Wrist Wraps', description: 'Support wraps for heavy pressing movements.', price: 18.99, image: DEMO_IMAGES.accessories[1], category: 'wrist_wraps', stock: 55, brand: 'WristPro', rating: 4.4, featured: false },
]

export function getDemoProduct(id: string) {
  return DEMO_PRODUCTS.find((p) => p._id === id) ?? null
}

export function getDemoAccessory(id: string) {
  return DEMO_ACCESSORIES.find((a) => a._id === id) ?? null
}
