import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers

    providers: [
        Credentials({
            type: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                {
                    const { email, password, image } = credentials as {
                        email: string;
                        password: string;
                        image: string;
                    };

                    if (email !== 'thanhs2fo4@gmail.com' || password !== '1234') {
                        throw new Error('invalid credentoals');
                    }

                    // if everything fine

                    return {
                        id: '1234',
                        name: 'Thanh Nguyễn',
                        email: 'thanhs2fo4@gmail.com',
                        image: 'https://i.redd.it/yrpxo2ro8og91.png',
                    };
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
};
export default NextAuth(authOptions);
