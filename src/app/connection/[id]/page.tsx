"use client";
import { Resource } from "@/app/api/resource/route";
import { fetcher } from "@/app/lib/swr";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Page() {
  const params = useParams();
  const { data, isLoading, error } = useSWR<Resource[]>(
    `/api/resource?connection_id=${params.id}`,
    fetcher,
  );
  if (error) {
    return <div>failed to load</div>;
  }
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {data?.map((resource) => (
        <div key={resource.resource_id}>{resource.inode_path.path}</div>
      ))}
    </div>
  );
}
