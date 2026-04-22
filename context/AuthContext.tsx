'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AuthUser {
  name: string
  email: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => { success: boolean; message: string }
  signup: (name: string, email: string, password: string) => { success: boolean; message: string }
  demoLogin: () => { success: boolean; message: string }
  logout: () => void
}

const AUTH_STORAGE_KEY = 'gym_auth_user'
const USER_STORAGE_KEY = 'gym_registered_user'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    const savedRaw = localStorage.getItem(USER_STORAGE_KEY)
    if (!savedRaw) {
      return { success: false, message: 'No account found. Please sign up first.' }
    }

    const savedUser = JSON.parse(savedRaw) as AuthUser & { password: string }
    if (savedUser.email !== email || savedUser.password !== password) {
      return { success: false, message: 'Invalid email or password.' }
    }

    const authUser = { name: savedUser.name, email: savedUser.email }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser))
    setUser(authUser)
    return { success: true, message: 'Login successful.' }
  }

  const signup = (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const newUser = { name: name.trim(), email: normalizedEmail, password }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))

    const authUser = { name: newUser.name, email: newUser.email }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser))
    setUser(authUser)
    return { success: true, message: 'Account created successfully.' }
  }

  const demoLogin = () => {
    const demoUser = { name: 'Demo User', email: 'demo@gymmanagement.com' }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
    return { success: true, message: 'Logged in with demo account.' }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      demoLogin,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
