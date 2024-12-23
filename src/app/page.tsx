"use client";

import useSWR from "swr";
import { fetcher } from "./lib/swr";
import { Connection } from "./api/connection/route";
import { ConnectionSelector } from "@/components/ConnectionSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export default function Home() {
  const { data, isLoading, error } = useSWR<Connection[]>(
    "/api/connection",
    fetcher,
  );

  if (error) {
    redirect("/login");
  }

  if (isLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <Skeleton className="h-[225px] w-[350px] rounded-xl" />
      </main>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8">
        {data ? (
          <>
            <h1 className="text-3xl font-bold">AI Stack Connections</h1>
            <ConnectionSelector connections={data} />
          </>
        ) : (
          <span>No connections found</span>
        )}
      </div>
    </main>
  );
}
