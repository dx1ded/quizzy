export interface PropsWithClassname {
  className?: string
}

export interface IconProps extends PropsWithClassname {
  /**
   * Width in rem proportion
   * @param width;
   */
  width?: number
  /**
   * Height in rem proportion
   * @param height;
   */
  height?: number
  color?: string
}
