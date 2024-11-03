import type { Metadata } from 'next'
import { siteMetadata } from '@/app/metadata'

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Markdown Preview'
}

export default function MarkdownPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 