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

export const CreateKnowledgeBaseSchema = z.object({
  name: z.string().email(),
  description: z.string(),
});

export type CreateKnowledgeBaseState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
