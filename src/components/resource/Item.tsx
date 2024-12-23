import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import Directory from "./Directory";
import File from "./File";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useIndexStore } from "@/context/IndexContext";

interface Props {
  // The resource object that will be rendered
  resource: Resource;
  // If the item is blocked, it will not be selectable
  blocked?: boolean;
  // If the resource is from connection or knowledge bases
  type: "connection" | "knowledge_bases";
  // The id of the resource
  id: string;
}

// This component is responsible for rendering the proper item in the resource tree
// and to manage the selection state of the item
export default function Item({ resource, blocked, type, id }: Props) {
  const [selected, setSelected] = useState(false);
  const { addFile, removeFile } = useIndexStore();

  // This is for the children in the recursion
  // to check if the parent blocked them, so they
  // can remove themselves from their selected status
  // and the list of selected IDs
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
        <Directory
          resource={resource}
          blocked={selected || blocked}
          type={type}
          id={id}
        />
      ) : (
        <File resource={resource} />
      )}
    </div>
  );
}
