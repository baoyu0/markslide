"use client";

import { Box, ButtonGroup, Button, useColorMode } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMarkdown,
  faCode,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

interface PreviewSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

export default function PreviewSelector({
  currentType,
  onTypeChange,
}: PreviewSelectorProps) {
  const { colorMode } = useColorMode();

  return (
    <Box mb={4}>
      <ButtonGroup isAttached variant="outline" size="sm">
        <Button
          leftIcon={<FontAwesomeIcon icon={faMarkdown} />}
          isActive={currentType === "markdown"}
          onClick={() => onTypeChange("markdown")}
          bg={
            currentType === "markdown"
              ? colorMode === "light"
                ? "gray.100"
                : "gray.700"
              : undefined
          }
        >
          Markdown
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faCode} />}
          isActive={currentType === "html"}
          onClick={() => onTypeChange("html")}
          bg={
            currentType === "html"
              ? colorMode === "light"
                ? "gray.100"
                : "gray.700"
              : undefined
          }
        >
          HTML
        </Button>
        <Button
          leftIcon={<FontAwesomeIcon icon={faDesktop} />}
          isActive={currentType === "ppt"}
          onClick={() => onTypeChange("ppt")}
          bg={
            currentType === "ppt"
              ? colorMode === "light"
                ? "gray.100"
                : "gray.700"
              : undefined
          }
        >
          PPT
        </Button>
      </ButtonGroup>
    </Box>
  );
}
