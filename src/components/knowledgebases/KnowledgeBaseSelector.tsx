"use client";
import { useKBStore } from "@/context/KBContext";
import CreateKnowledgeBase from "./CreateKnowledgeBase";
import KnowledgeBaseInfo from "./KnowledgeBaseInfo";

export default function KnowledgeBaseSelector() {
  const { knowledge_base_id } = useKBStore();

  return (
    <div className="p-4 border rounded-md">
      {knowledge_base_id ? <KnowledgeBaseInfo /> : <CreateKnowledgeBase />}
    </div>
  );
}
