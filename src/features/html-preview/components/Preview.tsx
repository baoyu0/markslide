'use client';

import { Box } from '@chakra-ui/react';
import DOMPurify from 'dompurify';
import { useHtmlPreviewStore } from '../store/store';
import styles from '../styles/preview.module.css';

export default function Preview({ content }: { content: string }) {
  const { theme, layout, zoom } = useHtmlPreviewStore();

  const sanitizedHTML = DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  });

  return (
    <Box 
      className={`${styles.container} ${styles[layout]} ${styles[theme]}`}
      style={{ zoom: zoom }}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
} 