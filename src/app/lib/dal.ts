import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifyAuthToken = cache(async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("Authorization");

  if (!authToken) {
    redirect("/login");
  }

  return authToken;
});
