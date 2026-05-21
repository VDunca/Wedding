import type { Route } from "./+types/assets.resize.$";

import { IMAGE_FITS, type ImageFit } from "~/lib/image-types";
import {
  readFileAsStream,
  serveStaticImage,
  streamingResize,
} from "~/lib/image-resize.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  const src = params["*"] ?? "";
  const searchParams = new URL(request.url).searchParams;

  const width = searchParams.has("w")
    ? Number.parseInt(searchParams.get("w") ?? "0", 10)
    : undefined;
  const height = searchParams.has("h")
    ? Number.parseInt(searchParams.get("h") ?? "0", 10)
    : undefined;

  let fit: ImageFit = "contain";
  if (searchParams.has("fit")) {
    const fitParam = searchParams.get("fit") ?? "";
    if (IMAGE_FITS.includes(fitParam as ImageFit)) {
      fit = fitParam as ImageFit;
    }
  }

  try {
    if (!width && !height) {
      return serveStaticImage(src);
    }

    const readStream = readFileAsStream(src);
    return await streamingResize(readStream, width, height, fit);
  } catch (error: unknown) {
    if (shouldServeOriginal(error)) {
      try {
        return serveStaticImage(src);
      } catch (fallbackError: unknown) {
        return handleError(fallbackError);
      }
    }
    return handleError(error);
  }
}

function shouldServeOriginal(error: unknown) {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    message.includes("sharp") ||
    message.includes("resize") ||
    message.includes("installing")
  );
}

function handleError(error: unknown) {
  const err = error as Error & { code?: string };
  if (err.code === "ENOENT") {
    return new Response("image not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }

  return new Response(err.message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
