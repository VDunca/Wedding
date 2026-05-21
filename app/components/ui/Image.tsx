import { forwardRef } from "react";

import type { ImageFit } from "~/lib/image-types";

interface ImageProps extends React.ComponentPropsWithRef<"img"> {
  src: string;
  width?: number;
  height?: number;
  fit?: ImageFit;
  alt: string;
}

function buildImageSrc(
  src: string,
  width?: number,
  height?: number,
  fit?: ImageFit
) {
  const query = new URLSearchParams();
  if (width) query.set("w", width.toString());
  if (height) query.set("h", height.toString());
  if (fit) query.set("fit", fit);

  const queryString = query.toString();
  if (queryString) {
    return `/assets/resize/${src}?${queryString}`;
  }

  return `/images/${src}`;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ width, height, fit, src, alt = "", ...other }, forwardedRef) => {
    return (
      <img
        ref={forwardedRef}
        alt={alt}
        src={buildImageSrc(src, width, height, fit)}
        {...{ width, height, ...other }}
      />
    );
  }
);

Image.displayName = "Image";
