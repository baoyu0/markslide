import { Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ErrorDisplayProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  const router = useRouter();

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
      p={8}
    >
      <Text color="red.500" fontSize="lg" mb={4}>
        {message}
      </Text>
      <Button onClick={() => router.back()} colorScheme="blue">
        返回上一页
      </Button>
    </Box>
  );
} 