'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import { usePptPreviewStore } from '../store/store';
import styles from '../styles/preview.module.css';
import type { Transition } from '../themes';

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const { theme, transition } = usePptPreviewStore();

  useEffect(() => {
    if (deckRef.current) {
      const deck = new Reveal(deckRef.current, {
        embedded: true,
        hash: true,
        transition: transition as Transition,
        backgroundTransition: 'slide'
      });
      deck.initialize();

      return () => {
        deck.destroy();
      };
    }
  }, [theme, transition, content]);

  return (
    <Box className={styles.container}>
      <div ref={deckRef} className="reveal">
        <div className="slides" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Box>
  );
} 