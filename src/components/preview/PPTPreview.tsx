"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef, useCallback, useMemo } from "react";
import type { RevealInstance, RevealOptions } from "reveal.js";
import Reveal from "reveal.js";
import PreviewToolbar from "./PreviewToolbar";
import { usePPTStore } from "@/stores/pptStore";
import "reveal.js/dist/reveal.css";
// 直接导入所有主题
import "reveal.js/dist/theme/black.css";
import "reveal.js/dist/theme/white.css";
import "reveal.js/dist/theme/league.css";
import "reveal.js/dist/theme/beige.css";
import "reveal.js/dist/theme/sky.css";
import "reveal.js/dist/theme/night.css";
import "reveal.js/dist/theme/serif.css";
import "reveal.js/dist/theme/simple.css";
import "reveal.js/dist/theme/solarized.css";
import "reveal.js/dist/theme/blood.css";
import "reveal.js/dist/theme/moon.css";
import { RevealStyles } from "./RevealStyles";
import { convertMarkdownToPPT } from "@/utils/converters";
import { PPT_THEMES } from "@/config/preview-themes";

interface PPTPreviewProps {
  content: string;
  className?: string;
}

// 预加载字体
const preloadFonts = () => {
  const fonts = [
    "/static/fonts/league-gothic.woff",
    "/static/fonts/league-gothic.woff2",
  ];

  fonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.href = font;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// 定义类型
type ThrottleFunction = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
) => T;

// 节流函数
const throttle: ThrottleFunction = (func, limit) => {
  let inThrottle = false;
  return function (this: unknown, ...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as typeof func;
};

// 定义 Reveal 事件类型
interface RevealSlideEvent extends CustomEvent {
  detail: {
    indexh: number;
    indexv?: number;
    previousSlide?: HTMLElement;
    currentSlide: HTMLElement;
  };
}

export default function PPTPreview({ content, className }: PPTPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<RevealInstance | null>(null);
  const { colorMode } = useColorMode();

  const {
    currentTheme,
    isFullscreen,
    currentSlide,
    isOverview,
    transition,
    setTheme,
    setFullscreen,
    setCurrentSlide,
    setTotalSlides,
    setOverview,
  } = usePPTStore();

  // 优化处理窗口大小变化
  const handleResize = useCallback(() => {
    if (containerRef.current && deckRef.current) {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      requestAnimationFrame(() => {
        deckRef.current?.configure({
          width,
          height,
          margin: 0.04,
        });
      });
    }
  }, []);

  // 使用节流的 resize 处理函数
  const throttledResize = useMemo(
    () => throttle(handleResize, 100),
    [handleResize],
  );

  // 初始化 Reveal.js
  useEffect(() => {
    // 预加载字体
    preloadFonts();

    const initReveal = async () => {
      if (!containerRef.current) return;

      try {
        // 转换 Markdown 为 PPT HTML
        const pptContent = convertMarkdownToPPT(content);

        // 更新容器内容
        if (containerRef.current) {
          const slidesContainer = containerRef.current.querySelector(".slides");
          if (slidesContainer) {
            slidesContainer.innerHTML = pptContent;
          }
        }

        const config: RevealOptions = {
          embedded: true,
          controls: true,
          controlsLayout: "edges",
          progress: true,
          center: true,
          hash: false,
          transition,
          slideNumber: true,
          overview: isOverview,
          width: 1280,
          height: 720,
          margin: 0.04,
          minScale: 0.2,
          maxScale: 2.0,
          touch: true,
          cursorHideTimeout: 3000,
          hideCursor: true,
          theme: String(currentTheme),
          history: false,
          fragments: true,
          fragmentInURL: false,
          autoSlide: 0,
          autoSlideStoppable: true,
          defaultTiming: 120,
          mouseWheel: false,
          previewLinks: false,
          postMessage: false,
          dependencies: [],
          keyboard: true,
        };

        // 使用 RAF 优化动画
        requestAnimationFrame(() => {
          const deck = new Reveal(containerRef.current!, config);
          deck.initialize().then(() => {
            deckRef.current = deck;
            handleResize();

            deck.addEventListener("slidechanged", (event: RevealSlideEvent) => {
              setCurrentSlide(event.detail.indexh);
            });

            deck.addEventListener("ready", () => {
              if (deckRef.current) {
                setTotalSlides(deckRef.current.getTotalSlides());
                handleResize();
              }
            });
          });
        });
      } catch (error) {
        console.error("初始化 Reveal.js 失败:", error);
      }
    };

    // 延迟初始化以避免性能问题
    const initTimeout = setTimeout(initReveal, 0);

    // 添加 resize 监听
    window.addEventListener("resize", throttledResize, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      if (deckRef.current) {
        deckRef.current.destroy();
      }
      window.removeEventListener("resize", throttledResize);
    };
  }, [
    content,
    currentTheme,
    transition,
    isOverview,
    handleResize,
    throttledResize,
    setCurrentSlide,
    setTotalSlides,
  ]);

  // 幻灯片控制
  const handlePrevSlide = useCallback(() => {
    requestAnimationFrame(() => {
      deckRef.current?.prev();
    });
  }, []);

  const handleNextSlide = useCallback(() => {
    requestAnimationFrame(() => {
      deckRef.current?.next();
    });
  }, []);

  const handleOverview = useCallback(() => {
    setOverview(!isOverview);
    requestAnimationFrame(() => {
      deckRef.current?.toggleOverview();
    });
  }, [isOverview, setOverview]);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(!isFullscreen);
    // 全屏切换后需要重新计算缩放
    setTimeout(handleResize, 100);
  }, [isFullscreen, setFullscreen, handleResize]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      className="ppt-preview-container"
    >
      <PreviewToolbar
        theme={String(currentTheme)}
        previewType="ppt"
        isFullscreenMode={isFullscreen}
        onThemeChange={(theme) => setTheme(theme as keyof typeof PPT_THEMES)}
        onFullscreenChange={handleFullscreenChange}
        onPrint={() => window.print()}
        onDownload={() => {}}
        onShare={() => {}}
        onCopy={() => navigator.clipboard.writeText(content)}
        isPPTMode={true}
        onPrevSlide={handlePrevSlide}
        onNextSlide={handleNextSlide}
        onOverview={handleOverview}
        currentSlide={currentSlide}
      />

      <Box
        ref={containerRef}
        flex="1"
        position="relative"
        overflow="hidden"
        className={`reveal-container ${className || ""}`}
      >
        <div className="reveal">
          <div className="slides"></div>
        </div>
      </Box>

      <RevealStyles colorMode={colorMode} />
    </Box>
  );
}
