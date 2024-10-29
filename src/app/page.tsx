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
} from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import FileUpload from "@/components/upload/FileUpload";
import FileList from "@/components/file/FileList";

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

          <Tabs variant="enclosed">
            <TabList>
              <Tab>上传文件</Tab>
              <Tab>文件列表</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} pt={4}>
                <FileUpload />
              </TabPanel>
              <TabPanel p={0} pt={4}>
                <FileList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Layout>
  );
}
