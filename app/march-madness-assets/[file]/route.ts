import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const ALLOWED_FILES = new Set(["MarchMadnessLogo.jpg"]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!ALLOWED_FILES.has(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "March Madness", file);

  try {
    const bytes = await fs.readFile(filePath);
    return new NextResponse(bytes, {
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=3600",
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

