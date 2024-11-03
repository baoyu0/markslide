import { Metadata } from 'next'
import { Providers } from './providers'
import { inter, firaCode } from './fonts'

export const metadata: Metadata = {
  title: 'Markslide',
  description: '一个文档转换和预览工具',
  icons: {
    icon: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="zh-CN" 
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
