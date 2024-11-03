import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    default: 'Markslide',
    template: '%s | Markslide'
  },
  description: 'A modern document preview and conversion tool',
  keywords: ['markdown', 'html', 'ppt', 'preview', 'converter'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a202c' }
  ],
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json'
} 