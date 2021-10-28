export const getAccessToken = (): string => {
  return String(localStorage.getItem('token'))
}


