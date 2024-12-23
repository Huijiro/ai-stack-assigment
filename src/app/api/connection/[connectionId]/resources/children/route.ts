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

export type Params = {
  connectionId: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const authToken = await verifyAuthToken();
  const connectionId = (await params).connectionId;

  if (!connectionId) {
    return NextResponse.json({ error: "No connection id provided" });
  }
  let URL = `${BACKEND_URL}/connections/${connectionId}/resources/children`;

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("resource_id");

  if (query) {
    console.log("Getting children of resource", query);
    URL += `?resource_id=${query}`;
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

  const data = (await response.json()) as Resource[];

  return NextResponse.json(data);
}
