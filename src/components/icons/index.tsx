'use client'

import { Icon } from '@chakra-ui/react'
import type { IconProps } from '@chakra-ui/react'
import { 
  FaEye, 
  FaEdit,
  FaTrash, 
  FaDownload,
  FaMarkdown, 
  FaHtml5, 
  FaFilePowerpoint,
  FaGithub,
  FaBold,
  FaItalic,
  FaList,
  FaCode,
  FaQuoteRight,
  FaSave,
  FaPlus,
  FaTags,
} from 'react-icons/fa'

export const EyeIcon = (props: IconProps) => <Icon as={FaEye} {...props} />
export const EditIcon = (props: IconProps) => <Icon as={FaEdit} {...props} />
export const DeleteIcon = (props: IconProps) => <Icon as={FaTrash} {...props} />
export const DownloadIcon = (props: IconProps) => <Icon as={FaDownload} {...props} />
export const MarkdownIcon = (props: IconProps) => <Icon as={FaMarkdown} {...props} />
export const HtmlIcon = (props: IconProps) => <Icon as={FaHtml5} {...props} />
export const PptIcon = (props: IconProps) => <Icon as={FaFilePowerpoint} {...props} />
export const GithubIcon = (props: IconProps) => <Icon as={FaGithub} {...props} />
export const BoldIcon = (props: IconProps) => <Icon as={FaBold} {...props} />
export const ItalicIcon = (props: IconProps) => <Icon as={FaItalic} {...props} />
export const ListIcon = (props: IconProps) => <Icon as={FaList} {...props} />
export const CodeIcon = (props: IconProps) => <Icon as={FaCode} {...props} />
export const QuoteIcon = (props: IconProps) => <Icon as={FaQuoteRight} {...props} />
export const SaveIcon = (props: IconProps) => <Icon as={FaSave} {...props} />
export const AddIcon = (props: IconProps) => <Icon as={FaPlus} {...props} />
export const TagIcon = (props: IconProps) => <Icon as={FaTags} {...props} /> 