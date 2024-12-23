import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextRequest, NextResponse } from "next/server";
import { Resource } from "../../../connection/[connectionId]/resources/route";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authToken = await verifyAuthToken();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "No connection id provided" });
  }

  const URL = `${BACKEND_URL}/knowledge_bases/${id}`;

  const response = await fetch(URL, {
    headers: {
      Authorization: authToken.value,
    },
  });

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as Resource;

  return NextResponse.json(data);
}
