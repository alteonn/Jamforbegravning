export const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
  
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
  
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  export const optimizeImages = (src: string) => {
    if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http')) {
      return src
    }
  
    return `${process.env.NEXT_PUBLIC_SITE_URL}/_next/image?url=${encodeURIComponent(
      src
    )}&w=1200&q=75`
  }