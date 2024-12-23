"use client";
import KnowledgeBaseSelector from "@/components/knowledgebases/KnowledgeBaseSelector";
import Root from "@/components/resource/Root";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{
    id: string;
  }>();
  return (
    <main className="h-screen flex py-10 justify-center">
      <div className="flex flex-col gap-4 h-full p-8">
        <ScrollArea className="h-3/4">
          <Root type="connection" id={params.id} />
        </ScrollArea>
      </div>
      <KnowledgeBaseSelector />
    </main>
  );
}
