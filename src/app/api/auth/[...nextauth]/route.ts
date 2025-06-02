import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
 
const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL??'',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY??'',
  }),
})
export { handlers as GET, handlers as POST, auth, signIn, signOut }