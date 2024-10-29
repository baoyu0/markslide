"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 添加类型定义
type ChakraThemeProps = {
  colorMode: "light" | "dark";
  theme: Record<string, unknown>;
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    dark: {
      bg: "#232731", // 主背景色 - 深蓝灰色
      surface: "#2A2F3C", // 表面色 - 稍浅的深蓝灰色
      border: "#363C4A", // 边框色 - 中等深度的蓝灰色
      hover: "#2F3441", // 悬停色 - 轻微亮一点的深蓝灰色
      text: {
        primary: "#E3E5E8", // 主要文本 - 柔和的白色
        secondary: "#A2A7B3", // 次要文本 - 柔和的灰色
        tertiary: "#767B87", // 第三级文本 - 更深的灰色
      },
    },
    light: {
      bg: "#F8F9FA", // 主背景色 - 柔和的白色
      surface: "#FFFFFF", // 表面色 - 纯白
      border: "#E2E4E8", // 边框色 - 浅灰色
      hover: "#F2F3F5", // 悬停色 - 稍微灰一点的白色
      text: {
        primary: "#1A1D24", // 主要文本 - 深色
        secondary: "#4A5260", // 次要文本 - 灰色
        tertiary: "#767B87", // 第三级文本 - 浅灰色
      },
    },
  },
  styles: {
    global: (props: ChakraThemeProps) => ({
      body: {
        bg: props.colorMode === "light" ? "light.bg" : "dark.bg",
        color:
          props.colorMode === "light"
            ? "light.text.primary"
            : "dark.text.primary",
        transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props: ChakraThemeProps) => ({
        _hover: {
          bg: props.colorMode === "light" ? "light.hover" : "dark.hover",
        },
        transition: "all 0.2s ease-in-out",
      }),
    },
    Menu: {
      baseStyle: (props: ChakraThemeProps) => ({
        list: {
          bg: props.colorMode === "light" ? "light.surface" : "dark.surface",
          borderColor:
            props.colorMode === "light" ? "light.border" : "dark.border",
          boxShadow:
            props.colorMode === "light"
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)",
        },
        item: {
          bg: props.colorMode === "light" ? "light.surface" : "dark.surface",
          color:
            props.colorMode === "light"
              ? "light.text.primary"
              : "dark.text.primary",
          _hover: {
            bg: props.colorMode === "light" ? "light.hover" : "dark.hover",
          },
          _focus: {
            bg: props.colorMode === "light" ? "light.hover" : "dark.hover",
          },
        },
      }),
    },
    Tabs: {
      baseStyle: (props: ChakraThemeProps) => ({
        tab: {
          color:
            props.colorMode === "light"
              ? "light.text.secondary"
              : "dark.text.secondary",
          _selected: {
            color: props.colorMode === "light" ? "blue.600" : "blue.200",
          },
        },
      }),
    },
    Card: {
      baseStyle: (props: ChakraThemeProps) => ({
        container: {
          bg: props.colorMode === "light" ? "light.surface" : "dark.surface",
          borderColor:
            props.colorMode === "light" ? "light.border" : "dark.border",
        },
      }),
    },
  },
  semanticTokens: {
    colors: {
      "chakra-body-bg": {
        _light: "light.bg",
        _dark: "dark.bg",
      },
      "chakra-body-text": {
        _light: "light.text.primary",
        _dark: "dark.text.primary",
      },
      "chakra-border-color": {
        _light: "light.border",
        _dark: "dark.border",
      },
      "chakra-placeholder-color": {
        _light: "light.text.tertiary",
        _dark: "dark.text.tertiary",
      },
    },
  },
});

export default theme;
