import request from '@/utils/request'
export async function getHomeBanner(params) {
  return request({
    url: '/api/v1/app/pagehome/banners',
    method: 'get',
    params: params
  })
}

export async function getHomeActivity(params) {
  return request({
    url: '/api/v1/app/pagehome/events',
    method: 'get',
    params: params
  })
}

export async function notice(params) {
  return request({
    url: 'api/v1/app/pagehome/notice',
    method: 'get',
    params: params
  })
}

export async function clause(params) {
  return request({
    url: '/api/v1/app/common/clause',
    method: 'get',
    params: params
  })
}
