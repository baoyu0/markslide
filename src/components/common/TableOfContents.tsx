"use client";

import { Box, Link, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TableOfContentsItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function TableOfContents({
  items,
  activeId,
  onItemClick,
}: TableOfContentsProps) {
  const validItems = useMemo(() => {
    return items ?? [];
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      console.log("TableOfContents 点击:", { id, activeId });
      onItemClick?.(id);
    },
    [onItemClick, activeId],
  );

  if (!validItems.length) {
    return (
      <Box p={4}>
        <Text color="gray.500" fontSize="sm">
          暂无目录
        </Text>
      </Box>
    );
  }

  return (
    <Box as="nav" fontSize="sm">
      {validItems.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}`}
          display="block"
          pl={(item.level - 1) * 4}
          py={1}
          px={2}
          color={item.id === activeId ? "blue.500" : undefined}
          bg={item.id === activeId ? "blue.50" : undefined}
          _hover={{
            color: "blue.500",
            textDecoration: "none",
            bg: "gray.50",
          }}
          fontSize={item.level === 1 ? "md" : "sm"}
          fontWeight={item.level === 1 ? "medium" : "normal"}
          borderRadius="md"
          transition="all 0.2s"
          onClick={(e) => handleClick(e, item.id)}
        >
          {item.text}
        </Link>
      ))}
    </Box>
  );
}
