'use client';

import { useEffect, useState } from 'react';
import { Box, Link, VStack } from '@chakra-ui/react';
import styles from '../styles/toc.module.css';
import { logger } from '@/utils/logger';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  content?: string;
  generateTocItems?: (content: string) => TOCItem[];
}

export default function TableOfContents({ 
  items: propItems, 
  content,
  generateTocItems 
}: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>(propItems || []);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (content && generateTocItems) {
      const tocItems = generateTocItems(content);
      logger.debug('Generated TOC items:', tocItems);
      setItems(tocItems);
    }
  }, [content, generateTocItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logger.debug('Heading in view:', entry.target.id);
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5
      }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else {
        logger.warn(`Element with id "${id}" not found`);
      }
    });

    return () => {
      logger.debug('Cleaning up intersection observer');
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (id: string) => {
    logger.info('TOC item clicked:', id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setActiveId(id);
      logger.debug('Scrolled to element:', id);
    } else {
      logger.error(`Target element with id "${id}" not found`);
    }
  };

  if (items.length === 0) {
    logger.debug('No TOC items available');
    return null;
  }

  return (
    <VStack align="stretch" spacing={1} className={styles.toc}>
      {items.map((item) => (
        <Link
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`${styles.tocItem} ${activeId === item.id ? styles.active : ''}`}
          style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
        >
          {item.text}
        </Link>
      ))}
    </VStack>
  );
} 