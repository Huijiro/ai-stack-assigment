"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { fetcher } from "@/app/lib/swr";
import { useParams } from "next/navigation";
import useSWR from "swr/immutable";
import Item from "./Item";
import { Folder } from "lucide-react";
import ItemList from "./ItemList";

export default function RootResource() {
  const params = useParams();
  const { data, isLoading, error } = useSWR<Resource[]>(
    `/api/connection/${params.id}/resources/children`,
    fetcher,
  );

  return (
    <>
      <div className="flex gap-2 cursor-pointer">
        <Folder /> /
      </div>
      <ItemList>
        {data?.map((resource) => (
          <Item key={resource.resource_id} resource={resource} />
        ))}
      </ItemList>
    </>
  );
}
