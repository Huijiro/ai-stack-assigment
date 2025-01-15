"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { fetcher } from "@/app/lib/swr";
import useSWR from "swr/immutable";
import Item from "./Item";
import { Folder } from "lucide-react";
import ItemList from "./ItemList";
import Loading from "./Loading";
import { sortResource } from "@/lib/utils";

type Props = {
  type: "connection" | "knowledge_bases";
  id: string;
};

// This component is responsible for rendering the root resource and the first level of children
export default function RootResource({ type, id }: Props) {
  let URL = `/api/${type}/${id}/resources/children`;

  if (type === "knowledge_bases") {
    URL += `?resource_path=/`;
  }
  const { data, isLoading, error } = useSWR<Resource[]>(URL, fetcher, {
    refreshInterval: type === "knowledge_bases" ? 1000 : 10000,
  });

  if (error) {
    <div className="flex flex-col w-[48rem] gap-2 cursor-pointer">
      <div className="flex gap-2 cursor-pointer">
        <Folder /> /
      </div>
      <div className="pl-2">Error: {error}</div>
    </div>;
  }

  return (
    <div className="flex flex-col w-[48rem] gap-2 cursor-pointer">
      <div className="flex gap-2 cursor-pointer">
        <Folder /> /
      </div>
      <div className="pl-2">
        {isLoading ? (
          <Loading />
        ) : (
          <ItemList>
            {data.sort(sortResource).map((resource, index) => (
              <Item key={index} resource={resource} type={type} id={id} />
            ))}
          </ItemList>
        )}
      </div>
    </div>
  );
}
