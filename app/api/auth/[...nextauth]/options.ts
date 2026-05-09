import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "hiouh@kjjd.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
          
          const res = await fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.user && data.token) {
            // Trigger login notification for single-device login enforcement
            try {
              const userAgent = req?.headers?.['user-agent'] || 'Unknown';
              const forwardedFor = req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'Unknown';
              
              await fetch(`${backendUrl}/auth/login-notification`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-user-agent": userAgent,
                  "x-forwarded-for": forwardedFor
                },
                body: JSON.stringify({
                  userId: data.user.id,
                  sessionId: data.token,
                })
              });
            } catch (err) {
              console.error("Failed to send login notification:", err);
            }

            // Include token to return it in JWT
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.firstName, // Mapping to NextAuth's 'name'
              role: data.user.role,
              avatarUrl: data.user.avatarUrl,
              token: data.token, // Our custom JWT from Express
            };
          } else {
            throw new Error(data.error || "Invalid login credentials");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.avatarUrl = (user as any).avatarUrl;
        token.accessToken = (user as any).token; // Express JWT Token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).avatarUrl = token.avatarUrl;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret",
  pages: {
    signIn: "/login", // Though you are using a modal, so it might not redirect here often
  }
};
