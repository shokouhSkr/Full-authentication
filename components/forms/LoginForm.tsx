"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiMail, CiLock } from "react-icons/ci";
import SlideButton from "../buttons/SlideButton";
import Input from "./Input";
import { toast } from "react-toastify";
import { LoginFormSchema } from "@/helpers/formValidation";
import AuthHeader from "./AuthHeader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const LoginForm = ({ callbackUrl, csrfToken }: { callbackUrl: string; csrfToken: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (values) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });

    if (res.error) {
      return toast.error(res.error);
    }

    router.push("/");
  };

  return (
    <>
      <AuthHeader label="Login" message="Not a member yet?" btnLabel="Sign up" path="signup" />

      <form
        method="POST"
        action="/api/auth/signin/email"
        className="my-8 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
        <Input
          name="email"
          label="Email address"
          type="text"
          icon={<CiMail />}
          placeholder="example@example.com"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<CiLock />}
          placeholder="*********"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        <Link href="/reset-password" className="text-blue-500 mt-2 inline-block hover:underline">
          Forget password?
        </Link>

        <SlideButton
          type="submit"
          text="Login"
          slide_text="Secure login"
          icon={<CiLock />}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default LoginForm;
