"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { CiUser, CiMail, CiPhone, CiLock } from "react-icons/ci";
import Link from "next/link";
import SlideButton from "../buttons/SlideButton";
import Input from "../common/Input";
import { FormSchema } from "@/helpers/formValidation";
import axios from "axios";
import { toast } from "react-toastify";

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const [passwordScore, setPasswordScore] = useState(0);

  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/signup", { ...values });
      console.log("data: ", data);

      if (data.status === 401) {
        toast.error(data.message);
      }
      if (data.status === 200) {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
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
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 sm:grid sm:grid-cols-2 sm:gap-x-4">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.first_name?.message} // first_name comes from form schema
          // error="error is here"
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
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
          name="phone"
          label="Phone number"
          type="text"
          icon={<CiPhone />}
          placeholder="+98 (xxx) xxx-xxxx"
          register={register}
          error={errors?.phone?.message}
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
        <div className="my-6">
          <input
            type="checkbox"
            id="accept"
            className="mr-2 focus:ring-0 rounded"
            {...register("accept")}
          />
          <label htmlFor="accept" className="text-gray-700">
            I accept the{" "}
            <Link href="/" target="_blank" className="text-blue-600">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/" target="_blank" className="text-blue-600">
              privacy policy
            </Link>
          </label>
          {errors?.accept && <p className="text-sm text-red-600 mt-1">{errors.accept.message}</p>}
        </div>
      </div>

      <SlideButton
        type="submit"
        text="Sign up"
        slide_text="Secure sign up"
        icon={<CiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default RegisterForm;
