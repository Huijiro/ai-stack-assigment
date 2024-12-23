import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export type Resource = {
  resource_id: string;
  inode_type: "directory" | "file";
  inode_path: {
    path: string;
  };
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authToken = await verifyAuthToken();
  const connectionId = (await params).id;

  if (!connectionId) {
    return NextResponse.json({ error: "No connection id provided" });
  }

  const URL = `${BACKEND_URL}/connections/${connectionId}/resources`;

  const response = await fetch(URL, {
    headers: {
      Authorization: authToken.value,
    },
  });

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as Resource[];

  return NextResponse.json(data);
}
