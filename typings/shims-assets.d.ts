declare module '*.vue'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.scss'

declare module '*.vue' {
  const component: JSX.Element
  export default component
}
