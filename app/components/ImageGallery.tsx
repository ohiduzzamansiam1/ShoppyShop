"use client";

import Image from "next/image";
import { useState } from "react";
import { urlFor } from "../lib/sanity";

function ImageGallery({
  images,
  discountPercentage,
}: {
  images: any;
  discountPercentage: number;
}) {
  const [bigImage, setBigImage] = useState(images[0]);
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last my-auto flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              loading="lazy"
              alt="Product images"
              width={200}
              height={200}
              className={`h-full w-full object-cover object-center transition duration-300 cursor-pointer ${
                bigImage == image && "scale-105"
              }`}
              onClick={() => {
                setBigImage(image);
              }}
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Product images"
          width={500}
          loading="lazy"
          height={500}
          className="h-full w-full object-cover object-center transition duration-300"
        />
        <span className="absolute top-0 left-0 bg-red-500 px-3 py-1.5 text-white font-semibold uppercase rounded-br-lg text-sm">
          {discountPercentage}% OFF
        </span>
      </div>
    </div>
  );
}

export default ImageGallery;
