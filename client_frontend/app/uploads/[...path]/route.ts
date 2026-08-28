import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { existsSync, statSync } from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await context.params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Prevent directory traversal
    const safeSegments = pathSegments.filter((seg) => seg !== ".." && seg !== ".");
    const relativeFilePath = path.join(...safeSegments);
    const fullFilePath = path.join(process.cwd(), "public", "uploads", relativeFilePath);

    if (!existsSync(fullFilePath)) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const stat = statSync(fullFilePath);
    if (!stat.isFile()) {
      return new NextResponse("Not a file", { status: 404 });
    }

    const ext = path.extname(fullFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Handle range request for video streaming
    const range = req.headers.get("range");
    if (range && (contentType.startsWith("video/") || contentType.startsWith("audio/"))) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;

      const fileHandle = await fs.open(fullFilePath, "r");
      const buffer = Buffer.alloc(chunksize);
      await fileHandle.read(buffer, 0, chunksize, start);
      await fileHandle.close();

      return new NextResponse(buffer, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    const fileBuffer = await fs.readFile(fullFilePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
