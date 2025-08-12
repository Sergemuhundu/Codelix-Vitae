import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the base URL for OAuth redirects
 * Uses NEXTAUTH_URL environment variable if available, otherwise falls back to window.location.origin
 * Handles Railway's internal port issue by ensuring we use the public URL
 */
export function getBaseUrl(): string {
  // In production, prioritize NEXTAUTH_URL
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }
  
  // In browser, use window.location.origin but ensure it's not using internal ports
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    // If we're on Railway and the origin contains port 8080, use the public URL
    if (origin.includes(':8080')) {
      return process.env.NEXT_PUBLIC_SITE_URL || 'https://codelix-vitae-production.up.railway.app'
    }
    return origin
  }
  
  // Fallback for server-side rendering
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

/**
 * Debug function to log the current base URL configuration
 * Use this in browser console to troubleshoot OAuth redirects
 */
export function debugBaseUrl() {
  console.log('=== Base URL Debug Info ===')
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL)
  console.log('window.location.origin:', typeof window !== 'undefined' ? window.location.origin : 'N/A (server-side)')
  console.log('getBaseUrl() result:', getBaseUrl())
  console.log('==========================')
}
