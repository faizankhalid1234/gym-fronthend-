'use client'

import { useEffect, useRef, useState } from 'react'

const WORK_STEPS = [
  {
    title: '1) Browse Products',
    description: 'User products aur accessories section me ja kar categories filter karta hai aur best items choose karta hai.',
    icon: '🛍️',
  },
  {
    title: '2) View Details',
    description: 'Har item pe click karte hi details page open hota hai jahan price, stock, brand aur description nazar aata hai.',
    icon: '🔍',
  },
  {
    title: '3) Add to Cart',
    description: 'Selected product ya accessory cart me add hoti hai aur quantity controls se user order customize karta hai.',
    icon: '🛒',
  },
  {
    title: '4) Place Order',
    description: 'Cart summary me total calculate hota hai aur Place Order se order workflow complete hota hai.',
    icon: '✅',
  },
]

const HIGHLIGHTS = [
  { label: 'Secure Login', value: '100%', icon: '🔐' },
  { label: 'Smooth Checkout', value: 'Fast', icon: '⚡' },
  { label: 'Responsive UI', value: 'All Devices', icon: '📱' },
  { label: 'Theme Support', value: 'Light / Dark', icon: '🎨' },
]

const DEMO_SCENES = [
  {
    title: 'Step 1: Login / Signup',
    subtitle: 'User account banata hai ya login karta hai.',
    badge: 'Auth',
    icon: '🔐',
  },
  {
    title: 'Step 2: Home Page Explore',
    subtitle: 'User featured products aur accessories browse karta hai.',
    badge: 'Home',
    icon: '🏠',
  },
  {
    title: 'Step 3: Product Detail + Add to Cart',
    subtitle: 'User item open karta hai aur Add to Cart click karta hai.',
    badge: 'Cart Action',
    icon: '🛒',
  },
  {
    title: 'Step 4: Cart & Checkout',
    subtitle: 'Cart summary review karke Place Order karta hai.',
    badge: 'Checkout',
    icon: '✅',
  },
]

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeScene, setActiveScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMusicOn, setIsMusicOn] = useState(false)
  const [musicBlocked, setMusicBlocked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const REEL_DURATION_MS = 10000

  useEffect(() => {
    if (!isPlaying) return

    timerRef.current = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 100
        const normalized = next % REEL_DURATION_MS
        const sceneDuration = REEL_DURATION_MS / DEMO_SCENES.length
        const sceneIndex = Math.floor(normalized / sceneDuration)

        setActiveScene(sceneIndex)
        setActiveStep(sceneIndex)
        setProgress((normalized / REEL_DURATION_MS) * 100)
        return normalized
      })
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, REEL_DURATION_MS])

  useEffect(() => {
    const tryAutoPlayMusic = async () => {
      if (!audioRef.current) return
      try {
        audioRef.current.volume = 0.25
        audioRef.current.currentTime = elapsedMs / 1000
        await audioRef.current.play()
        setIsMusicOn(true)
        setMusicBlocked(false)
      } catch (error) {
        setIsMusicOn(false)
        setMusicBlocked(true)
      }
    }

    tryAutoPlayMusic()
  }, [])

  useEffect(() => {
    if (!musicBlocked) return

    const unlockMusic = async () => {
      if (!audioRef.current) return
      try {
        audioRef.current.volume = 0.25
        audioRef.current.currentTime = elapsedMs / 1000
        await audioRef.current.play()
        setIsMusicOn(true)
        setMusicBlocked(false)
      } catch (error) {
        setIsMusicOn(false)
      }
    }

    window.addEventListener('pointerdown', unlockMusic, { once: true })
    return () => window.removeEventListener('pointerdown', unlockMusic)
  }, [musicBlocked, elapsedMs])

  const syncMusicWithReel = async (shouldPlay: boolean) => {
    if (!audioRef.current) return
    if (!shouldPlay) {
      audioRef.current.pause()
      setIsMusicOn(false)
      return
    }

    try {
      audioRef.current.volume = 0.25
      audioRef.current.currentTime = elapsedMs / 1000
      await audioRef.current.play()
      setIsMusicOn(true)
    } catch (error) {
      setIsMusicOn(false)
    }
  }

  const toggleReelPlayback = async () => {
    const nextPlaying = !isPlaying
    setIsPlaying(nextPlaying)
    await syncMusicWithReel(nextPlaying)
  }

  const toggleBackgroundMusic = async () => {
    if (!audioRef.current) return
    if (isMusicOn) {
      audioRef.current.pause()
      setIsMusicOn(false)
      return
    }
    try {
      audioRef.current.volume = 0.25
      audioRef.current.currentTime = elapsedMs / 1000
      await audioRef.current.play()
      setIsMusicOn(true)
    } catch (error) {
      setIsMusicOn(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100/40 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20 px-4 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-primary-800 via-primary-700 to-cyan-600 text-white p-6 sm:p-10 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">How It Works</h1>
          <p className="mt-3 text-cyan-50 max-w-3xl">
            Navbar se yahan click karte hi aapko website ka complete flow cards + demo video format me samajh aa jata hai.
          </p>
          {musicBlocked && (
            <p className="mt-2 text-xs sm:text-sm text-cyan-100">
              Browser restriction ki wajah se music unlock ke liye screen par 1 click karein.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#demo-video"
              className="px-4 py-2 rounded-full font-semibold bg-slate-900/25 hover:bg-slate-900/35 transition"
            >
              Watch Website Flow Demo
            </a>
            <button
              onClick={toggleBackgroundMusic}
              className="px-4 py-2 rounded-full font-semibold bg-white/20 hover:bg-white/30 transition"
            >
              {isMusicOn ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/95 dark:bg-slate-900 border border-cyan-100 dark:border-slate-700 px-4 py-5 shadow-md"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-2 text-xl font-extrabold text-slate-900 dark:text-slate-100">{item.value}</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white/95 dark:bg-slate-900 border border-cyan-100 dark:border-slate-700 shadow-2xl p-4 sm:p-6 max-w-5xl mx-auto">
          <div className="mb-5 p-4 rounded-xl bg-cyan-50 dark:bg-slate-800 border border-cyan-100 dark:border-slate-700">
            <p className="text-xs uppercase tracking-wide text-primary-700 dark:text-primary-300 font-bold">Current Step</p>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{WORK_STEPS[activeStep]?.title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{WORK_STEPS[activeStep]?.description}</p>
          </div>

          <div id="demo-video" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Website Flow Demo (Custom)</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
            External video remove kar di gayi hai. Ye 10-second joined reel aapki website ke real flow (Login/Signup se checkout tak) ko video-style me autoplay karke show karti hai.
          </p>

          <div className="overflow-hidden rounded-xl border border-cyan-100 dark:border-slate-700 bg-slate-950">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <p className="text-xs sm:text-sm text-cyan-200 font-semibold">Gym Management Walkthrough - 10s Reel</p>
              <span className="text-xs text-slate-300">{activeScene + 1} / {DEMO_SCENES.length}</span>
            </div>

            <div className="h-[260px] sm:h-[340px] md:h-[430px] relative p-5 sm:p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.22),_transparent_55%)]" />
              <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-400/40 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{DEMO_SCENES[activeScene].icon}</span>
                  <span className="text-xs uppercase tracking-widest px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-200">
                    {DEMO_SCENES[activeScene].badge}
                  </span>
                </div>
                <h4 className="mt-4 text-xl sm:text-2xl font-bold text-white">{DEMO_SCENES[activeScene].title}</h4>
                <p className="mt-2 text-slate-300">{DEMO_SCENES[activeScene].subtitle}</p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="rounded-lg bg-slate-800 p-3 text-cyan-100">Action Trigger: User Click</div>
                  <div className="rounded-lg bg-slate-800 p-3 text-cyan-100">Route Update: Live Navigation</div>
                  <div className="rounded-lg bg-slate-800 p-3 text-cyan-100">UI Feedback: Smooth Transition</div>
                  <div className="rounded-lg bg-slate-800 p-3 text-cyan-100">Flow Status: Running</div>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 bg-slate-900 border-t border-slate-700">
              <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-100" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <button
                  onClick={toggleReelPlayback}
                  className="px-3 py-1.5 text-sm rounded-full bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 transition"
                >
                  {isPlaying ? 'Pause Demo' : 'Play Demo'}
                </button>
                <span className="text-xs text-slate-300">Auto flow running...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white/95 dark:bg-slate-900 border border-cyan-100 dark:border-slate-700 shadow-xl p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">Quick FAQ</h3>
          <div className="mt-4 space-y-3">
            <details className="group rounded-xl border border-cyan-100 dark:border-slate-700 p-4">
              <summary className="cursor-pointer font-semibold text-slate-800 dark:text-slate-100">
                Kya user ko account banana zaroori hai?
              </summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Nahi, demo login se bhi website ka full flow check kiya ja sakta hai.</p>
            </details>
            <details className="group rounded-xl border border-cyan-100 dark:border-slate-700 p-4">
              <summary className="cursor-pointer font-semibold text-slate-800 dark:text-slate-100">
                Background music kaise control hoga?
              </summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Hero section me `Play Background Music` button se on/off hoga.
              </p>
            </details>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_962dd8648f.mp3?filename=inspiring-cinematic-ambient-116199.mp3"
        loop
      />
    </section>
  )
}
