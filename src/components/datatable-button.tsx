import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { CANCEL, CONFIRM } from "@/constants/constant";

export function DeleteButton({
  name,
  onClick,
}: {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="w-full flex justify-end">
          <Button variant="destructive" className="text-white" asChild>
            <div className="text-red-500"><Trash2 color={"#FFF"} /> ลบ{name}ทั้งหมด </div>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ{name}ทั้งหมด</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้ไม่สามารถย้อนกลับได้ คุณแน่ใจหรือไม่ว่าต้องการลบ
            {name}ทั้งหมด? ข้อมูลทั้งหมดจะถูกลบถาวร
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={onClick}>
            ยืนยันการลบ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DeleteDropDownMenuItemProps {
  id: number | string;
  tableName: string;
  thName: string;
  onDeleteClick: (id: number, tableName: string) => void;
}

export function DeleteDropDownMenuItem({
  id,
  tableName,
  thName,
  onDeleteClick,
}: DeleteDropDownMenuItemProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="text-red-500"
          onSelect={(e) => e.preventDefault()}
        >
          ลบ{thName}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ{thName}</AlertDialogTitle>
          <AlertDialogDescription>
            การดำเนินการนี้ไม่สามารถย้อนกลับได้
            คุณแน่ใจหรือไม่ว่าต้องการลบ{thName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{CANCEL}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => onDeleteClick(Number(id), tableName)}
          >
            {CONFIRM}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}