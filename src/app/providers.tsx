"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/config/theme";
import StoreInitializer from "@/components/providers/StoreInitializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <StoreInitializer />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
