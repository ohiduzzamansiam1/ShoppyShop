"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Men",
    href: "/Men",
  },
  {
    name: "Women",
    href: "/Women",
  },
  {
    name: "Teen",
    href: "/Teen",
  },
];

function Navbar() {
  const pathname = usePathname();
  const { handleCartClick, cartCount } = useShoppingCart();
  return (
    <>
      <header className="mb-8 border-b">
        <div className="flex items-center justify-between mx-auto max-w-2xl px-4 md:px-6 lg:max-w-7xl">
          <Link href="/">
            <h1 className="text-2xl md:text-4xl font-extrabold">
              Shoppy<span className="text-primary">Shop</span>
            </h1>
          </Link>

          <nav className="hidden gap-12 lg:flex mx-auto">
            {links.map((link, idx) => (
              <div key={idx}>
                {pathname === link.href ? (
                  <Link
                    href={link.href}
                    className={`text-lg font-bold text-primary`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex divider-x sm:border-l">
            <Button
              onClick={() => {
                handleCartClick();
              }}
              variant={"outline"}
              className="flex flex-col border-y-0 gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:w-24 md:h-24 rounded-none"
            >
              <div className="relative">
                <ShoppingBag />
                <Badge className="absolute -top-2 px-1 py-0 -right-2">
                  {cartCount}
                </Badge>
              </div>
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Cart
              </span>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
