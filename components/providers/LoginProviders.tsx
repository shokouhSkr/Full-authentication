"use client";

import { useEffect, useState } from "react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { createIconJsx } from "@/helpers/utils";

const LoginProviders = ({ tab, csrfToken }: { tab: string; csrfToken: string }) => {
  const [providerArray, setProviderArray] = useState<ClientSafeProvider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      const providerArray = providers ? Object.values(providers) : [];
      setProviderArray(providerArray);
    };

    fetchProviders();
  }, []);

  return (
    <div
      className={`${
        tab === "signup" ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col"
      } w-full gap-4 mt-8`}
    >
      {providerArray.map((provider: any) => {
        if (provider.name === "Credentials") return;

        return (
          <form key={provider.id} method="POST" action={`/api/auth/signin/${provider.id}`}>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

            <button
              type="button"
              onClick={() => signIn(provider.id)}
              className={`font-medium text-white w-full flex items-center justify-center gap-4 rounded-md px-4 py-2 cursor-pointer ${
                provider.name === "Discord" ? "bg-[#7289da]" : "bg-neutral-800"
              }`}
            >
              <span className="text-xl">{createIconJsx(provider.id)}</span>
              {tab === "signup" ? `Sign up with ${provider.name}` : `Sign in with ${provider.name}`}
            </button>
          </form>
        );
      })}
    </div>
  );
};

export default LoginProviders;
