import { Box, Link, Text, useColorMode } from "@chakra-ui/react";
import { useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  onItemClick?: () => void;
}

export default function TableOfContents({
  items,
  activeId,
  onItemClick,
}: TableOfContentsProps) {
  const { colorMode } = useColorMode();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", `#${id}`);
        onItemClick?.();
      }
    },
    [onItemClick],
  );

  console.log("渲染目录项:", items);

  return (
    <Box as="nav" fontSize="sm">
      <Text
        fontWeight="bold"
        mb={4}
        color={colorMode === "light" ? "gray.700" : "gray.300"}
      >
        目录
      </Text>
      <Box>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            display="block"
            pl={(item.level - 1) * 4}
            py={1}
            color={item.id === activeId ? "blue.500" : undefined}
            _hover={{
              color: colorMode === "light" ? "blue.500" : "blue.300",
              textDecoration: "none",
              bg: colorMode === "light" ? "gray.100" : "gray.700",
            }}
            fontSize={item.level === 1 ? "md" : "sm"}
            fontWeight={item.level === 1 ? "medium" : "normal"}
            borderRadius="md"
            transition="all 0.2s"
            onClick={(e) => {
              console.log("点击链接:", item.text);
              handleClick(e, item.id);
            }}
          >
            {item.text}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
