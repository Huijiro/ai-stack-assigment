import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextResponse } from "next/server";

export type KnowledgeBase = {};

export async function GET(_req: Request) {
  const authToken = await verifyAuthToken();

  const URL = `${BACKEND_URL}/knowledge_bases`;
  const params = new URLSearchParams({
    connection_provider: "gdrive",
    limit: "1",
  });

  const response = await fetch(URL + `?${params.toString()}`, {
    headers: {
      Authorization: authToken.value,
    },
  });

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as KnowledgeBase;

  return NextResponse.json(data);
}
