"use client";
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
import { useIndexStore } from "@/context/IndexContext";
import { useParams } from "next/navigation";
import { useKBStore } from "@/context/KBContext";
import { KnowledgeBase } from "@/app/api/knowledge_bases/[id]/resources/children/route";

const formSchema = z.object({
  name: z.string().email(),
  description: z.string(),
});

// WARN: The second form is need for NextJS server actions
export default function CreateKnowledgeBase() {
  const { IDs: connection_source_ids } = useIndexStore();
  const { id: connection_id } = useParams();
  const { setKnowledgeBaseId } = useKBStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await fetch("/api/knowledge_bases", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.getValues("name"),
              description: form.getValues("description"),
              connection_id: connection_id,
              connection_source_ids: connection_source_ids,
            }),
          });

          if (!response.ok) {
            console.error(response);
            return;
          }

          const body = (await response.json()) as KnowledgeBase;

          setKnowledgeBaseId(body.knowledge_base_id);
        }}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={connection_source_ids.length === 0}
        >
          Create Knowledge Base
        </Button>
      </form>
    </Form>
  );
}
