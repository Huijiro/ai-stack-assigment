import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import Directory from "./Directory";
import File from "./File";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useIndexStore } from "@/context/IndexContext";

interface Props {
  resource: Resource;
  blocked?: boolean;
}

export default function Item({ resource, blocked }: Props) {
  const [selected, setSelected] = useState(false);
  const { addFile, removeFile } = useIndexStore();

  useEffect(() => {
    if (selected) {
      removeFile(resource.resource_id);
      setSelected(false);
    }
  }, [blocked]);

  return (
    <div className="flex gap-2">
      <Checkbox
        checked={blocked || selected}
        disabled={blocked}
        onCheckedChange={(check) => {
          if (check) {
            addFile(resource.resource_id);
            setSelected(true);
          } else {
            removeFile(resource.resource_id);
            setSelected(false);
          }
        }}
      />
      {resource.inode_type === "directory" ? (
        <Directory resource={resource} blocked={selected || blocked} />
      ) : (
        <File resource={resource} />
      )}
    </div>
  );
}
