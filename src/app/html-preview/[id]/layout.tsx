import type { Metadata } from 'next'
import { siteMetadata } from '@/app/metadata'

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'HTML 预览',
  description: '使用 Markslide 预览 HTML 文件',
}

export default function HtmlPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 