const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
})
let appId, tokenAuth, registerWechat, sendSms
/**
 * 0:一般浏览器
 * 1:市民卡APP
 * 2:市民卡公众号
 * 3:市民卡小程序
 * 4:文广体育公司公众号
 * 5:马拉松公众号
 **/
if (history.location.query && history.location.query.accessType === '1' || history.location.query.accessType === '2') {
  appId = process.env.NODE_ENV === 'development' ? 'wx524b471cacf0ddff' : 'wx2945b4662e8faf9a'
  tokenAuth = 'index/tokenAuthWechat'
  registerWechat = 'login/registerWechat'
  sendSms = 'index/sendSmkSms'
} else if (history.location.query && history.location.query.accessType === '4') {
  appId = process.env.NODE_ENV === 'development' ? 'wx8c18a73839283578' : 'wx83924fc69bea8458'
  tokenAuth = 'index/tokenWgtyAuthWechat'
  registerWechat = 'login/registerWgtyWechat'
  sendSms = 'index/sendSms'
} else if (history.location.query && history.location.query.accessType === '0') {
  sendSms = 'index/sendSms'
}

module.exports = {
  appId: appId,
  tokenAuth: tokenAuth,
  registerWechat: registerWechat,
  sendSms: sendSms,
}
