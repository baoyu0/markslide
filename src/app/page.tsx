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
  Button,
  HStack,
  Fade,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMarkdown } from "@fortawesome/free-brands-svg-icons";
import {
  faEllipsisV,
  faEye,
  faDownload,
  faEdit,
  faTrash,
  faFile,
  faFilePowerpoint,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import FileUpload from "@/components/upload/FileUpload";
import { ENV_CONFIG } from "@/config/env";
import { motion } from "framer-motion";
import { useFileStore } from "@/store/useFileStore";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatFileSize, formatDate } from "@/utils/format";
import { usePreviewStore } from "@/store/usePreviewStore";

const MotionBox = motion(Box);

// 添加排序类型
type SortField = "name" | "size" | "createdAt";
type SortOrder = "asc" | "desc";

export default function Home() {
  const { colorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState(0);
  const store = useFileStore();
  const { setCurrentFile, setPreviewType } = usePreviewStore();

  const [isVisible, setIsVisible] = useState(true);

  // 添加搜索和排序状态
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 150);
  }, []);

  const openGitHub = useCallback(() => {
    window.open(ENV_CONFIG.app.github, "_blank", "noopener,noreferrer");
  }, []);

  const openDocs = useCallback(() => {
    window.open(ENV_CONFIG.app.docs, "_blank", "noopener,noreferrer");
  }, []);

  const handlePreview = useCallback(
    (fileId: string, type: "markdown" | "html" | "ppt") => {
      setCurrentFile(fileId);
      setPreviewType(type);
      window.open(`/preview?fileId=${fileId}&type=${type}`, "_blank");
    },
    [setCurrentFile, setPreviewType],
  );

  const handleEdit = useCallback((fileId: string) => {
    console.log("编辑文件:", fileId);
  }, []);

  const handleDownload = useCallback((fileId: string) => {
    console.log("下载文件:", fileId);
  }, []);

  const handleDelete = useCallback(
    async (fileId: string) => {
      try {
        await store.removeFile(fileId);
      } catch (error) {
        console.error("删除文件失败:", error);
      }
    },
    [store],
  );

  // 使用 useMemo 优化文件列表过滤和排序
  const filteredAndSortedFiles = useMemo(() => {
    if (!store.files) return [];

    return [...store.files]
      .filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        switch (sortField) {
          case "name":
            return order * a.name.localeCompare(b.name);
          case "size":
            return order * (a.size - b.size);
          case "createdAt":
            return (
              order *
              (new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime())
            );
          default:
            return 0;
        }
      });
  }, [store.files, searchTerm, sortField, sortOrder]);

  // 使用 useCallback 优化排序处理函数
  const handleSort = useCallback((field: SortField) => {
    setSortField((currentField) => {
      if (currentField === field) {
        setSortOrder((currentOrder) =>
          currentOrder === "asc" ? "desc" : "asc",
        );
        return field;
      }
      setSortOrder("asc");
      return field;
    });
  }, []);

  // 修改文件列表渲染部分
  const fileList = useMemo(() => {
    if (!filteredAndSortedFiles.length) {
      return (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">
            {searchTerm ? "没有找到匹配的文件" : "暂无文件"}
          </Text>
        </Box>
      );
    }

    return (
      <Box
        overflowX="auto"
        bg={colorMode === "light" ? "white" : "gray.800"}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Box p={4}>
          <InputGroup size="sm" maxW="300px" mb={4}>
            <InputLeftElement pointerEvents="none">
              <FontAwesomeIcon
                icon={faSearch}
                color={colorMode === "light" ? "#718096" : "#A0AEC0"}
              />
            </InputLeftElement>
            <Input
              placeholder="搜索文件..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="md"
            />
            {searchTerm && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<FontAwesomeIcon icon={faTimes} />}
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearchTerm("")}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort("name")} cursor="pointer">
                文件名
              </Th>
              <Th onClick={() => handleSort("size")} cursor="pointer">
                大小
              </Th>
              <Th onClick={() => handleSort("createdAt")} cursor="pointer">
                上传时间
              </Th>
              <Th textAlign="center">预览</Th>
              <Th textAlign="center">操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAndSortedFiles.map((file) => (
              <Tr
                key={file.id}
                _hover={{
                  bg: colorMode === "light" ? "gray.50" : "gray.700",
                }}
              >
                <Td>{file.name}</Td>
                <Td>{formatFileSize(file.size)}</Td>
                <Td>{formatDate(file.createdAt)}</Td>
                <Td textAlign="center">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FontAwesomeIcon icon={faEye} />}
                      variant="ghost"
                      size="sm"
                      aria-label="Preview options"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faMarkdown} />}
                        onClick={() => handlePreview(file.id, "markdown")}
                      >
                        Markdown 预览
                      </MenuItem>
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faFile} />}
                        onClick={() => handlePreview(file.id, "html")}
                      >
                        HTML 预览
                      </MenuItem>
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faFilePowerpoint} />}
                        onClick={() => handlePreview(file.id, "ppt")}
                      >
                        PPT 预览
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
                <Td textAlign="center">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FontAwesomeIcon icon={faEllipsisV} />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => handleEdit(file.id)}
                      >
                        编辑
                      </MenuItem>
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faDownload} />}
                        onClick={() => handleDownload(file.id)}
                      >
                        下载
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => handleDelete(file.id)}
                        color="red.500"
                      >
                        删除
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }, [
    filteredAndSortedFiles,
    colorMode,
    searchTerm,
    handleDelete,
    handleDownload,
    handleEdit,
    handlePreview,
    handleSort,
  ]);

  if (!store.isInitialized) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="60vh"
          >
            <LoadingSpinner />
          </Box>
        </Container>
      </Layout>
    );
  }

  console.log("Rendering with files:", store.files);

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Heading
              as="h1"
              size="xl"
              mb={4}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              letterSpacing="tight"
            >
              {ENV_CONFIG.app.name}
            </Heading>
            <Text
              color={
                colorMode === "light"
                  ? "light.text.secondary"
                  : "dark.text.secondary"
              }
              fontSize="lg"
              maxW="container.md"
              mx="auto"
            >
              {ENV_CONFIG.app.description}
            </Text>
            <HStack justify="center" mt={4} spacing={4}>
              <Button
                leftIcon={<FontAwesomeIcon icon={faGithub} />}
                onClick={openGitHub}
                variant="outline"
                size="sm"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                }}
                transition="all 0.2s"
              >
                GitHub
              </Button>
              <Button
                leftIcon={<FontAwesomeIcon icon={faMarkdown} />}
                onClick={openDocs}
                variant="outline"
                size="sm"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                }}
                transition="all 0.2s"
              >
                文档
              </Button>
            </HStack>
          </MotionBox>

          <Box
            bg={colorMode === "light" ? "light.surface" : "dark.surface"}
            borderRadius="lg"
            p={6}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "md" }}
          >
            <Tabs
              variant="enclosed"
              onChange={handleTabChange}
              defaultIndex={activeTab}
            >
              <TabList>
                <Tab
                  _selected={{
                    color: "blue.500",
                    borderColor: "blue.500",
                  }}
                >
                  上传文件
                </Tab>
                <Tab
                  _selected={{
                    color: "blue.500",
                    borderColor: "blue.500",
                  }}
                >
                  文件列表
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel p={4}>
                  <Fade in={isVisible}>
                    <FileUpload />
                  </Fade>
                </TabPanel>
                <TabPanel p={4}>
                  <Fade in={isVisible}>{fileList}</Fade>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {ENV_CONFIG.features.enableCloudStorage && (
            <Box
              p={4}
              bg={colorMode === "light" ? "blue.50" : "blue.900"}
              borderRadius="md"
              fontSize="sm"
              color={colorMode === "light" ? "blue.600" : "blue.200"}
            >
              <Text>云存储功能已启用，您的文件将自动同步到云端。</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}
