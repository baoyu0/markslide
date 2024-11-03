import { useColorMode } from '@chakra-ui/react';

export function useThemeStyles(theme: any) {
  const { colorMode } = useColorMode();
  return theme.styles[colorMode];
}

export function getThemeValue<T>(
  theme: Record<string, any>,
  path: string,
  defaultValue: T
): T {
  const value = path.split('.').reduce((obj, key) => obj?.[key], theme)
  return (value as T) ?? defaultValue
} 