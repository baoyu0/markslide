'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box } from '@chakra-ui/react'

interface EditorProps {
  initialContent: string
  onChange: (content: string) => void
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <Box className="editor" p={4} borderWidth="1px" borderRadius="md">
      <EditorContent editor={editor} />
    </Box>
  )
} 