'use client'

import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './CartIcon'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">💪</span>
              <span className="hidden sm:inline">Gym Management</span>
              <span className="sm:hidden">Gym</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Products
            </Link>
            <Link
              href="/accessories"
              className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Accessories
            </Link>
            <CartIcon />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <CartIcon />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-slideDown">
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t shadow-lg">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/accessories"
              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
