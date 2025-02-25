'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const path = require('node:path')
const axios_1 = require('axios')
const dotenv = require('dotenv')
// 数据返回的接口
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
// const URL: string = import.meta.env.VITE_SERVICE_BASE_URL
const URL = ''
let RequestEnums;
(function (RequestEnums) {
  RequestEnums[RequestEnums.TIMEOUT = 20000] = 'TIMEOUT'
  RequestEnums[RequestEnums.OVERDUE = 500] = 'OVERDUE'
  RequestEnums[RequestEnums.FAIL = 999] = 'FAIL'
  RequestEnums[RequestEnums.SUCCESS = 200] = 'SUCCESS'
  RequestEnums[RequestEnums.SUCCESS_OTHER = 1000] = 'SUCCESS_OTHER'
})(RequestEnums || (RequestEnums = {}))
const config = {
  // 默认地址
  baseURL: URL,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT,
  // 跨域时候允许携带凭证
  // withCredentials: true,
}
const Request = /** @class */ (function () {
  function Request(config) {
    const _this = this
    // 实例化axios
    this.service = axios_1.default.create(config)
    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem('token') || ''
      return config
    }, (error) => {
      // 请求报错
      Promise.reject(error)
    })
    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use((response) => {
      const data = response.data
      if (data.code === RequestEnums.OVERDUE) {
        // 登录信息失效，应跳转到登录页面，并清空本地的token
        localStorage.setItem('token', '')
        return Promise.reject(data)
      } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
      if (data.code && data.code !== RequestEnums.SUCCESS && data.code !== RequestEnums.SUCCESS_OTHER) {
        console.error(data) // 此处也可以使用组件提示报错信息
        return Promise.reject(data)
      }
      return data
    }, (error) => {
      const response = error.response
      if (response) {
        _this.handleCode(response.status)
      }
      if (!window.navigator.onLine) {
        console.error('网络连接失败') // 可以跳转到错误页面，也可以不做操作
      }
    })
  }
  Request.prototype.handleCode = function (code) {
    switch (code) {
      case 401:
        console.error('登录失败，请重新登录')
        break
      default:
        console.error('请求失败')
        break
    }
  }
  /*  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
     *  AxiosResponse<T> 并不是最终的返回值。最终的返回值应该是 response.data 对应的类型
     */
  // 常用方法封装
  Request.prototype.get = function (url, params) {
    return this.service.get(url, { params })
  }
  Request.prototype.post = function (url, params, config) {
    return this.service.post(url, params, config)
  }
  Request.prototype.put = function (url, params) {
    return this.service.put(url, params)
  }
  Request.prototype.delete = function (url, params) {
    return this.service.delete(url, { params })
  }
  Request.prototype.download = function (url, params) {
    return this.service.get(url, { params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }
  Request.prototype.upload = function (url, params) {
    return this.service.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
  return Request
}())
// 导出一个实例对象
exports.default = new Request(config)
