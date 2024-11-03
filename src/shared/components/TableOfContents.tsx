'use client';

import { useEffect, useState } from 'react';
import { Box, Link, VStack } from '@chakra-ui/react';
import styles from '../styles/toc.module.css';

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
      setItems(tocItems);
    }
  }, [content, generateTocItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setActiveId(id);
    }
  };

  if (items.length === 0) {
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