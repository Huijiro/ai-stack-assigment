"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { fetcher } from "@/app/lib/swr";
import useSWR from "swr/immutable";
import Item from "./Item";
import { Folder } from "lucide-react";
import ItemList from "./ItemList";

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
  const { data } = useSWR<Resource[]>(URL, fetcher);

  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div className="flex gap-2 cursor-pointer">
        <Folder /> /
      </div>
      <div className="pl-2">
        <ItemList>
          {data?.map((resource, index) => (
            <Item key={index} resource={resource} type={type} id={id} />
          ))}
        </ItemList>
      </div>
    </div>
  );
}
