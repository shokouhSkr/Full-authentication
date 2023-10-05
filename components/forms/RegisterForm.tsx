"use client";

import { CiUser } from "react-icons/ci";
import Input from "../common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormSchemaType = z.infer<typeof FormSchema>;

// VALIDATION
const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(32, "First name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.first_name?.message}
          // error="error's here"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default RegisterForm;
