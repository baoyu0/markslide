import { useToast } from '@chakra-ui/react'

export class PreviewError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'PreviewError'
  }
}

export function usePreviewError() {
  const toast = useToast()

  const handleError = (error: unknown) => {
    if (error instanceof PreviewError) {
      toast({
        title: '预览错误',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.error(`[${error.code}]`, error.details)
    } else {
      toast({
        title: '未知错误',
        description: '预览过程中发生错误，请刷新页面重试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.error(error)
    }
  }

  const handleSuccess = (message: string) => {
    toast({
      title: '成功',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return { handleError, handleSuccess }
} 