import { authOptions } from '@/lib/auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// eslint-disable-next-line prettier/prettier

