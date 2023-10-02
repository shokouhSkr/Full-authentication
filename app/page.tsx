"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log("session: ", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>welcome {session?.user?.name}</h1>
      {session && (
        <Image
          src={session?.user?.image!}
          alt={session?.user?.name!}
          width={200}
          height={200}
          className="object-cover object-center rounded-full"
        />
      )}

      {session ? (
        <button onClick={() => signOut()}>Sing out</button>
      ) : (
        <button onClick={() => signIn()}>Sing in</button>
      )}
    </main>
  );
}
