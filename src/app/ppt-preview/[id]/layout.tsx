import type { Metadata } from 'next'
import { siteMetadata } from '@/app/metadata'

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'PPT 预览',
  description: '使用 Markslide 预览 PPT 文件',
}

export default function PptPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 