"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { CiLock } from "react-icons/ci";
import SlideButton from "../buttons/SlideButton";
import Input from "./Input";
import { ResetFormSchema } from "@/helpers/formValidation";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "./AuthHeader";
import { useRouter } from "next/navigation";

type ResetFormSchemaType = z.infer<typeof ResetFormSchema>;

const ResetForm = ({ token }: { token: string }) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormSchemaType>({
    resolver: zodResolver(ResetFormSchema),
  });
  const [passwordScore, setPasswordScore] = useState(0);
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetFormSchemaType> = async (values) => {
    try {
      const { data } = await axios.put("/api/auth/reset", {
        password: values.password,
        token: token,
      });

      reset();
      toast.success(data);
      router.push("/auth");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  /******************************/
  // PASSWORD VALIDATION

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };
  // console.log("password score: ", zxcvbn("1qazxsw23edc"));

  useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);
  /******************************/

  return (
    <>
      <AuthHeader label="Reset password" message="Sign in instead" btnLabel="Sign in" />

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 sm:grid">
          <div className="space-y-2">
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
            {watch().password?.length > 0 && (
              <div className="flex justify-between mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-1/6 mt-0.5">
                    <span
                      className={`block h-2 rounded-xl ${
                        passwordScore <= 2
                          ? "bg-red-400"
                          : passwordScore < 4
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
            icon={<CiLock />}
            placeholder="*********"
            register={register}
            error={errors?.confirmPassword?.message}
            disabled={isSubmitting}
          />
        </div>

        <SlideButton
          type="submit"
          text="Change password"
          slide_text="Secure"
          icon={<CiLock />}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default ResetForm;
