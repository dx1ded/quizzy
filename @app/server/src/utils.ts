export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export const isDataUrl = (str: string) => str.startsWith("data:image")
