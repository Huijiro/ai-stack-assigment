import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
