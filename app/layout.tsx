import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://gym-management.vercel.app'),
  title: {
    default: 'Gym Management - Premium Fitness Products & Accessories',
    template: '%s | Gym Management',
  },
  description: 'Shop premium gym equipment, supplements and accessories for your complete fitness journey.',
  keywords: [
    'gym management',
    'gym accessories',
    'fitness products',
    'workout equipment',
    'supplements',
  ],
  openGraph: {
    title: 'Gym Management - Premium Fitness Products & Accessories',
    description: 'Shop premium gym equipment, supplements and accessories for your complete fitness journey.',
    url: 'https://gym-management.vercel.app',
    siteName: 'Gym Management',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gym Management',
    description: 'Premium fitness products, supplements and accessories.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} aqua-glow bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
