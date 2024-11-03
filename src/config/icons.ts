import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faEye,
  faCode,
  faDesktop,
  faFile,
  faFileAlt,
  faFileExport,
  faFileImport,
  faEdit,
  faTrash,
  faCog,
  faArrowRight,
  faComment,
  faExpand,
  faCompress,
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faPlus,
  faMinus,
  faSearch,
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
  faSync,
  faCheck,
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

// 添加所有图标到库中
library.add(
  faEye,
  faCode,
  faDesktop,
  faFile,
  faFileAlt,
  faFileExport,
  faFileImport,
  faEdit,
  faTrash,
  faCog,
  faArrowRight,
  faComment,
  faExpand,
  faCompress,
  faPlayCircle,
  faPauseCircle,
  faStopCircle,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faPlus,
  faMinus,
  faSearch,
  faFilter,
  faSort,
  faSortUp,
  faSortDown,
  faSync,
  faCheck,
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faQuestionCircle,
  faGithub,
)

export const ICONS = {
  eye: faEye,
  code: faCode,
  presentation: faDesktop,
  fileCode: faCode,
  file: faFile,
  fileAlt: faFileAlt,
  fileExport: faFileExport,
  fileImport: faFileImport,
  edit: faEdit,
  trash: faTrash,
  settings: faCog,
  arrowRight: faArrowRight,
  notes: faComment,
  expand: faExpand,
  compress: faCompress,
  play: faPlayCircle,
  pause: faPauseCircle,
  stop: faStopCircle,
  chevronLeft: faChevronLeft,
  chevronRight: faChevronRight,
  chevronUp: faChevronUp,
  chevronDown: faChevronDown,
  plus: faPlus,
  minus: faMinus,
  search: faSearch,
  filter: faFilter,
  sort: faSort,
  sortUp: faSortUp,
  sortDown: faSortDown,
  sync: faSync,
  check: faCheck,
  times: faTimes,
  warning: faExclamationTriangle,
  info: faInfoCircle,
  question: faQuestionCircle,
  github: faGithub,
} as const 