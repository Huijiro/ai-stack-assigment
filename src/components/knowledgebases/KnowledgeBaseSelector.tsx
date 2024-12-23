import { useKBStore } from "@/context/KBContext";
import CreateKnowledgeBase from "./CreateKnowledgeBase";
import KnowledgeBaseInfo from "./KnowledgeBaseInfo";

export default function KnowledgeBaseSelector() {
  const { knowledge_base_id } = useKBStore();

  if (!knowledge_base_id) {
    return <CreateKnowledgeBase />;
  }

  return <KnowledgeBaseInfo />;
}
