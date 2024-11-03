'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES } from '../themes';
import styles from '../styles/preview.module.css';
import Toolbar from './Toolbar';
import SpeakerNotes from './SpeakerNotes';
import SlideOverview from './SlideOverview';
import { processContent, formatSlideContent, extractSlideNotes } from '../utils/content'

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
  const deckRef = useRef<HTMLDivElement>(null);
  const { theme, transition, fontSize } = usePptPreviewStore();
  const themeStyles = PPT_THEMES[theme].styles;
  const [isClient, setIsClient] = useState(false);
  const [deck, setDeck] = useState<any>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);
  const [slides, setSlides] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let instance: any = null;

    const initReveal = async () => {
      try {
        setIsLoading(true);
        if (isClient && deckRef.current && Reveal) {
          instance = new Reveal(deckRef.current, {
            embedded: false,
            hash: true,
            transition,
            backgroundTransition: 'fade',
            width: 1200,
            height: 800,
            margin: 0.15,
            minScale: 0.2,
            maxScale: 2.0,
            controls: true,
            progress: true,
            center: true,
            touch: {
              swipe: true,
              passive: true
            },
            hideInactiveCursor: true,
            hideCursorTime: 3000,
            slideNumber: true,
            keyboard: true,
            overview: true,
            fragments: true,
            fragmentInURL: true,
            help: true,
            mouseWheel: true,
            previewLinks: true,
            autoPlayMedia: true,
            autoSlide: 0,
            loop: false,
            rtl: false,
            navigationMode: 'linear',
            shuffle: false,
            showNotes: false,
            preloadIframes: true,
            autoAnimate: true,
            controlsTutorial: true,
            controlsLayout: 'bottom-right',
            controlsBackArrows: 'faded',
            parallaxBackgroundImage: '',
            parallaxBackgroundSize: '',
            parallaxBackgroundHorizontal: 200,
            parallaxBackgroundVertical: 50,
            display: 'flex',
          });

          await instance.initialize();
          setDeck(instance);
        }
      } catch (err) {
        setError('初始化 PPT 预览失败，请刷新页面重试');
        console.error('Failed to initialize Reveal:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initReveal();

    return () => {
      if (instance?.destroy) {
        instance.destroy();
      }
    };
  }, [isClient, theme, transition, content]);

  // 当主题或过渡效果改变时，同步更新
  useEffect(() => {
    if (deck) {
      deck.configure({
        transition,
        backgroundTransition: 'fade',
        touch: {
          swipe: true,
          passive: true
        }
      });
      deck.sync();
    }
  }, [deck, theme, transition]);

  const memoizedContent = useMemo(() => {
    const processedSlides = processContent(content)
    setNotes(extractSlideNotes(processedSlides))
    return formatSlideContent(processedSlides)
  }, [content])

  const handleSlideChange = useCallback((event: any) => {
    setCurrentSlide(event.indexh);
  }, []);

  useEffect(() => {
    if (deck) {
      deck.on('slidechanged', handleSlideChange);
      return () => deck.off('slidechanged', handleSlideChange);
    }
  }, [deck, handleSlideChange]);

  useEffect(() => {
    // 解析幻灯片内容和注释
    const slideContent = content.split('\n---\n')
    const slideHtml = slideContent.map(slide => {
      const [content, note] = slide.split('\n???\n')
      if (note) {
        setNotes(prev => [...prev, note.trim()])
      }
      return content
    })
    setSlides(slideHtml)
  }, [content])

  if (error) {
    return (
      <Box p={4} textAlign="center" color="red.500">
        <Text>{error}</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>加载中...</Text>
      </Box>
    );
  }

  if (!isClient) {
    return null;
  }

  return (
    <Box role="region" aria-label="PPT 预览">
      <Toolbar 
        fileId={fileId} 
        fileName={fileName} 
        content={content}
        onShowNotes={() => setShowNotes(true)}
        onShowOverview={() => setShowOverview(true)}
        aria-label="PPT 工具栏"
      />
      
      <Box 
        className={`${styles.container} theme-${theme}`}
        sx={{
          fontSize,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
        role="document"
        aria-label="PPT 内容"
      >
        <div 
          ref={deckRef} 
          className={styles.reveal}
          style={{
            backgroundColor: themeStyles.backgroundColor,
            color: themeStyles.color,
            fontFamily: themeStyles.fontFamily,
          }}
        >
          <div 
            className="slides"
            dangerouslySetInnerHTML={{ 
              __html: memoizedContent
            }} 
          />
        </div>
      </Box>

      <SpeakerNotes
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        notes={notes}
        currentSlide={currentSlide}
      />

      <SlideOverview
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        slides={slides}
        currentSlide={currentSlide}
        onSlideSelect={(index) => {
          deck?.slide(index)
        }}
      />
    </Box>
  );
} 