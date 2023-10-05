import Container from "@/components/common/Container";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const AuthPage = () => {
  return (
    <Container>
      <div className="space-y-10">
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
    </Container>
  );
};

export default AuthPage;
