export function getTabKey(str) {
  return typeof str === 'undefined' ? localStorage.getItem('tabKey') : str
}

export function setTabKey(tabKey) {
  if(tabKey){
    return localStorage.setItem('tabKey', tabKey)
  }
}

export function removeTabKey() {
  return localStorage.removeItem('tabKey')
}
