import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, budget, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const db = await getDb();
    await db.collection("contacts").insertOne({
      name,
      email,
      subject: subject || "",
      budget: budget || "",
      message,
      read: false,
      createdAt: new Date(),
    });
    return NextResponse.json({ ok: true, message: "Message received!" });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (token !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const contacts = await db
      .collection("contacts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
