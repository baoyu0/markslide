"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import "reveal.js/dist/theme/black.css";

interface PPTPreviewProps {
  content: string;
  className?: string;
}

export default function PPTPreview({ content, className }: PPTPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (containerRef.current) {
      // 初始化 Reveal
      const deck = new Reveal(containerRef.current, {
        embedded: true,
        controls: true,
        progress: true,
        center: true,
        hash: true,
        transition: "slide",
      });

      // 存储实例引用
      deckRef.current = deck;

      // 初始化
      deck.initialize().then(() => {
        // 初始化完成后的操作（如果需要）
      });
    }

    // 清理函数
    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (error) {
        console.warn("清理 Reveal 实例时出错:", error);
      }
    };
  }, [content, colorMode]);

  return (
    <Box className={className} ref={containerRef}>
      <div className="reveal">
        <div className="slides" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Box>
  );
}
