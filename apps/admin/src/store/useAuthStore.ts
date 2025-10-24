import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string
  setToken: (token: string) => void
}

const AUTH_STORE_KEY = 'auth-storage'
// 创建状态存储
export const useAuthStore = create<AuthState>()(persist(
  (set) => {
    return {
      token: '',
      setToken: (token: string) => set(() => ({ token })),
    }
  },
  {
    name: AUTH_STORE_KEY, // 存储的名称
    partialize: state => ({ token: state.token }),
  },
))

export function getToken() {
  const authStorage = JSON.parse(localStorage.getItem(AUTH_STORE_KEY) || '{}')
  return authStorage.state.token
}
