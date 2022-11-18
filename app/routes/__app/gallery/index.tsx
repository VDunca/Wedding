import { useState } from "react";
import Baner from "~/components/baner";
import Carousel from "~/components/carousel/Carousel";
import Navbar from "~/components/nav";
import Image from "~/components/image";
import IMAGES from "../../../../public/images/index.json";
import { useOptionalUser } from "~/utils";

export default function ImgGallery() {
  const user = useOptionalUser();
  const [img, setImg] = useState<number | null>(null);
  const resetCurrentImage = () => {
    setImg(null);
  };
  return (
    <>
      <Baner />
      <Navbar />

      {img && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex h-modal w-full overflow-y-auto overflow-x-hidden align-middle md:inset-0 md:h-full"
        >
          <div className="h-full w-full">
            <Carousel startImage={img} resetCurrentImage={resetCurrentImage} />
          </div>
        </div>
      )}
      <main className="  relative flex min-h-screen w-auto items-center justify-center bg-gray-700 bg-opacity-20">
        <div className="relative  flex px-20 pt-8">
          {user ? (
            <div className="flex grid inline-grid grid-flow-row-dense gap-x-3 gap-y-3 space-y-0 text-4xl shadow sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9">
              {IMAGES &&
                IMAGES.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex h-52 w-52  cursor-pointer items-start justify-start rounded-md border border-transparent"
                    onClick={() => setImg(item.id)}
                  >
                    <Image
                      className="max-x-full y-auto h-56 w-56 py-3"
                      src={item.image}
                      width={25}
                      height={25}
                      loading="lazy"
                      fit="cover"
                      alt=""
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="relative flex font-josefin-Regular   text-4xl uppercase">
              You need to login First
            </div>
          )}
        </div>
      </main>
    </>
  );
}
