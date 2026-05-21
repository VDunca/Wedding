import { useState } from "react";

import type images from "../../../public/images/index.json";

type GalleryImage = (typeof images)[number];

interface CarouselProps {
  images: GalleryImage[];
  startImage: number;
  onClose: () => void;
}

export function Carousel({ images, startImage, onClose }: CarouselProps) {
  const [currentId, setCurrentId] = useState(startImage);

  const goRight = () => {
    setCurrentId((prev) => (prev >= images.length ? 1 : prev + 1));
  };

  const goLeft = () => {
    setCurrentId((prev) => (prev <= 1 ? images.length : prev - 1));
  };

  const current = images.find((item) => item.id === currentId);

  return (
    <main className="relative flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md backdrop-brightness-50">
      <div className="pt-8">
        <div id="animation-carousel" data-carousel="static">
          <div className="overflow-hidden rounded-lg">
            {current && (
              <div
                key={current.id}
                className="duration-200 ease-linear"
                data-carousel-item
              >
                <img
                  src={`/images/${current.image}`}
                  className="absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                  alt={current.image}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            className="group absolute right-0 top-0 z-40 cursor-pointer items-center justify-center rounded-full bg-white/5 px-10 py-10 hover:bg-white/50"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-9 w-9 text-white"
                aria-hidden="true"
              >
                <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            onClick={goLeft}
            aria-label="Previous image"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 sm:h-10 sm:w-10">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            onClick={goRight}
            aria-label="Next image"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 sm:h-10 sm:w-10">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
