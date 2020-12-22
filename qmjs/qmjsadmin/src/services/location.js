import request from '@/utils/request'

export async function locationQuery(params) {
  return request('/api/v1/backstage/location/query', {
    method: 'GET',
    params: params,
  })
}

export async function locationAdd(params) {
  return request('/api/v1/backstage/location/add', {
    method: 'POST',
    data: params,
  })
}

export async function locationEdit(params) {
  return request('/api/v1/backstage/location/edit', {
    method: 'PUT',
    data: params,
  })
}

export async function locationDetail(params) {
  return request('/api/v1/backstage/location/detail', {
    method: 'GET',
    params: params,
  })
}

export async function locationDel(params) {
  return request('/api/v1/backstage/location/del', {
    method: 'DELETE',
    data: params,
  })
}

export async function locationOnline(params) {
  return request('/api/v1/backstage/location/online', {
    method: 'PUT',
    data: params,
  })
}

export async function locationPageHomeBannerSortList(params) {
  return request('/api/v1/backstage/location/pageHomeBannerSortList', {
    method: 'GET',
    params: params,
  })
}

export async function locationSortPageHomeBanner(params) {
  return request('/api/v1/backstage/location/sortPageHomeBanner', {
    method: 'PUT',
    data: params,
  })
}
