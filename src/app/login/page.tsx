import LoginForm from "@/components/forms/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// WARN: The second form is need for NextJS server actions
export default async function Login() {
  const cookie = await cookies();
  if (cookie.get("Authorization")) {
    redirect("/");
  }
  return (
    <main className="h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
