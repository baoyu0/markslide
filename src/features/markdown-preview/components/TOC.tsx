'use client'

import { useEffect, useState } from 'react'
import { Box, Link, VStack } from '@chakra-ui/react'
import styles from '../styles/toc.module.css'

interface TOCHeading {
  id: string
  text: string
  level: number
}

interface TOCProps {
  headings: TOCHeading[]
}

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <VStack align="stretch" spacing={1} className={styles.toc}>
      {headings.map((heading) => (
        <Link
          key={heading.id}
          href={`#${heading.id}`}
          className={`${styles.tocItem} ${activeId === heading.id ? styles.active : ''}`}
          style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
        >
          {heading.text}
        </Link>
      ))}
    </VStack>
  )
} 