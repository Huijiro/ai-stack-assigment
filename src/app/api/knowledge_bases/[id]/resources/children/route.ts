import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export type KnowledgeBase = {
  knowledge_base_id: string;
  connection_id: string;
  connection_source_id: string;
  connection_provider_type: "gdrive";
  name: string;
  description: string;
};

export type Params = {
  id: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const authToken = await verifyAuthToken();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "No connection id provided" });
  }
  let URL = `${BACKEND_URL}/knowledge_bases/${id}/resources/children`;

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("resource_path");

  if (query) {
    console.log("Getting children of resource", query);
    URL += `?resource_path=${query}`;
  }

  const response = await fetch(URL, {
    headers: {
      Authorization: authToken.value,
    },
  });

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as KnowledgeBase[];

  return NextResponse.json(data);
}
