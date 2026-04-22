'use client'

import Link from 'next/link'
import { useState } from 'react'
import CartIcon from './CartIcon'
import { useAuth } from '@/context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 dark:border-slate-800 backdrop-blur-xl bg-white/80 dark:bg-slate-950/70 shadow-sm">
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
          <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              Products
            </Link>
            <Link
              href="/accessories"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              Accessories
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              How It Works
            </Link>
            {isAuthenticated ? (
              <>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Hi, {user?.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-600 font-semibold transition-all duration-300 px-3 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-primary-600 text-white hover:bg-primary-700 font-semibold transition-all duration-300 px-4 py-2 rounded-full shadow-md hover:shadow-lg"
              >
                Login / Signup
              </Link>
            )}
            <ThemeToggle />
            <CartIcon />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <CartIcon />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300"
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
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-slate-950/95 border-t dark:border-slate-800 shadow-lg backdrop-blur">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/accessories"
              className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </Link>
            <Link
              href="/how-it-works"
              className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300">Hi, {user?.name}</div>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
