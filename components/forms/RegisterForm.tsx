"use client";

import Input from "../common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiUser, CiMail, CiPhone } from "react-icons/ci";

type FormSchemaType = z.infer<typeof FormSchema>;

// VALIDATION
const FormSchema = z.object({
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
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:grid md:grid-cols-2">
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
      </div>

      <button type="submit" className="bg-blue-500 rounded px-4 py-1 mt-5">
        submit
      </button>
    </form>
  );
};

export default RegisterForm;
