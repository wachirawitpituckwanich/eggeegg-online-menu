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
import { CREATE_USER, EDIT_USER, EMAIL, EMP_ID, IMAGE, ORDER, ROLE, SHOW_RECIEPT, TABLE_NUM, USER } from "@/constants/constant";
import { useAdminUserContext } from "./user-page";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  KeyRound,
  Link,
  LoaderCircle,
  Mail,
  Plus,
  Search,
  User2,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";


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
              <EditUser data={user} setLoading={setLoading} readUser={readUser}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                >
                  {EDIT_USER}
                </DropdownMenuItem>
              </EditUser>
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

const EditUser = ({children, data, readUser, setLoading} : {children : React.ReactNode, data: User, setLoading : any, readUser : any}) => {
  
  const [openDialog, setOpenDialog] = useState(false);
  const formSchema = z.object({
      username: z.string().min(2, {
        message: "ชื่อผู้ใช้งานต้องมีมากกว่า 2 ตัวอักษร",
      }),
      email: z
        .string()
        .min(1, { message: "กรุณาใส่อีเมล" })
        .email("อีเมลไม่ถูกค้อง"),
      role: z
        .string({
          required_error: "กรุณาเลือกตำแหน่งของผู้ใช้งาน",
        })
        .min(1, {
          message: "กรุณาเลือกตำแหน่งของผู้ใช้งาน",
        }),
      image: z.any().nullable(),
    });
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: data.name,
        email: data.email,
        role: data.role,
        image: data.image,
      },
    });
    const handleEditUser = async (data : User, username: string, role : string, image: string) => {
      const supabase = createClient()
      const {data : submitData, error: submitError, count} = await supabase.schema('next_auth').from('users').update([{name : username, role : role, image : image}]).eq('id',data.id)
      console.log(count)
      console.log(submitError)
      if(submitError){
        toast.error('เกิดข้อผิดพลาดขึ้นในระหว่างการดำเนินการ')
      } else {
        setLoading(true);
        readUser()
        toast.success('แก้ไขข้อมูลสำเร็จ')        
      }
    }
    const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleEditUser(
      data,
      values.username,
      values.role,
      values.image
    );
  }
  return <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    {children}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        {EDIT_USER}
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8" 
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อ</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ชื่อผู้ใช้งาน"
                                  startIcon={User2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>อีเมล</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="อีเมล"
                                  type="email"
                                  {...field}
                                  disabled
                                  startIcon={Mail}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ตำแหน่ง</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="เลือกตำแหน่ง" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="employee">
                                    Employee
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>รูปภาพ</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="อัพโหลดรูป"
                                  type="file"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          {EDIT_USER}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
}