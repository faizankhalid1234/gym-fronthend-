'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  type: 'product' | 'accessory'
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.type === item.type)
      if (existing) {
        return prev.map(i => 
          i.id === item.id && i.type === item.type 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (id: string, type: 'product' | 'accessory') => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.type === type)))
  }

  const updateQuantity = (id: string, type: 'product' | 'accessory', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, type)
      return
    }
    setCartItems(prev => 
      prev.map(i => 
        i.id === id && i.type === type ? { ...i, quantity } : i
      )
    )
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    itemCount,
    isOpen,
    setIsOpen
  }
}

export function useCart() {
  return Cart()
}
