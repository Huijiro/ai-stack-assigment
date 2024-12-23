"use client";

import LoginForm from "@/components/forms/LoginForm";

// WARN: The second form is need for NextJS server actions
export default function Login() {
  return (
    <main className="h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
