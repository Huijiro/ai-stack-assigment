"use client";
interface Props {
  children: React.ReactNode;
  type?: "connection" | "knowledge_bases";
}

export default function ItemList({ children, type }: Props) {
  return (
    <div
      className={
        type === "knowledge_bases" ? "pl-4" : "" + " flex flex-col gap-2"
      }
    >
      {children}
    </div>
  );
}
