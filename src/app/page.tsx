"use client";

import useSWR from "swr";
import { fetcher } from "./lib/swr";
import { Connection } from "./api/connection/route";
import { ConnectionSelector } from "@/components/ConnectionSelector";

export default function Home() {
  const { data, isLoading, error } = useSWR<Connection[]>(
    "/api/connection",
    fetcher,
  );

  if (error) {
    return <div>failed to load</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div>
      <ConnectionSelector connections={data} />
    </div>
  );
}
