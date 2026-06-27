import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "contacts.json");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || "",
    message,
    date: new Date().toISOString(),
    read: false,
  };

  let contacts = [];
  if (fs.existsSync(FILE)) {
    contacts = JSON.parse(fs.readFileSync(FILE, "utf8"));
  }
  contacts.unshift(entry);
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(contacts, null, 2));

  return NextResponse.json({ ok: true, message: "Message received!" });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (token !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!fs.existsSync(FILE)) return NextResponse.json([]);
  const contacts = JSON.parse(fs.readFileSync(FILE, "utf8"));
  return NextResponse.json(contacts);
}
