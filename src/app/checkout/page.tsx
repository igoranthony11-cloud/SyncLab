import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-500 font-bold">Carregando...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
