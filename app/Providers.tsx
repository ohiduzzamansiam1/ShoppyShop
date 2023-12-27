"use client";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <USCProvider
      cartMode="client-only"
      mode="payment"
      successUrl="http://localhost:3000/success"
      currency="USD"
      shouldPersist={true}
      cancelUrl="http://localhost:3000/error"
      language="en-US"
      billingAddressCollection={true}
      stripe="ansfhahfhahfgashfgkjfwgbf98745gfhwihg"
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
