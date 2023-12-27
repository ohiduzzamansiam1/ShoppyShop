"use client";

import { Button } from "@/components/ui/button";
import { ProductCart } from "@/interfaces";
import { useShoppingCart } from "use-shopping-cart";

function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    image,
    price,
    currency,
    description,
    id,
  };

  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      Add to Bag
    </Button>
  );
}

export default AddToBag;
