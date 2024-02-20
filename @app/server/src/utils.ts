import { customAlphabet } from "nanoid"

export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export const isDataUrl = (str: string) => str.startsWith("data:image")

export const generateNumberedId = customAlphabet("123456789", 7)
