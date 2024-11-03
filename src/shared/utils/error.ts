import { useToast } from '@chakra-ui/react'

export function useErrorHandler() {
  const toast = useToast()

  const handleError = (error: unknown, title = "操作失败") => {
    console.error(error)
    toast({
      title,
      description: error instanceof Error ? error.message : "发生未知错误",
      status: "error",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSuccess = (message: string) => {
    toast({
      title: "操作成功",
      description: message,
      status: "success",
      duration: 2000,
    })
  }

  return { handleError, handleSuccess }
} 