import type { SimplifiedProducts } from "@/interfaces";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../lib/sanity";

async function getNewestProducts() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt asc) {
        _id,
          name,
          price,
        "slug": slug.current,
        "category": category->name,
        "image": images[1].asset->url,
        discountPercentage
      }`;
  const newestProducts = await client.fetch(query, { next: 60 });
  return newestProducts;
}

async function Newest() {
  const newestProducts: SimplifiedProducts[] = await getNewestProducts();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center flex-col gap-2 md:flex-row md:gap-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Our newest products
          </h2>
          <Link
            href="/all"
            className="text-primary flex items-center gap-1 font-semibold"
          >
            See all
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {newestProducts.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden relative rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 transition duration-100">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center lg:w-full lg:h-full"
                    width={300}
                    height={300}
                  />
                  <span className="absolute top-0 left-0 bg-red-500 px-3 py-1.5 text-white font-semibold uppercase rounded-br-lg text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                </Link>
              </div>
              <div className="mt-4 flex text-gray-800 justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm mt-1 font-semibold text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-bold pl-3">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newest;
