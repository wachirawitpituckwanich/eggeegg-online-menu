"use client";

import Menu from "@/interfaces/menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { CANCEL, CONFIRM } from "@/constants/constant";
import { DeleteDropDownMenuItem } from "@/components/datatable-button";
export type Order = {
  id: number;
  created_at: Date;
  employee_id: number;
  table_no: number;
  details: Menu[];
};



export function handleColumnActions(
  onDeleteClick: (id: number | string, table: string) => void
): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: () => <h1 className="text-center">ไอดี</h1>,
      cell: ({ row }) => {
        const ID = parseInt(row.getValue("id"));
        return <p className="truncate text-center">{ID}</p>;
      },
    },
    {
      accessorKey: "created_at",
      header: () => <h1 className="text-center">เวลา</h1>,
      cell: ({ row }) => {
        const timestamp = row.getValue("created_at");
        const date = new Date(
          typeof timestamp === "string" ||
          typeof timestamp === "number" ||
          timestamp instanceof Date
            ? timestamp
            : ""
        );
        const formatted =
          new Date(date.getTime() + 7 * 60 * 60 * 1000)
            .toISOString()
            .replace("T", " ")
            .substring(0, 19) + " GMT+7";
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "employee_id",
      header: () => <h1 className="text-center">รหัสพนักงาน</h1>,
      cell: ({ row }) => {
        const empID = parseInt(row.getValue("employee_id"));
        return <p className="truncate text-center">{empID}</p>;
      },
    },
    {
      accessorKey: "table_no",
      header: () => <h1 className="text-center">หมายเลขโต๊ะ</h1>,
      cell: ({ row }) => {
        const tableNum = parseInt(row.getValue("table_no"));
        return <p className="text-center">{tableNum}</p>;
      },
    },
    {
      accessorKey: "details",
      header: () => <h1 className="text-center">ออเดอร์</h1>,
      cell: ({ row }) => {
        const details: Menu[] = row.getValue("details") as Menu[];
        const names = details.map((item) => item.name).join(", ");
        const formatted = names;
        return <p className="truncate text-left w-48 lg:w-60">{formatted}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>ตัวเลือก</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  // Show slip logic here
                }}
              >
                แสดงสลิป
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>แก้ไขรายการ</DropdownMenuItem>
              <DeleteDropDownMenuItem
                onDeleteClick={onDeleteClick}
                id={row.getValue('id')}
                thName={'ออเดอร์'}
                tableName={'order'}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
