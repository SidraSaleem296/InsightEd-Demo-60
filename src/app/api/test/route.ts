import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.testKey || body.testKey !== "testValue") {
      return NextResponse.json({ error: "Invalid or missing data" }, { status: 400 });
    }

    return NextResponse.json({ message: "Post request received successfully!" });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Failed to process POST request" }, { status: 500 });
  }
}
