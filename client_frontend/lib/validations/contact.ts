import { z } from "zod";

export const MAX_COMMENT_WORDS = 200;

export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  address: z
    .string()
    .trim()
    .min(3, "Address is required")
    .max(200, "Address is too long"),
  citytown: z
    .string()
    .trim()
    .min(2, "City/Town is required")
    .max(100, "City/Town is too long"),
  province: z
    .string()
    .trim()
    .min(2, "State is required")
    .max(100, "State is too long"),
  postalcode: z
    .string()
    .trim()
    .min(3, "Zip code is required")
    .max(20, "Zip code is too long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s().]+$/, "Enter a valid phone number"),
  comments: z
    .string()
    .trim()
    .min(1, "Please tell us how we can help")
    .refine((val) => countWords(val) <= MAX_COMMENT_WORDS, {
      message: `Comments must not exceed ${MAX_COMMENT_WORDS} words`,
    }),
  captchaAnswer: z.coerce.number({
    error: "Please answer the captcha with a number",
  }),
  captchaToken: z.string().min(1, "Captcha token is missing, please refresh"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
