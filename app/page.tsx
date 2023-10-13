"use client";

import Container from "@/components/common/Container";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const text1: string =
  "This is a full build that covers the full authentication process from login, Register, sending emails (for activating account,reset password and password change notice), forgot password, reset password ,advanced form validation, protected routes, session manipulation...";
const text2: string =
  "In this build we used Next js, Typescript, Mongodb, prisma, Next auth, React-hook-form, Zod,Axios, Nodemailer, Smtp service, Gmail stmp, React-toastify, Zxcvbn, Handlebars, BcryptJs...";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <div>loading...</div>;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="w-full border-4 text-center text-neutral-800 border-pink-900 rounded-lg p-8 space-y-8">
          {/* LOGOUT BUTTON */}
          <div className="text-end">
            {session ? (
              <button
                className="bg-pink-600 px-4 py-1 rounded-md hover:bg-pink-700 transition-all duration-300 active:scale-[0.98] tracking-wider uppercase"
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
          <div className="pb-16 border-b-2 ">
            You logged in using
            <span className="bg-pink-600 px-4 py-1 rounded-md ml-2">{session?.user?.provider}</span>
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

          {/* REFACTOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
          {/* LINKS */}
          <div className="flex justify-center gap-4 md:gap-6">
            <Link
              href="/"
              className="flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <FaYoutube className="text-3xl" />
            </Link>
            <Link
              href="/"
              className="flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <FaTwitter className="text-3xl" />
            </Link>
            <Link
              href="/"
              className="flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <FaInstagram className="text-3xl" />
            </Link>
            <Link
              href="/"
              className="flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin className="text-3xl" />
            </Link>
            <Link
              href="/"
              className="flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <AiFillGithub className="text-3xl" />
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
