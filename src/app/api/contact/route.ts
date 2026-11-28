import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data || typeof data !== "object" || data.botcheck) return NextResponse.json({ success: false }, { status: 400 });
    const { name, email, subject, message } = data;
    if (![name, email, subject, message].every(v => typeof v === "string" && v.trim()) || name.length > 100 || email.length > 254 || subject.length > 200 || message.length > 5000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    const accessKey = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) return NextResponse.json({ success: false }, { status: 503 });
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, name, email, subject, message }),
    });
    const result = await response.json();
    const success = response.ok && result.success === true;
    return NextResponse.json({ success }, { status: success ? 200 : 502 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
