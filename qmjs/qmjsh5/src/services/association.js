import request from '@/utils/request'
export async function getAssociationDetail(params) {
  return request({
    url: '/api/v1/app/community/associationInfo',
    method: 'get',
    params: params
  })
}
export async function getAssociationParticipants(params) {
  return request({
    url: '/api/v1/app/community/activityRegistrationList',
    method: 'get',
    params: params
  })
}
export async function cancelActivityRegistration(params) {
  return request({
    url: '/api/v1/app/used/cancelActivityRegistration',
    method: 'post',
    data: params
  })
}

export async function addAssociation(params) {
  return request({
    url: '/api/v1/app/used/addAssociation',
    method: 'post',
    data: params
  })
}

export async function addAssociationCode(params) {
  return request({
    url: '/api/v1/app/used/addAssociationCode',
    method: 'post',
    data: params
  })
}

export async function associationInfo(params) {
  return request({
    url: '/api/v1/app/association/associationInfo',
    method: 'get',
    params: params
  })
}

export async function updateAssociation(params) {
  return request({
    url: '/api/v1/app/used/updateAssociation',
    method: 'put',
    data: params
  })
}

export async function pushActivity(params) {
  return request({
    url: '/api/v1/app/used/pushActivity',
    method: 'post',
    data: params
  })
}

export async function associationMembers(params) {
  return request({
    url: '/api/v1/app/community/associationMembers',
    method: 'get',
    params: params
  })
}

export async function associationContent(params) {
  return request({
    url: '/api/v1/app/community/associationContent',
    method: 'get',
    params: params
  })
}

export async function addAssociationMember(params) {
  return request({
    url: '/api/v1/app/used/addAssociationMember',
    method: 'post',
    data: params
  })
}

export async function removeAssociationMember(params) {
  return request({
    url: '/api/v1/app/used/removeAssociationMember',
    method: 'delete',
    data: params
  })
}

export async function otherUser(params) {
  return request({
    url: '/api/v1/app/used/otherUser',
    method: 'get',
    params: params
  })
}

export async function removeActivity(params) {
  return request({
    url: '/api/v1/app/used/removeActivity',
    method: 'delete',
    data: params
  })
}

export async function topActivity(params) {
  return request({
    url: '/api/v1/app/used/topActivity',
    method: 'post',
    data: params
  })
}

export async function highlightActivity(params) {
  return request({
    url: '/api/v1/app/used/highlightActivity',
    method: 'post',
    data: params
  })
}

export async function detailActivity(params) {
  return request({
    url: '/api/v1/app/used/detailActivity',
    method: 'get',
    params: params
  })
}

export async function editActivity(params) {
  return request({
    url: '/api/v1/app/used/editActivity',
    method: 'post',
    data: params
  })
}

export async function activityRegistration(params) {
  return request({
    url: '/api/v1/app/used/activityRegistration',
    method: 'post',
    data: params
  })
}
