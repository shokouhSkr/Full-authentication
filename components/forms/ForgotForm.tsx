"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiMail, CiLock } from "react-icons/ci";
import SlideButton from "../buttons/SlideButton";
import Input from "./Input";
import { ForgetFormSchema } from "@/helpers/formValidation";
import AuthHeader from "./AuthHeader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

type ForgetFormSchemaType = z.infer<typeof ForgetFormSchema>;

const ForgetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetFormSchemaType>({
    resolver: zodResolver(ForgetFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ForgetFormSchemaType> = async (values) => {
    try {
      const { data: message } = await axios.post("/api/auth/forget", {
        email: values.email,
      });

      toast.success(message);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <AuthHeader label="Forgot password" message="Sign in instead?" btnLabel="Sign in" />

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
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

        <SlideButton
          type="submit"
          text="Send email"
          slide_text="Secure"
          icon={<CiLock />}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
};

export default ForgetForm;
