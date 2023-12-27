import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import { client, urlFor } from "@/app/lib/sanity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FullProduct } from "@/interfaces";
import { Star, Truck } from "lucide-react";

function calculateOriginalPrice(price: number, discountPercentage: number) {
  return Number((price / (1 - discountPercentage / 100)).toFixed(2));
}

async function getProduct(slug: string) {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0] {
        _id,
        name,
        price,
        "slug": slug.current,
        "category": category->name,
        images,
        description,
        rating,
        totalRatings,
        discountPercentage,
      }`;
  const product = await client.fetch(query, { next: 60 });
  return product;
}

async function ProductPage({ params }: { params: { slug: string } }) {
  const product: FullProduct = await getProduct(params.slug);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery
            images={product.images}
            discountPercentage={product.discountPercentage}
          />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-600 font-semibold">
                {product.category}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-8 flex items-center gap-2">
              <Badge
                variant={"destructive"}
                className="px-4 text-sm py-1.5 flex gap-1 items-center justify-between"
              >
                {product.rating}
                <Star className="w-5 h-5 rotate-90" />
              </Badge>
              <span className="text-gray-500">
                {product.totalRatings} Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-extrabold text-gray-800 md:text-2xl">
                  ${product.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through font-bold">
                  $
                  {calculateOriginalPrice(
                    product.price,
                    product.discountPercentage
                  )}
                </span>
              </div>

              <span className="text-sm text-gray-500 font-medium">
                Incl. Vat plus shipping costs.
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-600">
              <Truck />
              <span className="font-semibold text-sm">2-5 Day Shipping.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <AddToBag
                id={product._id}
                currency="USD"
                description={product.description}
                name={product.name}
                price={product.price}
                image={urlFor(product.images[0]).url()}
              />
              <Button variant="secondary">Checkout</Button>
            </div>

            <p className="text-gray-500 text-base tracking-wide mt-7 mb-6">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
