import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-primary-950 text-white dark:from-black dark:via-slate-950 dark:to-primary-950">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.35),_transparent_45%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-primary-300">💪 Gym Management</h3>
            <p className="text-gray-300 mb-6 max-w-xl leading-relaxed">
              Your trusted partner for premium gym equipment, supplements, and accessories. We bring quality products
              that help you build strength, stay consistent, and achieve your fitness goals.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-200 border border-primary-400/30">
                Premium Quality
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                Fast Delivery
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-400/30">
                Best Price
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-300 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary-300 transition duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-gray-300 hover:text-primary-300 transition duration-300">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-primary-300 transition duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-gray-300 hover:text-primary-300 transition duration-300">
                  Login / Signup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact & Profiles</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Faizan Khalid
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:03029655325" className="hover:text-primary-300 transition duration-300">
                  03029655325
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.linkedin.com/in/faizan-khalid-developerp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 hover:bg-primary-600 transition duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://portfolio-faizan-topaz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 hover:bg-primary-600 transition duration-300"
                >
                  <span>🌐</span>
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/faizankhalid1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 hover:bg-gray-700 transition duration-300"
                >
                  <span>🐙</span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-7 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Gym Management. All rights reserved.</p>
          <p className="mt-2 font-medium text-primary-300">Developed by Faizan Khalid</p>
        </div>
      </div>
    </footer>
  )
}
