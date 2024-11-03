'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Box, Text, Spinner, useToast } from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES } from '../themes';
import styles from '../styles/preview.module.css';
import Toolbar from './Toolbar';
import SpeakerNotes from './SpeakerNotes';
import SlideOverview from './SlideOverview';
import { processContent, formatSlideContent, extractSlideNotes } from '../utils/content';

// 动态导入 Reveal.js
let Reveal: any = null;
if (typeof window !== 'undefined') {
  import('reveal.js').then((module) => {
    Reveal = module.default;
  });
}

interface PreviewProps {
  content: string;
  fileId: string;
  fileName: string;
}

export default function Preview({ content, fileId, fileName }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<string[]>([]);
  const { theme } = usePptPreviewStore();
  const toast = useToast();

  const memoizedContent = useMemo(async () => {
    try {
      const processedSlides = processContent(content);
      setNotes(extractSlideNotes(processedSlides));
      return await formatSlideContent(processedSlides);
    } catch (error) {
      toast({
        title: '内容处理失败',
        description: error instanceof Error ? error.message : '未知错误',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return '';
    }
  }, [content, toast]);

  const initializeReveal = useCallback(() => {
    if (!containerRef.current || !Reveal) return;

    revealRef.current = new Reveal(containerRef.current, {
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
      theme: PPT_THEMES[theme],
      plugins: []  // 根据需要添加插件
    });

    revealRef.current.initialize().then(() => {
      setIsLoading(false);
    });
  }, [theme]);

  useEffect(() => {
    initializeReveal();
    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
      }
    };
  }, [initializeReveal, memoizedContent]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Toolbar />
      
      <Box className={styles.content}>
        <div 
          ref={containerRef}
          className="reveal"
          dangerouslySetInnerHTML={{
            __html: memoizedContent
          }}
        />
      </Box>

      <SpeakerNotes notes={notes} />
      <SlideOverview />
    </Box>
  );
} 