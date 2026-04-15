import { NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";

export async function POST(req) {
  try {
    const dataSiswa = await req.json();

    // Memicu background job di Trigger.dev bernama "generate-ijazah"
    const handle = await tasks.trigger("generate-ijazah", dataSiswa);

    return NextResponse.json({ success: true, jobId: handle.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
