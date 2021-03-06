export function getToken(str) {
  return typeof str === 'undefined' ? localStorage.getItem('token') : str
}

export function setToken(token) {
  if(token){
    return localStorage.setItem('token', token)
  }
}

export function removeToken() {
  return localStorage.removeItem('token')
}

export function getAuthToken(str) {
  return typeof str === 'undefined' ? localStorage.getItem('authToken') : str
}

export function setAuthToken(token) {
  if(token){
    return localStorage.setItem('authToken', token)
  }
}
