import { Resource } from "@/app/api/connection/[connectionId]/resources/route";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortPath(pathA: string, pathB: string) {
  const shortA = pathA.split("/").pop() || "";
  const shortB = pathB.split("/").pop() || "";

  return shortA.localeCompare(shortB);
}

type Method = "alphabetical" | "type";

export function sortResource(
  a: Resource,
  b: Resource,
  method: Method | undefined = "type",
) {
  if (method === "alphabetical") {
    return sortPath(a.inode_path.path, b.inode_path.path);
  }

  return a.inode_type.localeCompare(b.inode_type);
}
