'use client';

import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import FileUpload from "@/components/upload/FileUpload";

export default function Home() {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Heading>
            <Text color="gray.600">
              {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
            </Text>
          </Box>
          <FileUpload />
        </VStack>
      </Container>
    </Layout>
  );
}
