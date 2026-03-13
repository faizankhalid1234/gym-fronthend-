'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { getImageUrl } from '@/lib/utils'
import { getDemoAccessory } from '@/lib/demoData'

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

export default function AccessoryDetailPage() {
  const params = useParams()
  const [accessory, setAccessory] = useState<Accessory | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchAccessory()
    }
  }, [params.id])

  const fetchAccessory = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gym-backend-ten-psi.vercel.app/api'
      const response = await axios.get(`${apiUrl}/accessories/${params.id}`)
      setAccessory(response.data)
    } catch (error: any) {
      const demo = getDemoAccessory(String(params.id))
      setAccessory(demo)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!accessory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Accessory not found</h2>
          <Link href="/accessories" className="text-primary-600 hover:text-primary-700">
            ← Back to Accessories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/accessories"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
        >
          ← Back to Accessories
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {accessory.image ? (
                <img
                  src={getImageUrl(accessory.image)}
                  alt={accessory.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(accessory.name);
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-24 h-24 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-lg font-medium capitalize">{accessory.category.replace('_', ' ')}</span>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{accessory.name}</h1>
              
              {accessory.brand && (
                <p className="text-lg text-gray-600 mb-2">Brand: <span className="font-semibold">{accessory.brand}</span></p>
              )}

              <div className="mb-4">
                <span className="text-4xl font-bold text-primary-600">${accessory.price.toFixed(2)}</span>
              </div>

              {accessory.rating && (
                <div className="mb-4 flex items-center">
                  <div className="text-yellow-500 text-xl">
                    {'★'.repeat(Math.floor(accessory.rating))}
                    {'☆'.repeat(5 - Math.floor(accessory.rating))}
                  </div>
                  <span className="ml-2 text-gray-600">({accessory.rating}/5)</span>
                </div>
              )}

              <div className="mb-6 flex flex-wrap gap-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  accessory.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {accessory.stock > 0 ? `${accessory.stock} in stock` : 'Out of stock'}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 capitalize">
                  {accessory.category.replace('_', ' ')}
                </span>
                {accessory.color && (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    Color: {accessory.color}
                  </span>
                )}
                {accessory.size && (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                    Size: {accessory.size}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{accessory.description}</p>
              </div>

              <button
                disabled={accessory.stock === 0}
                onClick={() => {
                  if (accessory.stock > 0) {
                    addToCart({
                      id: accessory._id,
                      name: accessory.name,
                      price: accessory.price,
                      image: getImageUrl(accessory.image) || '',
                      type: 'accessory'
                    })
                    setAdded(true)
                    setTimeout(() => setAdded(false), 2000)
                  }
                }}
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                  accessory.stock > 0
                    ? added
                      ? 'bg-green-600'
                      : 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? '✓ Added to Cart!' : accessory.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
