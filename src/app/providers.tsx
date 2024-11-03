"use client";

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { theme } from '@/config/theme'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ICONS } from '@/config/icons'

// 防止图标闪烁
config.autoAddCss = false

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 在客户端初始化图标库
    library.add(...Object.values(ICONS))
  }, [])

  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
