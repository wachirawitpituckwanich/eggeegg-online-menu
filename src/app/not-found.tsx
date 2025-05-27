import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import router from "next/navigation";
import { PAGE_NOT_FOUND, PAGE_NOT_FOUND_DESC, RETURN_TO_HOME } from "@/constants/constant";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-fit flex flex-col justify-center items-center space-evenly">
        <CircleX size={150} color="red" />
        <p className="text-lg">{PAGE_NOT_FOUND}</p>
        <p className="text-lg">{PAGE_NOT_FOUND_DESC}</p>
        <Button variant="outline" asChild>
          <Link href="/">{RETURN_TO_HOME}</Link>
        </Button>
      </div>
    </div>
  );
}
