"use client";

import Container from "@/components/common/Container";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { DotLoader } from "react-spinners";

const text1: string =
  "This is a full build that covers the full authentication process from login, Register, sending emails (for activating account,reset password and password change notice), forgot password, reset password ,advanced form validation, protected routes, session manipulation...";
const text2: string =
  "In this build we used Next js, Typescript, Mongodb, prisma, Next auth, React-hook-form, Zod,Axios, Nodemailer, Smtp service, Gmail stmp, React-toastify, Zxcvbn, Handlebars, BcryptJs...";

export default function Home() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="p-4 text-lg font-medium flex items-center justify-center min-h-[calc(100dvh)] md:mx-20">
        Check if you're a member or not... <DotLoader color="#7289da" size={20} className="ml-8" />
      </div>
    );

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="w-full text-center text-neutral-800 bg-white rounded-xl p-8 space-y-8">
          {/* LOGOUT BUTTON */}
          <div className="text-end">
            {session ? (
              <button
                className="bg-[#7289da] text-white px-4 py-1.5 rounded-md hover:bg-[#4d78d3] transition-all duration-300 active:scale-[0.98]"
                onClick={() => signOut()}
              >
                log out
              </button>
            ) : (
              <button onClick={() => signIn()}>Sing in</button>
            )}
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <Image
              src={session?.user?.image!}
              alt={session?.user?.name!}
              width={150}
              height={150}
              className="object-cover object-center rounded-full"
            />
          </div>

          {/* USER INFO */}
          <div>
            <h1 className="text-3xl mb-2">{session?.user?.name}</h1>
            <p>{session?.user?.email}</p>
          </div>

          {/* PROVIDER */}
          <div className="pb-16 border-b-2">
            <span className="mb-2 inline-block">You logged in using</span>

            <span className="bg-[#7289da] text-white px-4 py-1.5 rounded-md ml-2">
              {session?.user?.provider}
            </span>
          </div>

          {/* WEBSITE INFO */}
          <div className="space-y-6">
            <p className="text-sm">{text1}</p>
            <p className="text-xs font-bold">{text2}</p>
            <p className="text-sm">
              <Link
                href="https://github.com/shokouhSkr/full-authentication"
                className="flex gap-2 items-center justify-center"
              >
                Source code: <AiFillGithub className="text-3xl" />
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
