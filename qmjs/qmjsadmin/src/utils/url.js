let apiUrl
if (process.env.NODE_ENV === 'development') {
  // apiUrl = 'http://192.168.1.106:9010'
  apiUrl = 'http://192.168.1.107:9010'
  // apiUrl = 'http://192.168.1.145:9010'
  // apiUrl = 'https://buss.ixiamen.org.cn/qmjsapi'
  // apiUrl = 'http://192.168.1.139:9010';

} else {
  apiUrl = 'https://buss.ixiamen.org.cn/qmjsapi'
}

export default apiUrl
