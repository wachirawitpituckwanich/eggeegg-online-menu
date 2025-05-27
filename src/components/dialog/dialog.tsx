import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ERROR, PENDING, SUCCESS } from "@/constants/constant";
import { LoaderCircle } from "lucide-react";

export function ErrorDialog({ description }: { description: string }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-red-500">{ERROR}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
export function SuccessDialog({ description }: { description: string }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-green-500 text-center">
          {SUCCESS}
        </DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
export function PendingDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-blue-500 text-center">
          {PENDING}
        </DialogTitle>
        <div className="w-full flex justify-center">
          <LoaderCircle className="animate-spin" size={48} color="#D3D3D3" />
        </div>
      </DialogHeader>
    </DialogContent>
  );
}
