import { useState } from "react";

import { Carousel } from "~/components/gallery/Carousel";
import { Banner } from "~/components/layout/Banner";
import { Navbar } from "~/components/layout/Navbar";
import { Image } from "~/components/ui/Image";
import type images from "../../../public/images/index.json";

type GalleryImage = (typeof images)[number];

interface GalleryGridProps {
  images: GalleryImage[];
  isAuthenticated: boolean;
}

export function GalleryGrid({ images, isAuthenticated }: GalleryGridProps) {
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  return (
    <>
      <Banner />
      <Navbar />

      {activeImageId !== null && (
        <div
          className="fixed left-0 right-0 top-0 z-50 flex h-modal w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
          role="dialog"
          aria-modal="true"
        >
          <div className="h-full w-full">
            <Carousel
              images={images}
              startImage={activeImageId}
              onClose={() => setActiveImageId(null)}
            />
          </div>
        </div>
      )}

      <main className="relative flex min-h-screen w-auto items-center justify-center bg-gray-700 bg-opacity-20">
        <div className="relative flex px-20 pt-8">
          {isAuthenticated ? (
            <div className="inline-grid grid-flow-row-dense grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {images.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex h-52 w-52 cursor-pointer items-start justify-start rounded-md border border-transparent"
                  onClick={() => setActiveImageId(item.id)}
                >
                  <Image
                    className="h-52 w-52 object-cover py-3"
                    src={item.image}
                    width={200}
                    height={200}
                    loading="lazy"
                    fit="cover"
                    alt={item.image}
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="font-josefin-Regular text-4xl uppercase">
              You need to login first
            </p>
          )}
        </div>
      </main>
    </>
  );
}
