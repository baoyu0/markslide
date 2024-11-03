'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES } from '../themes';
import styles from '../styles/preview.module.css';

// 动态导入 Reveal.js 以避免服务端渲染问题
const Reveal = dynamic(() => import('reveal.js'), { ssr: false });

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const { theme, transition } = usePptPreviewStore();
  const themeStyles = PPT_THEMES[theme].styles;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && deckRef.current) {
      const deck = new Reveal(deckRef.current, {
        embedded: true,
        hash: true,
        transition,
        backgroundTransition: 'slide',
        width: '100%',
        height: '100%',
        margin: 0.1,
        minScale: 0.2,
        maxScale: 2.0,
        controls: true,
        progress: true,
        center: false,
        touch: true,
        hideInactiveCursor: true,
        hideCursorTime: 3000,
      });

      deck.initialize();

      return () => {
        deck.destroy();
      };
    }
  }, [isClient, theme, transition, content]);

  if (!isClient) {
    return null; // 或者返回一个加载占位符
  }

  return (
    <Box className={`${styles.container} theme-${theme}`}>
      <div 
        ref={deckRef} 
        className="reveal"
        style={{
          backgroundColor: themeStyles.backgroundColor,
          color: themeStyles.color,
          fontFamily: themeStyles.fontFamily,
        }}
      >
        <div 
          className="slides"
          dangerouslySetInnerHTML={{ 
            __html: content
              .split('\n---\n') // 分割幻灯片
              .map(slide => `<section>${slide}</section>`)
              .join('\n')
          }} 
        />
      </div>
    </Box>
  );
} 