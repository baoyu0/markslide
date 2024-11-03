import { extendTheme } from '@chakra-ui/react'
import type { ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  fonts: {
    heading: "'Microsoft YaHei', 'SimSun', sans-serif",
    body: "'Microsoft YaHei', 'SimSun', sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
    }),
  },
}) 