'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES } from '../themes';
import styles from '../styles/preview.module.css';
import Toolbar from './Toolbar';

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let instance: any = null;

    const initReveal = async () => {
      if (isClient && deckRef.current && Reveal) {
        instance = new Reveal(deckRef.current, {
          embedded: true,
          hash: true,
          transition,
          backgroundTransition: 'fade',
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
          slideNumber: true,
          keyboard: true,
          overview: true,
          fragments: true,
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
        backgroundTransition: 'fade'
      });
      deck.sync();
    }
  }, [deck, theme, transition]);

  if (!isClient) {
    return null;
  }

  return (
    <Box>
      <Toolbar fileId={fileId} fileName={fileName} content={content} />
      
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
    </Box>
  );
} 