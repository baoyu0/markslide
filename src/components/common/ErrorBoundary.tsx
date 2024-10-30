"use client";

import { Component, ReactNode } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box p={4} textAlign="center">
          <Text color="red.500" mb={4}>发生错误: {this.state.error?.message}</Text>
          <Button
            onClick={() => window.location.reload()}
            colorScheme="blue"
          >
            重新加载
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
} 