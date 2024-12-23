import KnowledgeBaseSelector from "@/components/knowledgebases/KnowledgeBaseSelector";
import Root from "@/components/resource/Root";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookie = await cookies();
  if (!cookie.get("Authorization")) {
    redirect("/login");
  }
  const { id } = await params;
  return (
    <main className="h-screen w-screen grid grid-cols-2 p-10 justify-center">
      <div className="flex flex-col gap-4 h-full">
        <h1 className="text-2xl font-bold">Connection</h1>
        <ScrollArea className="h-3/4">
          <Root type="connection" id={id} />
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <KnowledgeBaseSelector />
      </div>
    </main>
  );
}
