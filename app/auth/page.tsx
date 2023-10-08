import Background from "@/components/background/Background";
import Container from "@/components/common/Container";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";
import { toast } from "react-toastify";

const AuthPage = () => {
  return (
    <div className="flex items-center justify-between p-4 lg:p-8">
      {/* FORM */}
      <div className="space-y-10 flex flex-col items-center justify-center">
        {/* TITLE */}
        <div className="space-y-4 text-center">
          <h1 className="font-semibold text-4xl">Sign up</h1>
          <p className="text-xl">
            You already have an account?{" "}
            <Link
              href="/"
              className="text-blue-600 ml-1 hover:text-blue-700 hover:underline-offset-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* SIGN UP FORM */}
        <RegisterForm />
      </div>

      {/* BACKGROUND */}
      <Background image={`../../images/reset.png`} />
    </div>
  );
};

export default AuthPage;
