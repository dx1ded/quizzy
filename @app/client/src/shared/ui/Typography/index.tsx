import { PropsWithChildren, HTMLAttributes, createElement } from "react"

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: string
}

export function Heading({
  children,
  tag = "h1",
  ...attrs
}: PropsWithChildren<HeadingProps>) {
  const className = `text-3xl font-bold leading-snug ${attrs.className}`
  return createElement(tag, { ...attrs, className }, children)
}

export function Subheading({
  children,
  tag = "h2",
  ...attrs
}: PropsWithChildren<HeadingProps>) {
  const className = `text-2xl font-semibold ${attrs.className}`
  return createElement(tag, { ...attrs, className }, children)
}

export function Text({
  children,
  ...attrs
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  const className = `text-lg font-normal ${attrs.className}`
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
  const className = `text-xs font-normal ${attrs.className}`
  return (
    <span {...attrs} className={className}>
      {children}
    </span>
  )
}
