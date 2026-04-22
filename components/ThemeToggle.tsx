'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-gray-700 dark:text-gray-100 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
    >
      <span>{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className="text-sm font-semibold">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
