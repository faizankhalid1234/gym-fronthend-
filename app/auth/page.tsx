'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type AuthTab = 'login' | 'signup'

export default function AuthPage() {
  const router = useRouter()
  const { login, signup, demoLogin } = useAuth()
  const [tab, setTab] = useState<AuthTab>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()

    if (!normalizedEmail || !normalizedPassword || (tab === 'signup' && !name.trim())) {
      setIsError(true)
      setMessage('Please fill in all required fields.')
      return
    }

    const result =
      tab === 'login'
        ? login(normalizedEmail, normalizedPassword)
        : signup(name.trim(), normalizedEmail, normalizedPassword)

    setIsError(!result.success)
    setMessage(result.message)

    if (result.success) {
      router.push('/')
    }
  }

  const handleDemoLogin = () => {
    const result = demoLogin()
    setIsError(!result.success)
    setMessage(result.message)
    if (result.success) {
      router.push('/')
    }
  }

  return (
    <section className="min-h-[75vh] bg-gray-50 px-4 py-12 sm:py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Welcome to Gym Management</h1>
        <p className="text-gray-600 text-center mt-2">Login, sign up, or try demo access instantly.</p>

        <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
          <button
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition ${tab === 'login' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}
            onClick={() => setTab('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition ${tab === 'signup' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}
            onClick={() => setTab('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 transition"
          >
            {tab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mt-4 rounded-lg border border-primary-500 text-primary-700 hover:bg-primary-50 font-semibold py-2.5 transition"
        >
          Demo Login
        </button>

        {message && (
          <p className={`mt-4 text-sm text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
        )}
      </div>
    </section>
  )
}
