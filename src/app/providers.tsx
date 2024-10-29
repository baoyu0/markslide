"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 在客户端初始化时恢复持久化的主题
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme-mode");
      if (savedMode) {
        useThemeStore
          .getState()
          .setMode(savedMode as "light" | "dark" | "system");
      }
    }
  }, []);

  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {!mounted ? (
          <div style={{ visibility: "hidden" }}>{children}</div>
        ) : (
          children
        )}
      </ChakraProvider>
    </CacheProvider>
  );
}
