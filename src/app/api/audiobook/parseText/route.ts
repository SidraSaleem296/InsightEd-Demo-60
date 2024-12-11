import { NextResponse } from "next/server";
import pdfParse from "pdf-parse"; // Make sure this imports correctly

export const runtime = 'nodejs'; // Ensure Node.js runtime

export async function POST(req: Request) {
  try {
    console.log("Request received"); // Debugging
    const { pdf } = await req.json();
    console.log("Parsed request body:", pdf); // Debugging

    if (!pdf) {
      console.log("No PDF provided");
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(pdf, "base64");
    console.log("Buffer created"); // Debugging

    const data = await pdfParse(buffer);
    console.log("PDF parsed successfully:", data.text); // Debugging

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return NextResponse.json({ error: "Failed to extract text from PDF" }, { status: 500 });
  }
}
