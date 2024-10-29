"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { colorMode } = useColorMode();
  const isPreviewPage = pathname === "/preview";

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "light.bg" : "dark.bg"}
      transition="background-color 0.2s ease-in-out"
    >
      {!isPreviewPage && <Navbar />}
      <Box as="main" px={isPreviewPage ? 0 : 4} py={isPreviewPage ? 0 : 8}>
        {children}
      </Box>
    </Box>
  );
}
