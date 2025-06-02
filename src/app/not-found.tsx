import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import router from "next/navigation";
import { PAGE_NOT_FOUND, PAGE_NOT_FOUND_DESC, RETURN_TO_HOME } from "@/constants/constant";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center bg-white rounded-xl shadow-md px-8 py-12">
        <div className="flex items-center justify-center mb-6">
          <CircleX size={80} className="text-red-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-1">{PAGE_NOT_FOUND}</p>
        <p className="text-base text-gray-500 mb-8 text-center max-w-xs">{PAGE_NOT_FOUND_DESC}</p>
        <Button variant="default" asChild className="px-6 py-2 rounded-full shadow-none bg-gray-600 hover:bg-gray-700 text-white transition">
          <Link href="/">{RETURN_TO_HOME}</Link>
        </Button>
      </div>
    </div>
  );
}
