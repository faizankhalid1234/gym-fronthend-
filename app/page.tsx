import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Gym Management | Fitness Products, Supplements and Accessories',
  description:
    'Shop premium gym equipment, fitness accessories and supplements. Explore top-rated products for muscle gain, strength training and healthy performance.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <HomePageClient />
}
