import { LOADING } from "@/constants/constant";
import { LoaderCircle } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <LoaderCircle
                size={48}
                className="animate-spin"
                color={'#D3D3D3'}
            />
            <span className="mt-4 text-lg">{LOADING}</span>
        </div>
    );
}
