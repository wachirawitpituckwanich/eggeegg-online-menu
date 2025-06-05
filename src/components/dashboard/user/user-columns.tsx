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
import { DeleteDropDownMenuItem } from "@/components/datatable-button";
import { EDIT_USER, EMAIL, EMP_ID, IMAGE, ORDER, ROLE, SHOW_RECIEPT, TABLE_NUM, USER } from "@/constants/constant";
import { useAdminUserContext } from "./user-page";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge"
import { SwitchThumb } from "@radix-ui/react-switch";

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string;
  role: string;
  emp_id: number;
};



export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "emp_id",
      header: () => <h1 className="text-center">{EMP_ID}</h1>,
      cell: ({ row }) => {
        const empID = row.original.emp_id;
        return <p className="truncate text-center">{empID}</p>;
      },
    },{
      accessorKey: "name",
      header: () => <h1 className="text-center">{USER}</h1>,
      cell: ({ row }) => {
        const name = row.original.name 
        return <p className="text-center">{name}</p>;
      },
    },
    {
      accessorKey: "email",
      header: () => <h1 className="text-center">{EMAIL}</h1>,
      cell: ({ row }) => {
        const email = row.original.email;
        return <p className="text-center">{email}</p>;
      },
    },{
      accessorKey: "image",
      header: () => <h1 className="text-center">{IMAGE}</h1>,
      cell: ({ row }) => {
        const imgURL = row.original.image;
        const formatted = !imgURL ? "-" : imgURL;
        return <p className="text-center">{formatted}</p>;
      },
    },{
      accessorKey: "role",
      header: () => <h1 className="text-center">{ROLE}</h1>,
      cell: ({ row }) => {
        const role = row.original.role;
        switch(role){
          case 'admin':
            return <Badge className="text-center bg-blue-500 hover:bg-blue-400">{role}</Badge>;
          case 'employee':
            return <Badge className="text-center bg-orange-500 hover:bg-orange-400">{role}</Badge>;
        }
        
      },
    },
    
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        const adminCC = useAdminUserContext();
        const { readUser, setLoading } = adminCC;
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
                  readUser();
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
              <DropdownMenuItem
                onClick={() => {

                }}
              >
                {EDIT_USER}
              </DropdownMenuItem>
              <DeleteDropDownMenuItem
                onDeleteClick={onDeleteClick}
                id={user.id}
                thName={USER}
                tableName={'next_auth'}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

