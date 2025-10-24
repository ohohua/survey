import MainLayout from '@/layouts/MainLayout'
import ManageLayout from '@/layouts/ManageLayout'

import QuestionLayout from '@/layouts/QuestionLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import List from '@/pages/manage/List'
import Star from '@/pages/manage/Star'
import Trash from '@/pages/manage/Trash'
import NotFound from '@/pages/NotFound'
import Edit from '@/pages/question/Edit'
import Stat from '@/pages/question/Stat'
import Register from '@/pages/Register'
import { useAuthStore } from '@/store/useAuthStore'
import { createBrowserRouter, redirect } from 'react-router-dom'

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = 'login'
export const REGISTER_PATHNAME = 'register'
export const MANAGE_INDEX_PATHNAME = 'manage/list'

// 全局登录检查函数
async function requireAuthLoader(payload: any) {
  const { request } = payload
  const { token } = useAuthStore.getState()
  if (!token) {
    // 未登录：重定向到登录页，并携带当前路径
    const url = new URL(request.url)
    return redirect(`/login?from=${url.pathname}`)
  }
  // 已登录：返回空或需要的数据
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: HOME_PATHNAME,
        element: <Home />,
      },
      {
        path: LOGIN_PATHNAME,
        element: <Login />,
      },
      {
        path: REGISTER_PATHNAME,
        element: <Register />,
      },
      {
        path: 'manage',
        element: (
          // 路由守卫 方式1
          // <RequireAuth>
          <ManageLayout />
          // </RequireAuth>
        ),
        loader: requireAuthLoader, // 路由守卫 方式2
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },

        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    loader: requireAuthLoader, // 路由守卫 方式2
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
