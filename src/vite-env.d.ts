/// <reference types="vite/client" />

declare module '*.svg?react' {
  import React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.svg?raw' {
  const content: string
  export default content
}
