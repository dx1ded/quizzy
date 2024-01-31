export function convertToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (!reader.result) {
        return reject(new Error("Couldn't convert"))
      }
      const base64String = (reader.result as string)
        .replace("data:", "")
        .replace(/^.+,/, "")

      resolve(base64String)
    }
  })
}
