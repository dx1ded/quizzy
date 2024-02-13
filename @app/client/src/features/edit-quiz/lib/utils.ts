export function convertToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (!reader.result) {
        return reject(new Error("Couldn't convert"))
      }
      const dataUrl = reader.result as string

      resolve(dataUrl)
    }
  })
}
