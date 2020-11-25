import request from '../utils/request'

export function login(data) {
  return request({
    url: '/erp/Api/api_login',
    method: 'post',
    data,
  })
}

// 登陆时选择公司
export function loginCompany(data) {
  return request({
    url: '/erp/Api/api_company',
    method: 'post',
    data,
  })
}

// 客户列表
export function getCusList(data) {
  return request({
    url: '/erp/Api/cus_list',
    method: 'post',
    data,
  })
}

// 客户详情
export function getCusDetail(data) {
  return request({
    url: '/erp/Api/api_detail',
    method: 'post',
    data,
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
