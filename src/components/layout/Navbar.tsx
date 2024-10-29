"use client";

import {
  Box,
  Container,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { colorMode, setColorMode } = useColorMode();
  const { mode, setMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 初始化主题
    const initTheme = () => {
      const currentMode = mode;
      if (currentMode === "system") {
        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setColorMode(systemDark ? "dark" : "light");
      } else {
        setColorMode(currentMode);
      }
    };

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (mode === "system") {
        setColorMode(mediaQuery.matches ? "dark" : "light");
      }
    };

    if (mounted) {
      initTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [mode, setColorMode, mounted]);

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    setMode(newMode);
    if (newMode === "system") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setColorMode(systemDark ? "dark" : "light");
    } else {
      setColorMode(newMode);
    }
  };

  // 在客户端渲染之前返回占位图标
  if (!mounted) {
    return (
      <Box
        as="nav"
        bg={colorMode === "light" ? "light.surface" : "dark.surface"}
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "light.border" : "dark.border"}
        transition="all 0.2s ease-in-out"
      >
        <Container maxW="container.xl">
          <Flex h="16" alignItems="center" justifyContent="space-between">
            <Box fontSize="xl" fontWeight="bold">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Box>
            <Flex gap={4} alignItems="center">
              <Button variant="ghost" aria-label="Theme settings">
                <Box w="1em" h="1em" />
              </Button>
              <Button variant="ghost" aria-label="GitHub repository">
                <Box w="1em" h="1em" />
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      as="nav"
      bg={colorMode === "light" ? "light.surface" : "dark.surface"}
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "light.border" : "dark.border"}
      transition="all 0.2s ease-in-out"
    >
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/" passHref>
            <Box
              fontSize="xl"
              fontWeight="bold"
              cursor="pointer"
              color={
                colorMode === "light"
                  ? "light.text.primary"
                  : "dark.text.primary"
              }
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s ease-in-out"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Box>
          </Link>

          <Flex gap={4} alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                aria-label="Theme settings"
                color={
                  colorMode === "light"
                    ? "light.text.primary"
                    : "dark.text.primary"
                }
                _hover={{
                  bg: colorMode === "light" ? "light.hover" : "dark.hover",
                }}
              >
                <FontAwesomeIcon
                  icon={
                    mode === "system"
                      ? faDesktop
                      : mode === "dark"
                        ? faMoon
                        : faSun
                  }
                  size="lg"
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<FontAwesomeIcon icon={faSun} />}
                  onClick={() => handleThemeChange("light")}
                  isActive={mode === "light"}
                >
                  日间模式
                </MenuItem>
                <MenuItem
                  icon={<FontAwesomeIcon icon={faMoon} />}
                  onClick={() => handleThemeChange("dark")}
                  isActive={mode === "dark"}
                >
                  夜间模式
                </MenuItem>
                <MenuItem
                  icon={<FontAwesomeIcon icon={faDesktop} />}
                  onClick={() => handleThemeChange("system")}
                  isActive={mode === "system"}
                >
                  跟随系统
                </MenuItem>
              </MenuList>
            </Menu>

            <Link
              href="https://github.com/baoyu0/markslide"
              target="_blank"
              passHref
            >
              <Button
                variant="ghost"
                aria-label="GitHub repository"
                color={
                  colorMode === "light"
                    ? "light.text.primary"
                    : "dark.text.primary"
                }
                _hover={{
                  bg: colorMode === "light" ? "light.hover" : "dark.hover",
                }}
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
