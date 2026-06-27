import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

function isAuthenticated(req: NextRequest) {
  return req.cookies.get("admin_token")?.value === "authenticated";
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const doc = await db.collection("cms").findOne({ key: "main" });
    return NextResponse.json(doc ? doc.data : {});
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const db = await getDb();
    await db.collection("cms").updateOne(
      { key: "main" },
      { $set: { data: body } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
