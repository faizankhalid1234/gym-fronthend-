'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface Accessory {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  brand?: string
  color?: string
  size?: string
  rating?: number
}

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchAccessories()
  }, [])

  const fetchAccessories = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${apiUrl}/accessories`)
      setAccessories(response.data)
    } catch (error: any) {
      console.error('Error fetching accessories:', error)
      // Show error message to user
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data)
      } else if (error.request) {
        console.error('Network Error: Backend server might not be running')
      }
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'gloves', 'belts', 'straps', 'knee_sleeves', 'wrist_wraps', 'shakers', 'other']
  const filteredAccessories = selectedCategory === 'all' 
    ? accessories 
    : accessories.filter(a => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Gym Accessories</h1>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAccessories.map((accessory) => (
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
                  {accessory.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 line-clamp-2">{accessory.name}</h3>
                  {accessory.brand && (
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">Brand: <span className="font-semibold">{accessory.brand}</span></p>
                  )}
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{accessory.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary-600">
                      ${accessory.price.toFixed(2)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                      {accessory.category.replace('_', ' ')}
                    </span>
                  </div>
                  {(accessory.color || accessory.size) && (
                    <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-1">
                      {accessory.color && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Color: {accessory.color}</span>}
                      {accessory.size && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Size: {accessory.size}</span>}
                    </div>
                  )}
                  {accessory.rating && (
                    <div className="flex items-center text-yellow-500 text-xs sm:text-sm mb-2">
                      {'★'.repeat(Math.floor(accessory.rating))}
                      {'☆'.repeat(5 - Math.floor(accessory.rating))}
                      <span className="ml-2 text-gray-600">({accessory.rating})</span>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Stock: {accessory.stock > 0 ? `${accessory.stock} available` : 'Out of stock'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accessories found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
