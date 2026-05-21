import type { ReadStream } from "fs";
import { createReadStream, statSync } from "fs";
import path from "path";
import { PassThrough } from "stream";

import type { ImageFit } from "~/lib/image-types";

export type { ImageFit } from "~/lib/image-types";
export { IMAGE_FITS } from "~/lib/image-types";

export const ASSETS_ROOT = "public/images";

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

type SharpModule = typeof import("sharp");

let sharpModule: SharpModule | null | undefined;

export async function getSharp(): Promise<SharpModule | null> {
  if (sharpModule !== undefined) {
    return sharpModule;
  }

  try {
    sharpModule = (await import("sharp")).default;
    return sharpModule;
  } catch {
    sharpModule = null;
    return null;
  }
}

export function readFileAsStream(src: string): ReadStream {
  const srcPath = path.join(ASSETS_ROOT, src);
  const fileStat = statSync(srcPath);
  if (!fileStat.isFile()) {
    throw Object.assign(new Error(`${srcPath} is not a file`), {
      code: "ENOENT",
    });
  }
  return createReadStream(srcPath);
}

export function serveStaticImage(src: string): Response {
  const srcPath = path.join(ASSETS_ROOT, src);
  const fileStat = statSync(srcPath);
  if (!fileStat.isFile()) {
    throw Object.assign(new Error(`${srcPath} is not a file`), {
      code: "ENOENT",
    });
  }

  const contentType =
    MIME_BY_EXT[path.extname(src).toLowerCase()] || "application/octet-stream";
  const stream = createReadStream(srcPath);

  return new Response(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function streamingResize(
  imageStream: ReadStream,
  width: number | undefined,
  height: number | undefined,
  fit: ImageFit
): Promise<Response> {
  const sharp = await getSharp();
  if (!sharp) {
    throw new Error("Image resizing is unavailable (sharp is not installed).");
  }

  const sharpTransforms = sharp()
    .resize({
      width,
      height,
      fit,
      position: sharp.strategy.attention,
    })
    .jpeg({ mozjpeg: true, quality: 80 });

  const passthroughStream = new PassThrough();
  imageStream.pipe(sharpTransforms).pipe(passthroughStream);

  return new Response(passthroughStream as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
