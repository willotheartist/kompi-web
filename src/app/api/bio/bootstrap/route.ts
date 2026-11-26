import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ error: "This development endpoint has been retired." }, { status: 410 }); }
