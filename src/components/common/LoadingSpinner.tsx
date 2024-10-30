import { Box, keyframes } from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function LoadingSpinner() {
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      textAlign="center"
    >
      <Box
        as="div"
        border="4px solid"
        borderColor="gray.200"
        borderTopColor="blue.500"
        borderRadius="50%"
        w="40px"
        h="40px"
        animation={`${spin} 1s linear infinite`}
        mb={4}
      />
      <Box color="gray.500" fontSize="sm">
        加载中...
      </Box>
    </Box>
  );
} 