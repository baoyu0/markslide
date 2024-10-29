'use client';

import { Box, Container, Flex, Button, useColorMode } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" bg={colorMode === 'light' ? 'white' : 'gray.800'} shadow="sm">
      <Container maxW="container.xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Link href="/" passHref>
            <Box fontSize="xl" fontWeight="bold" cursor="pointer">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Box>
          </Link>

          <Flex gap={4}>
            <Button
              variant="ghost"
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
            >
              <FontAwesomeIcon 
                icon={colorMode === "light" ? faMoon : faSun} 
                size="lg"
              />
            </Button>
            
            <Link 
              href="https://github.com/yourusername/markslide" 
              target="_blank"
              passHref
            >
              <Button variant="ghost" aria-label="GitHub repository">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 