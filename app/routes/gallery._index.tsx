import type { Route } from "./+types/gallery._index";

import { GalleryGrid } from "~/components/gallery/GalleryGrid";
import images from "../../public/images/index.json";
import { getUserId } from "~/lib/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await getUserId(request);
  return { isAuthenticated: Boolean(userId) };
}

export function meta(): Route.MetaDescriptors {
  return [{ title: "Gallery" }];
}

export default function GalleryPage({ loaderData }: Route.ComponentProps) {
  return (
    <GalleryGrid
      images={images}
      isAuthenticated={loaderData.isAuthenticated}
    />
  );
}
