import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the base URL for OAuth redirects
 * Uses NEXTAUTH_URL environment variable if available, otherwise falls back to window.location.origin
 */
export function getBaseUrl(): string {
  // In production, use NEXTAUTH_URL if available
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }
  
  // In development or when NEXTAUTH_URL is not set, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Fallback for server-side rendering
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}
