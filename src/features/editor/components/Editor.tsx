'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, ButtonGroup, IconButton, Tooltip } from '@chakra-ui/react'
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  CodeIcon,
  QuoteIcon,
} from '@/components/icons'

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <Box className="editor">
      <ButtonGroup spacing={2} mb={4}>
        <Tooltip label="加粗">
          <IconButton
            aria-label="Bold"
            icon={<BoldIcon />}
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="斜体">
          <IconButton
            aria-label="Italic"
            icon={<ItalicIcon />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="列表">
          <IconButton
            aria-label="Bullet List"
            icon={<ListIcon />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="代码块">
          <IconButton
            aria-label="Code Block"
            icon={<CodeIcon />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="引用">
          <IconButton
            aria-label="Blockquote"
            icon={<QuoteIcon />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            variant="ghost"
          />
        </Tooltip>
      </ButtonGroup>

      <Box 
        borderWidth={1}
        borderRadius="md"
        p={4}
        minH="400px"
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
} 