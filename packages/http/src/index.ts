import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Result } from './types'
import { message } from 'antd'
import axios from 'axios'

// 数据返回的接口

enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 500, // 登录失效
  FAIL = 400, // 请求失败
  SUCCESS = 200, // 请求成功
}

class Request {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      (config) => {
        config.headers.Authorization = localStorage.getItem('token') || ''
        return config
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      },
    )

    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', '')
          return Promise.reject(data)
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          message.error(data) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError<Result<any>>) => {
        const { response } = error
        if (response) {
          this.handleCode(response.status, response.data.msg)
        }
        if (!window.navigator.onLine) {
          message.error('网络连接失败') // 可以跳转到错误页面，也可以不做操作
        }
      },
    )
  }

  handleCode(code: number, msg: string): void {
    switch (code) {
      case 401:
        console.error('登录失败，请重新登录')
        break
      default:
        message.error(msg)
        break
    }
  }

  /*  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
   *  AxiosResponse<T> 并不是最终的返回值。最终的返回值应该是 response.data 对应的类型
   */
  // 常用方法封装
  get<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.service.post(url, params, config)
  }

  put<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.delete(url, { params })
  }

  download(url: string, params?: object): Promise<string> {
    return this.service.get(url, { params, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  upload<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.post(url, params, { headers: { 'Content-Type': 'multipart/form-data' } })
  }
}

export { Request, RequestEnums }
