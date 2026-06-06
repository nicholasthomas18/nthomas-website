import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

function isAllowedFile(file: string) {
  return (
    /^(0[1-3])_[a-z0-9_]+\.html$/i.test(file) &&
    !file.includes("..") &&
    !file.includes("/") &&
    !file.includes("\\")
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!isAllowedFile(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "March Madness",
    "web_charts",
    file
  );

  try {
    const html = await fs.readFile(filePath, "utf8");
    return new NextResponse(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // We intentionally allow the chart HTML to load Plotly from CDN and run scripts.
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

