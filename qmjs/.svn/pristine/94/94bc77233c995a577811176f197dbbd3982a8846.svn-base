export function getAccountInfo(str) {
  return typeof str === 'undefined' ? JSON.parse(localStorage.getItem('accountInfo')) : str
}

export function setAccountInfo(accountInfo) {
  if(accountInfo){
    return localStorage.setItem('accountInfo', JSON.stringify(accountInfo))
  }
}

export function removeAccountInfo() {
  return localStorage.removeItem('accountInfo')
}

export function getPermissions(str) {
  return typeof str === 'undefined' ? JSON.parse(localStorage.getItem('permissions')) : str
}

export function setPermissions(permissions) {
  if(permissions){
    return localStorage.setItem('permissions', JSON.stringify(permissions))
  }
}

export function removePermissions() {
  return localStorage.removeItem('permissions')
}
