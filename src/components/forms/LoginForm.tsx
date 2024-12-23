"use client";

import { useActionState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions/auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// WARN: The second form is need for NextJS server actions
export default function LoginForm() {
  const [_state, action, isPending] = useActionState(login, undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Password" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
