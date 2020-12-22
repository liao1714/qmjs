import request from '@/utils/request'

export async function uploadImg(params) {
  return request('/api/v1/backstage/used/uploadImg', {
    method: 'POST',
    data: params,
  })
}

export async function uploadImgThumbnail(params) {
  return request('/api/v1/backstage/used/uploadImgThumbnail', {
    method: 'POST',
    data: params,
  })
}

export async function refreshToken(params) {
  return request('/api/v1/backstage/account/refreshToken', {
    method: 'GET',
    data: params,
  })
}
