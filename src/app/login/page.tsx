"use client";

import { useActionState } from "react";
import { login } from "../actions/auth";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} method="POST">
      <label>
        Email
        <input type="email" name="email" placeholder="Email" />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="Password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
