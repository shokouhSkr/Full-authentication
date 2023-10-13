import { Account, NextAuthOptions, Profile, User, getServerSession } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

import { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // SIGN IN WITH EMAIL AND PASSWORD
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });

        if (!user) {
          throw new Error("Email is not registered.");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials!.password, user.password!);

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect.");
        }

        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXT_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
    }) {
      if (user) {
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
