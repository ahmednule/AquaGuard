import { NextResponse } from "next/server";
import { TEST_CREDENTIALS, makeMockToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
    }

    if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
      const token = makeMockToken({ email });
      const res = NextResponse.json({ ok: true });
      res.cookies.set("aqua_auth", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
