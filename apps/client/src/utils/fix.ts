'use client'
import { unstableSetRender } from 'antd'
import { createRoot } from 'react-dom/client'

// 修复 React 19 的渲染问题
// 参考：https://github.com/diqye/v5-patch-for-react-19
unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container)
  const root: ReturnType<typeof createRoot> = container._reactRoot
  root.render(node)

  return () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        root.unmount()
        resolve()
      }, 0)
    })
})
export default function Fix() {
  return null
}
