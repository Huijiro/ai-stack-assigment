import { BACKEND_URL } from "@/app/lib/constants";
import { verifyAuthToken } from "@/app/lib/dal";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { KnowledgeBase } from "./[id]/resources/children/route";

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  connection_id: z.string(),
  connection_source_ids: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const authToken = await verifyAuthToken();

  const URL = `${BACKEND_URL}/knowledge_bases`;

  const body = await req.json();

  const validatedFields = bodySchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({
      error: validatedFields.error.flatten().fieldErrors,
    });
  }

  const knowledgeBase = {
    connection_id: validatedFields.data.connection_id,
    connection_source_ids: validatedFields.data.connection_source_ids,
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    indexing_params: {
      ocr: false,
      unstructured: true,
      embedding_params: {
        embedding_model: "text-embedding-ada-002",
        api_key: null,
      },
      chunker_params: {
        chunk_size: 1500,
        chunk_overlap: 500,
        chunker: "sentence",
      },
    },
    org_level_role: null,
    cron_job_id: null,
  };

  console.log(knowledgeBase);

  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken.value,
    },
    method: "POST",
    body: JSON.stringify(knowledgeBase),
  });

  if (!response.ok) {
    console.error(response);
    const body = await response.json();
    console.error(body);
    return NextResponse.json({ error: response.statusText });
  }

  const data = (await response.json()) as KnowledgeBase;

  return NextResponse.json(data);
}
