import { Toast } from 'antd-mobile'
export function NotEmpty(value, message) {
  if (value instanceof Array) {
    if (value.length === 0) {
      Toast.info(message, 1)
      return false
    } else {
      return true
    }
  } else {
    if (value === '' || value === null || value === undefined || !value) {
      Toast.info(message, 1)
      return false
    } else {
      return true
    }
  }
}

export function MobileCheck(value) {
  return /^1([3456789])\d{9}$/.test(value)
}
