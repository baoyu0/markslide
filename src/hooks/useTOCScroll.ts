import { useEffect, useState } from 'react'
import type { TOCItem } from '@/features/toc/components/TableOfContents'
import { logger } from '@/utils/logger'

export function useTOCScroll(items: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    logger.debug('Setting up TOC scroll observer for items:', items)
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logger.debug('Heading intersecting:', entry.target.id)
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5
      }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      } else {
        logger.warn(`Element with id "${id}" not found in useTOCScroll`)
      }
    })

    return () => {
      logger.debug('Cleaning up TOC scroll observer')
      observer.disconnect()
    }
  }, [items])

  const scrollToHeading = (id: string) => {
    logger.info('Scrolling to heading:', id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
      setActiveId(id)
      logger.debug('Scrolled to heading:', id)
    } else {
      logger.error(`Target heading with id "${id}" not found`)
    }
  }

  return { activeId, scrollToHeading }
} 