import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { findUserByEmail } from './app/libs/helpers'
import { createUser } from './app/libs/helpers'

const BACKEND_GRAPHQL_URI = process.env.BACKEND_GRAPHQL_URI

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const query = `
                    mutation login($input: LoginInput!) {
                        login(input: $input) {
                            user {
                                id
                                userName
                            }
                            token
                        }
                    }
                `;
                try {
                    const response = await fetch(BACKEND_GRAPHQL_URI as string, {
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            query, 
                            variables: {
                                input: {
                                    email: credentials?.email,
                                    password: credentials?.password
                                }
                            }
                        })
                    })
                    const result = await response.json()
                    if (result.errors) {
                        throw new Error(result.errors[0]?.message);
                    }
                    const { token, user } = result.data.login
                    return { ...user, apiToken:token }
                } catch (error: any) {
                    console.error("authorize() failed:", error);
                    throw new Error(error.message);
                }
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({account, profile}: {account: any, profile: any}) {
            if (account?.provider === 'google' || account?.provider === 'github') {
                const email = profile?.email
                const name = profile?.name
                try {
                    if (!email || !name) {
                        throw new Error("credentials required for OAuth sign in");
                    }
                    const existUser = await findUserByEmail(email);
                    if (!existUser) {
                        await createUser({
                            email,
                            userName: name,
                            provider: account.provider
                        });
                    }
                    return true;
                } catch (error) {
                    console.error('OAuth signin error:', error);
                    return false;
                }
            }
            return true
        },
        async jwt({ token, user, profile }: { token: any, user: string, profile: any }) {
            // On sign in
            if (user) {
                token.id = (user as any).id;
                token.name = (user as any).userName;
                token.email = (user as any).email;
                token.apiToken = (user as any).apiToken; // store backend JWT here
            }
            if (profile) {
                token.id = profile.id
                token.name = profile.name
                token.email = profile.email
                token.apiToken = profile.apiToken
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            // expose to client & server
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            (session as any).apiToken = token.apiToken as string | undefined;
            return session;
        },
    },
    pages: {
        signIn: "/authPage",
    },
})