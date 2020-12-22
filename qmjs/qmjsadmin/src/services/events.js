import request from '@/utils/request'

export async function eventsQuery(params) {
  return request('/api/v1/backstage/events/query', {
    method: 'GET',
    params: params,
  })
}

export async function getTagList(params) {
  return request('/api/v1/backstage/tag/list', {
    method: 'GET',
    params: params,
  })
}

export async function addTag(params) {
  return request('/api/v1/backstage/tag/add', {
    method: 'POST',
    data: params,
  })
}

export async function eventsAdd(params) {
  return request('/api/v1/backstage/events/add', {
    method: 'POST',
    data: params,
  })
}

export async function eventsAddPush(params) {
  return request('/api/v1/backstage/events/addPush', {
    method: 'POST',
    data: params,
  })
}

export async function eventsOperation(params) {
  return request('/api/v1/backstage/events/operation', {
    method: 'PUT',
    data: params,
  })
}

export async function eventsTop(params) {
  return request('/api/v1/backstage/events/top', {
    method: 'PUT',
    data: params,
  })
}

export async function eventsDel(params) {
  return request('/api/v1/backstage/events/del', {
    method: 'DELETE',
    data: params,
  })
}

export async function eventsDetail(params) {
  return request('/api/v1/backstage/events/detail', {
    method: 'GET',
    params: params,
  })
}

export async function eventsEdit(params) {
  return request('/api/v1/backstage/events/edit', {
    method: 'PUT',
    data: params,
  })
}

export async function enrollInfo(params) {
  return request('/api/v1/backstage/events/enrollInfo', {
    method: 'GET',
    params: params,
  })
}

export async function enrollItems(params) {
  return request('/api/v1/backstage/events/enrollItems', {
    method: 'GET',
    params: params,
  })
}

export async function enrollDetail(params) {
  return request('/api/v1/backstage/events/enrollDetail', {
    method: 'GET',
    params: params,
  })
}

export async function cancelEnroll(params) {
  return request('/api/v1/backstage/events/cancelEnroll', {
    method: 'POST',
    data: params,
  })
}

export async function enrollHeader(params) {
  return request('/api/v1/backstage/events/enrollHeader', {
    method: 'GET',
    params: params,
  })
}

export async function sharePrefix(params) {
  return request('/api/v1/backstage/common/sharePrefix', {
    method: 'GET',
    params: params,
  })
}



export async function refund(params) {
  return request('/api/v1/backstage/events/refund', {
    method: 'POST',
    data: params,
  })
}


export async function orderDetails(params) {
  return request('/api/v1/backstage/events/orderDetails', {
    method: 'GET',
    params: params,
  })
}


export async function tagSort(params) {
  return request('/api/v1/backstage/tag/sort', {
    method: 'POST',
    data: params,
  })
}


export async function tagEdit(params) {
  return request('/api/v1/backstage/tag/edit', {
    method: 'POST',
    data: params,
  })
}


export async function dataExport(params) {
  return request('/api/v1/backstage/events/export', {
    method: 'GET',
    params: params,
    responseType: 'blob',
  })
}
