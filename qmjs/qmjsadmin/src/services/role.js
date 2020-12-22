import request from '@/utils/request'

export async function roleQuery(params) {
  return request('/api/v1/backstage/role/query', {
    method: 'GET',
    params: params,
  })
}
export async function roleAdd(params) {
  return request('/api/v1/backstage/role/add', {
    method: 'POST',
    data: params,
  })
}
export async function roleEdit(params) {
  return request('/api/v1/backstage/role/edit', {
    method: 'PUT',
    data: params,
  })
}
export async function roleDel(params) {
  return request('/api/v1/backstage/role/del', {
    method: 'DELETE',
    data: params,
  })
}
export async function roleActivate(params) {
  return request('/api/v1/backstage/role/activate', {
    method: 'POST',
    data: params,
  })
}
export async function roleResources(params) {
  return request('/api/v1/backstage/resources/roleResources', {
    method: 'GET',
    params: params,
  })
}
