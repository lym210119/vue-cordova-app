import request from '../utils/request'

export function login(data) {
  return request({
    url: '/erp/Api/api_login',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

export function getSMS(data) {
  return request({
    url: '/erp/regist/msg',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 登陆时选择公司
export function loginCompany(data) {
  return request({
    url: '/erp/Api/api_company',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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

// 提交融资
export function submitInfo(data) {
  return request({
    url: '/erp/Api/api_rz',
    method: 'post',
    data,
  })
}

// 资料上传
export function uploadImages(data) {
  return request({
    url: '/erp/api/uploadIpad',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 上传录音
export function uploadRecord(data) {
  return request({
    url: '/erp/api/api_audio',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 上传切片，同时过滤已上传的切片
export function uploadChunks(data) {
  return request({
    url: '/erp/api/api_audio',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

// 上传切片，同时过滤已上传的切片
export function mergeRequest(data) {
  return request({
    url: '/erp/api/api_audio',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
// // 申请方案
// applyScheme(data) {
//   return minRequest.post("/erp/Api/apply_scheme", data);
// },
// // 查看方案
// viewScheme(data) {
//   return minRequest.post("/erp/Api/getSomeInfo", data);
// },
// // 提交客户接受度
// submitClientRate(data) {
//   return minRequest.post("/erp/api/saveCusAccept", data);
// },
