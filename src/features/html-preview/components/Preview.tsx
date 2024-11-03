'use client';

import { Box } from '@chakra-ui/react';
import DOMPurify from 'dompurify';
import { useHtmlPreviewStore } from '../store/store';
import { HTML_THEMES } from '../themes';
import styles from '../styles/preview.module.css';
import Toolbar from './Toolbar';

interface PreviewProps {
  content: string;
  fileId: string;
  fileName: string;
}

export default function Preview({ content, fileId, fileName }: PreviewProps) {
  const { theme, fontSize, lineHeight } = useHtmlPreviewStore();
  const themeStyles = HTML_THEMES[theme].styles;

  const clean = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['style'],
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  });

  return (
    <Box>
      <Toolbar fileId={fileId} fileName={fileName} content={content} />
      
      <Box 
        className={styles.preview}
        sx={{
          ...themeStyles,
          fontSize,
          lineHeight,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </Box>
  );
} 