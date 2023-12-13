import { PropsWithChildren, HTMLAttributes, createElement } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * HTML tag name (provided with the components by default)
   */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function Heading({
  children,
  tag = "h1",
  ...attrs
}: PropsWithChildren<HeadingProps>) {
  const className = `text-3xl font-bold leading-snug ${attrs.className || ""}`
  return createElement(tag, { ...attrs, className }, children)
}

export function Subheading({
  children,
  tag = "h2",
  ...attrs
}: PropsWithChildren<HeadingProps>) {
  const className = `text-2xl font-semibold leading-snug ${
    attrs.className || ""
  }`
  return createElement(tag, { ...attrs, className }, children)
}

export function Text({
  children,
  ...attrs
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  const className = `text-lg leading-8 font-normal ${attrs.className || ""}`
  return (
    <p {...attrs} className={className}>
      {children}
    </p>
  )
}

export function Caption({
  children,
  ...attrs
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  const className = `text-sm leading-relaxed font-normal ${
    attrs.className || ""
  }`
  return (
    <span {...attrs} className={className}>
      {children}
    </span>
  )
}
