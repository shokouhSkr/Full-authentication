"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiMail, CiLock } from "react-icons/ci";
import Link from "next/link";
import SlideButton from "../buttons/SlideButton";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginFormSchema } from "@/helpers/formValidation";
import AuthHeader from "./AuthHeader";

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (values) => {
    try {
      console.log(values);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <AuthHeader label="Login" message="Not a member yet?" btnLabel="Sign up" path="signup" />

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          <div className="space-y-2">
            <Input
              name="password"
              label="Password"
              // type={showPassword ? "text" : "password"}
              type="password"
              icon={<CiLock />}
              placeholder="*********"
              register={register}
              error={errors?.password?.message}
              disabled={isSubmitting}
            />
          </div>
        </div>

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
