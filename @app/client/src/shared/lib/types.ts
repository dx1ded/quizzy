import { PropsWithChildren, ReactElement } from "react"
import { SignInSchema, SignUpSchema } from "@quizzy/common"
import { z } from "zod"

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

export type SignInFormProps = z.infer<typeof SignInSchema>
export type SignUpFormProps = z.infer<typeof SignUpSchema>
