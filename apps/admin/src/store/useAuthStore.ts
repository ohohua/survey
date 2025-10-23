import { create } from 'zustand'

interface AuthState {
  token: string
  setToken: (token: string) => void
}

// 创建状态存储
export const useAuthStore = create<AuthState>((set) => {
  return {
    token: '',
    setToken: (token: string) => set(() => ({ token })),
  }
})
