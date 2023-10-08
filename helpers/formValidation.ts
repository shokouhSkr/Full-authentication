import { z } from "zod";

type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z
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
      .min(6, "Password must be at least 6 characters.")
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
