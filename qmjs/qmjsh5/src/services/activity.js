import request from '@/utils/request'
export async function getActivityDetail(params) {
  return request({
    url: '/api/v1/app/events/detail',
    method: 'get',
    params: params
  })
}
export async function activityComment(params) {
  return request({
    url: '/api/v1/app/community/activityComment',
    method: 'get',
    params: params
  })
}
export async function pushActivityComment(params) {
  return request({
    url: '/api/v1/app/used/pushActivityComment',
    method: 'post',
    data: params
  })
}
export async function removeActivityComment(params) {
  return request({
    url: '/api/v1/app/used/removeActivityComment',
    method: 'delete',
    data: params
  })
}


export async function eventsLike(params) {
  return request({
    url: '/api/v1/app/used/eventsLike',
    method: 'post',
    data: params
  })
}
export async function cancelEventsLike(params) {
  return request({
    url: '/api/v1/app/used/cancelEventsLike',
    method: 'delete',
    data: params
  })
}

export async function enrollItemCost(params) {
  return request({
    url: '/api/v1/app/used/enrollItemCost',
    method: 'get',
    params: params
  })
}

export async function signUpForm(params) {
  return request({
    url: '/api/v1/app/used/signUpForm',
    method: 'get',
    params: params
  })
}

export async function signUp(params) {
  return request({
    url: '/api/v1/app/used/signUp',
    method: 'post',
    data: params
  })
}

export async function cancelEnroll(params) {
  return request({
    url: '/api/v1/app/used/cancelEnroll',
    method: 'post',
    data: params
  })
}

export async function cancelReasons(params) {
  return request({
    url: '/api/v1/app/used/cancelReasons',
    method: 'get',
    data: params
  })
}

export async function enrollInfo(params) {
  return request({
    url: '/api/v1/app/used/enrollInfo',
    method: 'get',
    params: params
  })
}




export async function teamEnrollForm(params) {
  return request({
    url: '/api/v1/app/used/TeamSignUpForm',
    method: 'get',
    params: params
  })
}

export async function familyEnrollForm(params) {
  return request({
    url: '/api/v1/app/used/FamilySignUpForm',
    method: 'get',
    params: params
  })
}

export async function signUpPay(params) {
  return request({
    url: '/api/v1/app/pay/signUpPay',
    method: 'post',
    data: params
  })
}



export async function orderDetail(params) {
  return request({
    url: '/api/v1/app/used/orderDetails',
    method: 'get',
    params: params
  })
}



export async function specialEvents(params) {
  return request({
    url: '/api/v1/app/pagehome/specialEvents',
    method: 'get',
    params: params
  })
}



export async function userShare(params) {
  return request({
    url: '/api/v1/app/used/userShare',
    method: 'post',
    data: params
  })
}


export async function ticketInformation(params) {
  return request({
    url: '/api/v1/app/used/ticketInformation',
    method: 'get',
    params: params
  })
}



export async function repeatSignUp(params) {
  return request({
    url: '/api/v1/app/used/repeatSignUp',
    method: 'post',
    data: params
  })
}



export async function revoke(params) {
  return request({
    url: '/api/v1/app/used/revoke',
    method: 'post',
    data: params
  })
}
