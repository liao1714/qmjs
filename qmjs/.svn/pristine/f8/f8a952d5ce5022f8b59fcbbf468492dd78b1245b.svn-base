export function getApiUrl(mock) {
  if (mock) {
    if (process.env.NODE_ENV === 'development') {
      // return 'http://192.168.1.139:9010'
      // return 'http://192.168.1.106:9010'
      return 'http://192.168.1.107:9010'
      // return 'https://buss.ixiamen.org.cn/qmjsapi'
    } else {
      return 'https://buss.ixiamen.org.cn/qmjsapi'
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      return 'http://fitnessmobile.vaiwan.com'
    } else {
      return 'https://buss.ixiamen.org.cn/qmjsapi'
    }
  }
}
