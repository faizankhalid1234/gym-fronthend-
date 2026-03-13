'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  brand?: string
  rating?: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gym-backend-ten-psi.vercel.app/api'
      const response = await axios.get(`${apiUrl}/products/${params.id}`)
      setProduct(response.data)
    } catch (error: any) {
      console.error('Error fetching product:', error)
      if (error.response?.status === 404) {
        setProduct(null)
      }
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href="/products" className="text-primary-600 hover:text-primary-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/products"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x600?text=' + encodeURIComponent(product.name);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p>No Image Available</p>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.brand && (
                <p className="text-lg text-gray-600 mb-4">Brand: <span className="font-semibold">{product.brand}</span></p>
              )}

              <div className="mb-4">
                <span className="text-4xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
              </div>

              {product.rating && (
                <div className="mb-4 flex items-center">
                  <div className="text-yellow-500 text-xl">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.rating}/5)</span>
                </div>
              )}

              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
                <span className="ml-3 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 capitalize">
                  {product.category}
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <button
                disabled={product.stock === 0}
                onClick={() => {
                  if (product.stock > 0) {
                    addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.image || '',
                      type: 'product'
                    })
                    setAdded(true)
                    setTimeout(() => setAdded(false), 2000)
                  }
                }}
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                  product.stock > 0
                    ? added
                      ? 'bg-green-600'
                      : 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? '✓ Added to Cart!' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
