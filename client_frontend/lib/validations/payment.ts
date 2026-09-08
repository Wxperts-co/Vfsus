import { z } from "zod";

// Name regex allows letters, spaces, hyphens, periods, and apostrophes
const NAME_REGEX = /^[A-Za-zÀ-ÿ\s.'-]+$/;

export const paymentFormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(NAME_REGEX, "Please enter a valid first name"),
  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(NAME_REGEX, "Please enter a valid last name"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(100, "Email is too long"),
  amount: z
    .coerce
    .number({ error: "Please enter a valid payment amount" })
    .min(1, "Minimum payment amount is $1.00")
    .max(50000, "Maximum single transaction limit is $50,000.00"),
  captchaAnswer: z.coerce.number({
    error: "Please answer the math captcha with a number",
  }),
  captchaToken: z.string().min(1, "Captcha token is required, please refresh"),
  hp_website: z.string().optional(),
});

export type PaymentFormInput = z.infer<typeof paymentFormSchema>;
