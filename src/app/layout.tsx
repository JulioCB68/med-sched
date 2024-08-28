import { Toaster } from '@/components/ui/sonner'
import { robotoMono } from '@/config/fonts'
import { metaData } from '@/config/meta-data'
import ReactQueryProvider from '@/providers/react-query-provider'
import NextAuthProvider from '@/providers/SessionProvider'
import '../styles/globals.css'

export const metadata = metaData

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
