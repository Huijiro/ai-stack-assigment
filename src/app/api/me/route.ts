import { NextResponse } from "next/server";
import { verifyAuthToken } from "../../lib/dal";
import { BACKEND_URL } from "@/app/lib/constants";

export async function GET() {
  const authToken = await verifyAuthToken();
  const response = await fetch(`${BACKEND_URL}/organizations/me/current`, {
    headers: {
      Authorization: authToken.value,
    },
  });

  if (!response.ok) {
    console.error(response);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as {
    org_id: string;
  };

  return NextResponse.json(data);
}
