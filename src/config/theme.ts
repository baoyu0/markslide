import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  colors: {
    light: {
      surface: "white",
      text: {
        primary: "gray.900",
        secondary: "gray.600",
      },
      border: "gray.200",
    },
    dark: {
      surface: "gray.800",
      text: {
        primary: "white",
        secondary: "gray.300",
      },
      border: "gray.700",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: "inherit",
          },
          td: {
            borderColor: "inherit",
          },
        },
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "light" ? "gray.50" : "gray.900",
        color: props.colorMode === "light" ? "gray.900" : "white",
      },
    }),
  },
}); 