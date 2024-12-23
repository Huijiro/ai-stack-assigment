import { Skeleton } from "../ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-4 w-full opacity-50" />
      <Skeleton className="h-2 w-full opacity-20" />
    </div>
  );
}
