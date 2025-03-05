// 定义请求响应参数
export interface Result<T> {
  code: number
  msg: string
  data: T
}

export interface ListDto {
  pageIndex: number
  pageSize: number
  [props: string]: string | number
}

export interface ListTime {
  createTime: Date
  updateTime: Date
}
