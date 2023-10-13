"use client";

import { useEffect, useState } from "react";
import Background from "@/components/background/Background";
import Container from "@/components/common/Container";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { getCsrfToken } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Divider from "@/components/common/Divider";
import LoginProviders from "@/components/providers/LoginProviders";

const AuthPage = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "login";
  const callbackUrl = searchParams.get("callbackUrl") || (process.env.NEXT_PUBLIC_URL as string);

  const fetchCsrfToken = async () => {
    const token = await getCsrfToken();
    setCsrfToken(token as string);
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      {/* FORMS */}
      <div className="flex flex-col items-center justify-center">
        {tab === "login" ? (
          <LoginForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
        ) : (
          <RegisterForm />
        )}

        <Divider />
        <LoginProviders tab={tab} csrfToken={csrfToken} />
      </div>

      {/* BACKGROUND */}
      <Background image={`../../images/${tab === "login" ? "login" : "signup"}.png`} />
    </div>
  );
};

export default AuthPage;
