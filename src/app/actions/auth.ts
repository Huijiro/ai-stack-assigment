"use server";
import { redirect } from "next/navigation";
import { LoginFormState, LoginFormSchema } from "../lib/definitions";
import { cookies } from "next/headers";

export async function getHeaders(email: string, password: string) {
  const supabaseURL = process.env.SUPABASE_AUTH_URL;
  const anonKey = process.env.ANON_KEY;

  if (!supabaseURL) {
    throw new Error("SUPABASE_AUTH_URL is not set");
  }

  if (!anonKey) {
    throw new Error("ANON_KEY is not set");
  }

  const requestURL = `${supabaseURL}/auth/v1/token?grant_type=password`;

  const response = await fetch(requestURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Apikey: anonKey,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      gotrue_meta_security: {},
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }

  const data = (await response.json()) as {
    access_token: string;
  };

  return data.access_token;
}

export async function createSession(email: string, password: string) {
  const cookieStore = await cookies();

  const authToken = await getHeaders(email, password);

  cookieStore.set("Authorization", `Bearer ${authToken}`, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createSession(
      validatedFields.data.email,
      validatedFields.data.password,
    );
  } catch (error) {
    return {
      message: "Failed to login",
    };
  }

  redirect("/");
}
