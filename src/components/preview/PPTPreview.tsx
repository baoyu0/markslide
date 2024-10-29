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
  const { colorMode } = useColorMode();

  useEffect(() => {
    let deck: Reveal.Api | null = null;

    if (containerRef.current) {
      deck = new Reveal(containerRef.current, {
        embedded: true,
        controls: true,
        progress: true,
        center: true,
        hash: false,
        theme: colorMode === "light" ? "white" : "black",
      });
      deck.initialize();
    }

    return () => {
      if (deck && typeof deck.destroy === "function") {
        deck.destroy();
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
