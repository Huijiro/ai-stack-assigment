import { Me } from "@/app/api/me/route";
import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextRequest, NextResponse } from "next/server";

export type Sync = {
  upsert_group_task_id: string;
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authToken = await verifyAuthToken();
  const response = await fetch(`${BACKEND_URL}/organizations/me/current`, {
    headers: {
      Authorization: authToken.value,
    },
  });

  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "No connection id provided" });
  }

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as Me;

  const syncResponse = await fetch(
    `${BACKEND_URL}/knowledge_bases/sync/trigger/${id}/${data.org_id}`,
  );

  if (!syncResponse.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const syncData = (await syncResponse.json()) as Sync;

  return NextResponse.json(syncData);
}
