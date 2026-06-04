import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/assets/index.scss'
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#2563eb',
          colorSuccess: '#0f9f6e',
          colorWarning: '#d97706',
          borderRadius: 8,
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          Button: {
            controlHeight: 36,
            borderRadius: 8,
          },
          Input: {
            controlHeight: 38,
            borderRadius: 8,
          },
          Table: {
            headerBg: '#f8fafc',
            headerColor: '#475569',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
