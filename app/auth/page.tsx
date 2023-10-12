"use client";

import Background from "@/components/background/Background";
import Container from "@/components/common/Container";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "login";

  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      {/* FORMS */}
      <div className="space-y-10 flex flex-col items-center justify-center">
        {tab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      {/* BACKGROUND */}
      <Background
        image={`../../images/${
          tab === "login" ? "login" : tab === "reset" ? "reset" : "signup"
        }.png`}
      />
    </div>
  );
};

export default AuthPage;
