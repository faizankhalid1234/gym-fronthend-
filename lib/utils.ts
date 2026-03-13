const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gym-backend-ten-psi.vercel.app/api'
const BACKEND_BASE = API_URL.replace(/\/api\/?$/, '')

export function getImageUrl(image: string | undefined | null): string {
  if (!image) return ''
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  const path = image.startsWith('/') ? image : `/${image}`
  return `${BACKEND_BASE}${path}`
}
