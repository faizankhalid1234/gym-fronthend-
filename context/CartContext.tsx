'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  type: 'product' | 'accessory'
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string, type: 'product' | 'accessory') => void
  updateQuantity: (id: string, type: 'product' | 'accessory', quantity: number) => void
  total: number
  itemCount: number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

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

  const clearCart = () => {
    setCartItems([])
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      total,
      itemCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
