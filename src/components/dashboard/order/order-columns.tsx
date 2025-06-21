"use client";

import Order from "@/interfaces/order";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropDownMenuItem } from "@/components/datatable-button";
import { EMP_ID, ORDER, SHOW_RECIEPT, TABLE_NUM } from "@/constants/constant";
import { useAdminOrderContext } from "./order-page";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReceiptComponent from "./reciept";
export type RecieptOrder = {
  id: number;
  created_at: Date;
  employee_id: number;
  table_no: number;
  details: Order[];
};

export const columns: ColumnDef<RecieptOrder>[] = [
  {
    accessorKey: "created_at",
    header: () => <h1 className="text-center">เวลา</h1>,
    cell: ({ row }) => {
      const timestamp = row.original.created_at;
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
    header: () => <h1 className="text-center">{EMP_ID}</h1>,
    cell: ({ row }) => {
      const empID = row.original.employee_id;
      return <p className="truncate text-center">{empID}</p>;
    },
  },
  {
    accessorKey: "table_no",
    header: () => <h1 className="text-center">{TABLE_NUM}</h1>,
    cell: ({ row }) => {
      const tableNum = row.original.table_no;
      return <p className="text-center">{tableNum}</p>;
    },
  },
  {
    accessorKey: "details",
    header: () => <h1 className="text-center">{ORDER}</h1>,
    cell: ({ row }) => {
      const details: Order[] = row.original.details as Order[];
      const names = details.map((item) => item.name).join(", ");
      const formatted = names;
      return <p className="truncate text-left w-48 lg:w-60">{formatted}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const adminCC = useAdminOrderContext();
      const { readOrder, setLoading } = adminCC;
      const onDeleteClick = async (id: number | string, table: string) => {
        const supabase = createClient();
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("id", id)
          .select();
        if (error) {
        } else {
          setLoading(true);
          readOrder();
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only"></span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>ตัวเลือก</DropdownMenuLabel>
            <Dialog>
              <DialogTrigger
                asChild
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>{SHOW_RECIEPT}</DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">ออเดอร์หมายเลข {order.id}</DialogTitle>
                </DialogHeader>
                <ReceiptComponent order={order.details} orderNumber={order.id} table={order.table_no} createdAt={order.created_at} empID={order.employee_id}/>
              </DialogContent>
            </Dialog>

            <DeleteDropDownMenuItem
              onDeleteClick={onDeleteClick}
              id={order.id}
              thName={ORDER}
              tableName={"order"}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
