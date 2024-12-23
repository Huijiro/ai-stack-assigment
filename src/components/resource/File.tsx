"use client";
import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { Files } from "lucide-react";

type Props = {
  resource: Resource;
};

export default function File({ resource }: Props) {
  const { inode_path } = resource;
  const fileName = inode_path.path.split("/").pop();
  return (
    <div className="flex gap-2">
      <Files /> {fileName}
    </div>
  );
}
