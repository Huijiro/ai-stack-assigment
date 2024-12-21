import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextResponse } from "next/server";

export type Connection = {
  connection_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export async function GET(req: Request) {
  const authToken = await verifyAuthToken();

  const URL = `${BACKEND_URL}/connections`;
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

  const data = (await response.json()) as Connection[];

  return NextResponse.json(data);
}
