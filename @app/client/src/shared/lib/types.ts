import { PropsWithChildren, ReactElement } from "react"

export interface PropsWithClassname {
  className?: string
}

export interface IconProps extends PropsWithClassname {
  /**
   * Width in rem proportion
   */
  width?: number
  /**
   * Height in rem proportion
   */
  height?: number
  /**
   * Icon color
   */
  color?: string
}

export interface ChildrenAsFunction<T> {
  children(props: T): ReactElement<PropsWithChildren>
}
