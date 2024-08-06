import { robotoMono } from '@/config/fonts'
import { metaData } from '@/config/meta-data'
import '../styles/globals.css'
import NextAuthProvider from '@/providers/SessionProvider'

export const metadata = metaData

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
