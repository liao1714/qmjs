import request from '@/utils/request'

export async function authenticate(params) {
  return request('/api/v1/backstage/common/authenticate', {
    method: 'POST',
    data: params,
  })
}
