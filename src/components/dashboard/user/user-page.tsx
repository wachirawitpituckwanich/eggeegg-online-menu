import DashboardWrapper from "../dashboard-wrapper";

import { createContext, useContext, useEffect, useState } from "react";
import { columns } from "../user/user-columns";
import { DataTable } from "../../data-table";
import { createClient } from "@/utils/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  KeyRound,
  Link,
  LoaderCircle,
  Mail,
  Plus,
  Search,
  User2,
} from "lucide-react";
import { CREATE_USER, SEARCH_USER, USER } from "@/constants/constant";
import { Input } from "@/components/ui/input";
import { User } from "./user-columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminUserMContextType {
  userTableData: User[];
  setUserTableData: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectableCategories: string[];
  setSelectableCategories: React.Dispatch<React.SetStateAction<string[]>>;
  readUser: () => void;
}

const AdminUserContext = createContext<AdminUserMContextType | undefined>(
  undefined
);

export function useAdminUserContext() {
  const context = useContext(AdminUserContext);
  if (!context) {
    throw new Error(
      "useAdminUserContext must be used within AdminUserProvider"
    );
  }
  return context;
}

export function AdminUserProvider({ children }: { children: React.ReactNode }) {
  const [userTableData, setUserTableData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectableCategories, setSelectableCategories] = useState<string[]>(
    []
  );

  const readUser = async () => {
    const supabase = createClient();

    const { data } = await supabase
      .schema("next_auth")
      .from("users")
      .select("*");
    if (data) {
      data.sort((a, b) => a.id - b.id);
    }
    setUserTableData(data ?? []);
    setLoading(false);
  };
  return (
    <AdminUserContext.Provider
      value={{
        userTableData,
        setUserTableData,
        loading,
        setLoading,
        selectableCategories,
        setSelectableCategories,
        readUser,
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
}

export default function UserPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const adminCC = useAdminUserContext();
  const { userTableData, readUser, loading, setLoading } = adminCC;
  const supabase = createClient();
  const table = useReactTable({
    data: userTableData,
    columns: columns,
    enableColumnFilters: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  useEffect(() => {
    readUser();
  }, []);
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "ชื่อผู้ใช้งานต้องมีมากกว่า 2 ตัวอักษร",
    }),
    password: z.string().min(8, {
      message: "รหัสผ่านต้องมีมากกว่า 8 ตัวอักษร",
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
      username: "",
      password: "",
      role: "",
      image: null,
    },
  });
  const handleSignup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("[AUTH] Signup error:", error);
      throw new Error(error.message);
    }

    if (!data.user?.id) {
      throw new Error(
        "Signup successful. Please check your email for confirmation."
      );
    }

    return data.user;
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSignup(values.email, values.password);
  }
  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>{USER}</CardTitle>
            <div className="w-full flex justify-between space-x-4 pt-4">
              <Input
                startIcon={Search}
                placeholder={SEARCH_USER}
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-500 text-white">
                    <Plus color="#FFF" />
                    {CREATE_USER}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      {CREATE_USER}
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
                                startIcon={Mail}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>รหัสผ่าน</FormLabel>
                            <FormControl>
                              <Input
                                startIcon={KeyRound}
                                placeholder="รหัสผ่าน"
                                type="password"
                                {...field}
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
                        {CREATE_USER}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="px-4 flex justify-center">
            {loading ? (
              <LoaderCircle
                className="animate-spin"
                size={48}
                color="#D3D3D3"
              />
            ) : (
              <DataTable columns={columns} data={userTableData} table={table} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
