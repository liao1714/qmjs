import request from '@/utils/request'
export async function activityContent(params) {
  return request({
    url: '/api/v1/app/community/activityContent',
    method: 'get',
    params: params
  })
}
export async function getCommunityAssociation(params) {
  return request({
    url: '/api/mock/community/association',
    method: 'get',
    params: params
  })
}

export async function findAssociation(params) {
  return request({
    url: '/api/v1/app/community/findAssociation',
    method: 'get',
    params: params
  })
}

export async function mineAssociation(params) {
  return request({
    url: '/api/v1/app/community/mineAssociation',
    method: 'get',
    params: params
  })
}

export async function joinAssociation(params) {
  return request({
    url: '/api/v1/app/used/join',
    method: 'post',
    data: params
  })
}

export async function newActivityRead(params) {
  return request({
    url: '/api/v1/app/community/newActivityRead',
    method: 'post',
    data: params
  })
}

export async function activityLike(params) {
  return request({
    url: '/api/v1/app/used/activityLike',
    method: 'post',
    data: params
  })
}

export async function cancelActivityLike(params) {
  return request({
    url: '/api/v1/app/used/cancelActivityLike',
    method: 'delete',
    data: params
  })
}
