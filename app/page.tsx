'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

interface Accessory {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [featuredAccessories, setFeaturedAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedItems()
  }, [])

  const fetchFeaturedItems = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gym-backend-ten-psi.vercel.app/api'
      const [productsRes, accessoriesRes] = await Promise.all([
        axios.get(`${apiUrl}/products/featured`),
        axios.get(`${apiUrl}/accessories/featured`)
      ])
      setFeaturedProducts(productsRes.data)
      setFeaturedAccessories(accessoriesRes.data)
    } catch (error: any) {
      console.error('Error fetching featured items:', error)
      if (error.request) {
        console.error('Network Error: Unable to connect to backend API')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block text-6xl sm:text-7xl mb-4">💪</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Transform Your Fitness Journey
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-primary-100 max-w-3xl mx-auto">
            Premium Gym Equipment, Supplements & Accessories
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Products
            </Link>
            <Link
              href="/accessories"
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white"
            >
              Browse Accessories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <Link
              href="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base flex items-center gap-1"
            >
              View All <span className="text-lg">→</span>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(product.name);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium capitalize">{product.category}</span>
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg">
                        Out of Stock
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No featured products available</p>
          )}
        </div>
      </section>

      {/* Featured Accessories */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Featured Accessories</h2>
            <Link
              href="/accessories"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base flex items-center gap-1"
            >
              View All <span className="text-lg">→</span>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredAccessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {featuredAccessories.map((accessory) => (
                <Link
                  key={accessory._id}
                  href={`/accessories/${accessory._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {accessory.image ? (
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(accessory.name);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium capitalize">{accessory.category.replace('_', ' ')}</span>
                      </div>
                    )}
                    {accessory.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg">
                        Out of Stock
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 line-clamp-2">{accessory.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{accessory.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary-600">
                        ${accessory.price.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                        {accessory.category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No featured accessories available</p>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-white hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-sm sm:text-base text-gray-600">Only the best products from trusted brands</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-white hover:shadow-lg transition-shadow duration-300">
              <div className="bg-primary-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Fast Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-white hover:shadow-lg transition-shadow duration-300 sm:col-span-2 md:col-span-1">
              <div className="bg-primary-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">Best Prices</h3>
              <p className="text-sm sm:text-base text-gray-600">Competitive pricing with regular discounts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
