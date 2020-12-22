import request from '@/utils/request'
export async function tokenAuth(data) {
  return request({
    url: '/api/v1/app/common/tokenAuth',
    method: 'post',
    data: data
  })
}
export async function tokenAuthWechat(data) {
  return request({
    url: '/api/v1/app/common/tokenAuthWechat',
    method: 'post',
    data: data
  })
}

export async function tokenWgtyAuthWechat(data) {
  return request({
    url: '/api/v1/app/common/tokenWgtyAuthWechat',
    method: 'post',
    data: data
  })
}

export async function registerWechat(data) {
  return request({
    url: '/api/v1/app/common/registerWechat',
    method: 'post',
    data: data
  })
}

export async function registerWgtyWechat(data) {
  return request({
    url: '/api/v1/app/common/registerWgtyWechat',
    method: 'post',
    data: data
  })
}

export async function registerOther(data) {
  return request({
    url: '/api/v1/app/common/registerOther',
    method: 'post',
    data: data
  })
}

export async function sendSms(data) {
  return request({
    url: '/api/v1/app/common/sendSms',
    method: 'post',
    data: data
  })
}

export async function sendSmkSms(data) {
  return request({
    url: '/api/v1/app/common/sendSmkSms',
    method: 'post',
    data: data
  })
}
export async function uploadImgThumbnail(data) {
  return request({
    url: '/api/v1/app/used/uploadImgThumbnail',
    method: 'post',
    data: data
  })
}

export async function uploadWatermark(data) {
  return request({
    url: '/api/v1/app/used/uploadWatermark',
    method: 'post',
    data: data
  })
}



export async function userInfo(data) {
  return request({
    url: '/api/v1/app/common/userInfo',
    method: 'get',
    data: data
  })
}

export async function getTagTabBar(params) {
  return request({
    url: '/api/v1/app/pagehome/tagTabBar',
    method: 'get',
    params: params
  })
}

export async function addBuriedPointLog(params) {
  return request({
    url: '/api/v1/app/common/addBuriedPointLog',
    method: 'post',
    data: params
  })
}


export async function imageCaptcha(params) {
  return request({
    url: '/api/v1/app/common/imageCaptcha',
    method: 'post',
    // responseType: 'blob',
    data: params
  })
}


export async function getWxConfig(params) {
  return request({
    url: '/api/v1/app/used/getSign',
    method: 'get',
    params: params
  })
}
