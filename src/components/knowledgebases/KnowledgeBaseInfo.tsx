"use client";
import { fetcher } from "@/app/lib/swr";
import { useKBStore } from "@/context/KBContext";
import useSWR from "swr";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import RootResource from "../resource/Root";
import { KnowledgeBase } from "@/app/api/knowledge_bases/[id]/resources/children/route";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function KnowledgeBaseInfo() {
  const { knowledge_base_id } = useKBStore();
  const [canSync, setCanSync] = useState(true);
  const { data, isLoading } = useSWR<KnowledgeBase>(
    knowledge_base_id
      ? `/api/knowledge_bases/${knowledge_base_id}/details`
      : null,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
              <Skeleton className="h-7 w-full min-w-48" />
            </h1>
            <h2 className="text-xl font-bold min-w-24">
              <Skeleton className="h-4 w-full opacity-50" />
            </h2>
          </div>
          <Button disabled={true}>
            {" "}
            <RefreshCw /> Sync
          </Button>
        </div>
        <Skeleton className="h-7 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            {data?.name ?? "No name provided"}
          </h1>
          <h2 className="text-xl font-bold">
            {data?.description ?? "No description provided"}
          </h2>
        </div>
        <Button
          onClick={async () => {
            setCanSync(false);
            const response = await fetch(
              "/api/knowledge_bases/sync/" + knowledge_base_id,
            );

            if (!response.ok) {
              console.error(response);
            }

            setCanSync(true);

            return;
          }}
          disabled={!canSync}
        >
          {" "}
          <RefreshCw /> Sync
        </Button>
      </div>
      <RootResource type="knowledge_bases" id={knowledge_base_id} />
    </div>
  );
}
