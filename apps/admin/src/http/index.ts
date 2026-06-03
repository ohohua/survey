import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/store/useAuthStore'
import { message } from 'antd'
import axios from 'axios'

export enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 500,
  FAIL = 400,
  SUCCESS = 200,
}

export interface Result<T> {
  code: number
  msg: string
  data: T
}

export interface ListDto {
  current: number
  pageSize: number
  [props: string]: string | number
}

export interface ListTime {
  createTime: Date
  updateTime: Date
}

export class Request {
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config) => {
        const { token } = useAuthStore.getState()
        config.headers.Authorization = token || localStorage.getItem('token') || ''
        return config
      },
      (error: AxiosError) => {
        Promise.reject(error)
      },
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        if (data.code === RequestEnums.OVERDUE) {
          localStorage.setItem('token', '')
          return Promise.reject(data)
        }
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          message.error(data)
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError<Result<any>>) => {
        const { response } = error
        if (response) {
          this.handleCode({ code: response.status, msg: response.data.msg })
        }
        if (!window.navigator.onLine) {
          message.error('网络连接失败')
        }
      },
    )
  }

  handleCode({ code, msg }: { code: number, msg: string }): void {
    switch (code) {
      case 401:
        console.error('登录失败，请重新登录')
        break
      default:
        message.error(msg)
        break
    }
  }

  get<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<Result<T>> {
    return this.service.post(url, params, config)
  }

  put<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.put(url, params)
  }

  patch<T>(url: string, params?: object): Promise<Result<T>> {
    return this.service.patch(url, params)
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
