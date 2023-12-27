import { SimplifiedProducts } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { client } from "../lib/sanity";

async function getCategoryProducts(category: string) {
  const query = `*[_type == 'product' && category->name == '${category}'] {
        _id,
        name,
        price,
        "slug": slug.current,
        "image": images[0].asset->url,
        discountPercentage,
        "category": category->name,
      }`;
  const products = await client.fetch(query);
  return products;
}

async function CategoryPage({ params }: { params: { category: string } }) {
  const products: SimplifiedProducts[] = await getCategoryProducts(
    params.category
  );
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center flex-col gap-2 md:flex-row md:gap-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Products for {params.category}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden relative rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80 transition duration-100">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
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

export default CategoryPage;
