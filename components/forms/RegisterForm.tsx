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

type FormSchemaType = z.infer<typeof FormSchema>;

// VALIDATION
const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(32, "First name must be less than 32 characters.")
      .regex(/^[a-zA-Z]+$/, "No special characters allowed."),

    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(32, "Last name must be less than 32 characters.")
      .regex(/^[a-zA-Z]+$/, "No special characters allowed."),

    email: z.string().email("Please enter a valid email address."),

    phone: z.string().regex(/^\+98 \(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number"),

    password: z
      .string()
      .min(2, "Password must be at least 6 characters.")
      .max(52, "Password must be less than 52 characters."),

    confirmPassword: z.string(),

    // for checkbox and other booleans
    accept: z.literal(true, {
      errorMap: () => ({
        message: "Please agree to all the terms and conditions before continuing.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

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

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

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
          // error="error's here"
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
          // error="error's here"
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
          // error="error's here"
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
          // error="error's here"
          disabled={isSubmitting}
        />
        <div className="space-y-2">
          <Input
            name="password"
            label="Password"
            type="password"
            icon={<CiLock />}
            placeholder="*********"
            register={register}
            error={errors?.password?.message}
            // error="error's here"
            disabled={isSubmitting}
          />
          {watch().password?.length > 0 && (
            <div className="flex justify-between mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="w-1/6 mt-0.5">
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
          // error="error's here"
          disabled={isSubmitting}
        />
        <div className="mt-3">
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
