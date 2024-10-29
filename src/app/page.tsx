"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
} from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import FileUpload from "@/components/upload/FileUpload";
import FileList from "@/components/file/FileList";

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h1"
              size="xl"
              mb={4}
              color={
                colorMode === "light"
                  ? "light.text.primary"
                  : "dark.text.primary"
              }
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Heading>
            <Text
              color={
                colorMode === "light"
                  ? "light.text.secondary"
                  : "dark.text.secondary"
              }
            >
              {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
            </Text>
          </Box>

          <Box
            bg={colorMode === "light" ? "light.surface" : "dark.surface"}
            borderRadius="lg"
            p={6}
            boxShadow="sm"
          >
            <Tabs variant="enclosed">
              <TabList>
                <Tab>上传文件</Tab>
                <Tab>文件列表</Tab>
              </TabList>
              <TabPanels>
                <TabPanel p={4}>
                  <FileUpload />
                </TabPanel>
                <TabPanel p={4}>
                  <FileList />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
}
