import { Icon } from '@chakra-ui/react'
import type { IconProps } from '@chakra-ui/react'
import { 
  FaEye, 
  FaTrash, 
  FaEdit, 
  FaMarkdown, 
  FaHtml5, 
  FaFilePowerpoint 
} from 'react-icons/fa'

export const EyeIcon = (props: IconProps) => (
  <Icon as={FaEye} {...props} />
)

export const DeleteIcon = (props: IconProps) => (
  <Icon as={FaTrash} {...props} />
)

export const MarkdownIcon = (props: IconProps) => (
  <Icon as={FaMarkdown} {...props} />
)

export const HtmlIcon = (props: IconProps) => (
  <Icon as={FaHtml5} {...props} />
)

export const PptIcon = (props: IconProps) => (
  <Icon as={FaFilePowerpoint} {...props} />
)

export const EditIcon = (props: IconProps) => (
  <Icon as={FaEdit} {...props} />
) 