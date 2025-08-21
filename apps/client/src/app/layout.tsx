import type { Metadata } from 'next'
import Fix from '@/utils/fix'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Geist } from 'next/font/google'

import '@ant-design/v5-patch-for-react-19'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Survey',
  description: 'Survey App',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex justify-center">
        <AntdRegistry>
          <Fix />
          {children}
        </AntdRegistry>
      </body>
    </html>
  )
}
