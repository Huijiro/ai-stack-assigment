"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { fetcher } from "@/app/lib/swr";
import { useState } from "react";
import useSWR from "swr";
import Item from "./Item";
import { Folder } from "lucide-react";
import ItemList from "./ItemList";
import { sortResource } from "@/lib/utils";

type Props = {
  resource: Resource;
  blocked?: boolean;
  type: "connection" | "knowledge_bases";
  id: string;
};

export default function Directory({ resource, blocked, type, id }: Props) {
  const [open, setOpen] = useState(false);

  let URL = `/api/${type}/${id}/resources/children`;

  if (type === "knowledge_bases") {
    URL += `?resource_path=${resource.inode_path.path}`;
  } else {
    URL += `?resource_id=${resource.resource_id}`;
  }

  const { data, isLoading } = useSWR<Resource[]>(open ? URL : null, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const { inode_path } = resource;
  const displayName = inode_path.path.split("/").pop();

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={async () => {
          setOpen(!open);
        }}
        className={
          (isLoading ? "animate-pulse" : "") + ` flex gap-2 cursor-pointer`
        }
      >
        <Folder /> <span className="font-bold">{displayName}</span>
      </div>
      {open && !isLoading && data && (
        <ItemList type={type}>
          {data.sort(sortResource).map((resource, index) => (
            <Item
              key={index}
              resource={resource}
              blocked={blocked}
              type={type}
              id={id}
            />
          ))}
        </ItemList>
      )}
    </div>
  );
}
