import type { Route } from "./+types/healthcheck";

import { prisma } from "~/lib/db.server";

export async function loader({ request }: Route.LoaderArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    const url = new URL("/", `http://${host}`);
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((response) => {
        if (!response.ok) return Promise.reject(response);
      }),
    ]);
    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck failed", { error });
    return new Response("ERROR", { status: 500 });
  }
}
