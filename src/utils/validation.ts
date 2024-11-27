export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  export const validatePhone = (phone: string): boolean => {
    const re = /^[\d\s\-\+\(\)]{6,}$/
    return re.test(phone)
  }
  
  export const validatePostalCode = (postalCode: string): boolean => {
    const re = /^\d{3}\s?\d{2}$/
    return re.test(postalCode)
  }