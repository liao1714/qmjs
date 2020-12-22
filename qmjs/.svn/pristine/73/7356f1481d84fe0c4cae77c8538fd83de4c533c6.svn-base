import request from '@/utils/request'
export async function getPreferenceList(params) {
  return request({
    url: '/api/v1/app/used/tagSelection',
    method: 'get',
    params: params
  })
}

export async function smkPreferences(params) {
  return request({
    url: '/api/v1/app/used/smkPreferences',
    method: 'put',
    data: params
  })
}
