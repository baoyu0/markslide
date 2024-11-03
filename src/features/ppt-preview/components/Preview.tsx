'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES } from '../themes';
import styles from '../styles/preview.module.css';
import Toolbar from './Toolbar';
import SpeakerNotes from './SpeakerNotes';
import SlideOverview from './SlideOverview';

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let instance: any = null;

    const initReveal = async () => {
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

        try {
          await instance.initialize();
          setDeck(instance);
        } catch (error) {
          console.error('Failed to initialize Reveal:', error);
        }
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

  useEffect(() => {
    if (deck) {
      deck.on('slidechanged', (event: any) => {
        setCurrentSlide(event.indexh)
      })
    }
  }, [deck])

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

  if (!isClient) {
    return null;
  }

  return (
    <Box>
      <Toolbar 
        fileId={fileId} 
        fileName={fileName} 
        content={content}
        onShowNotes={() => setShowNotes(true)}
        onShowOverview={() => setShowOverview(true)}
      />
      
      <Box 
        className={`${styles.container} theme-${theme}`}
        sx={{
          fontSize,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
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
              __html: content
                .split('\n---\n')
                .map(slide => `<section>${slide}</section>`)
                .join('\n')
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