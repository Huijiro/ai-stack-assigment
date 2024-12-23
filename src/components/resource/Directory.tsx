"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { fetcher } from "@/app/lib/swr";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import Item from "./Item";
import { Folder } from "lucide-react";
import ItemList from "./ItemList";

type Props = {
  resource: Resource;
  blocked?: boolean;
};

export default function Directory({ resource, blocked }: Props) {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSWR<Resource[]>(
    open
      ? `/api/connection/${params.id}/resources/children?resource_id=${resource.resource_id}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

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
      {open && (
        <ItemList>
          {data?.map((resource) => (
            <Item
              key={resource.resource_id}
              resource={resource}
              blocked={blocked}
            />
          ))}
        </ItemList>
      )}
    </div>
  );
}
