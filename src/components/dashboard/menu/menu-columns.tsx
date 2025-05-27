"use client";

import Menu from "@/interfaces/menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";

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
import { ItemCard } from "@/components/item-card";
import { AdminMenuProvider, useAdminMenuContext } from "./menu-page";

export function handleMenuColumns(
  onDeleteClick: (id: number | string, table: string) => void
): ColumnDef<Menu>[] {
  return [
    {
      accessorKey: "id",
      header: () => <h1 className="text-center">ไอดี</h1>,
      cell: ({ row }) => {
        const ID = row.original.id;
        return <p className="truncate text-center">{ID}</p>;
      },
    },
    {
      accessorKey: "category",
      header: () => <h1 className="text-center">หมวดหมู่</h1>,
      cell: ({ row }) => {
        const formatted = row.original.category;
        return <p className="text-center">{formatted}</p>;
      },
    },
    {
      accessorKey: "name",
      header: () => <h1 className="text-center">ชื่อเมนู</h1>,
      cell: ({ row }) => {
        const name = row.original.name;
        const formatted = name;
        return <p className="truncate text-center">{formatted}</p>;
      },
    },
    {
      accessorKey: "description",
      header: () => <h1 className="text-center">รายละเอียดเมนู</h1>,
      cell: ({ row }) => {
        const desc = row.original.description
        const formatted = !desc ? "-" : desc;
        return <p className="truncate text-center w-12 lg:w-24">{formatted}</p>;
      },
    },
    {
      accessorKey: "image",
      header: () => <h1 className="text-center">ลิ้งค์รูปภาพ</h1>,
      cell: ({ row }) => {
        const imgURL = row.original.image;
        const formatted = !imgURL ? "-" : imgURL;
        return <p className="text-center w-12 lg:w-24 truncate">{formatted}</p>;
      },
    },
    {
      accessorKey: "price",
      header: () => <h1 className="text-center">ราคา</h1>,
      cell: ({ row }) => {
        const price = row.original.price;
        return <p className="text-center w-4">{price}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const menu = row.original;
        const formData = {
          id : menu.id,
          category: menu.category,
          name: menu.name,
          description: menu.description,
          image : menu.image,
          price : menu.price,
          addons : menu.addons
        }
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
              <AdminMenuProvider>
                <ItemCard type={'edit'} dialogTrigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>แก้ไขเมนู</DropdownMenuItem>} data={formData}/>
              </AdminMenuProvider>

              <DeleteDropDownMenuItem
                onDeleteClick={onDeleteClick}
                id={menu.id}
                thName={"เมนู"}
                tableName={"menuitems"}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
