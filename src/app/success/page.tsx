import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-500 font-bold">Carregando...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
