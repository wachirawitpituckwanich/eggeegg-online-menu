import DashboardWrapper from "../dashboard-wrapper";

import { createContext, useContext, useEffect, useState } from "react";
import { columns } from "../user/user-columns";
import { DataTable } from "../../data-table";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
import { LoaderCircle, Plus } from "lucide-react";
import { CREATE_USER, SEARCH_USER, USER } from "@/constants/constant";
import { Input } from "@/components/ui/input";
import { User } from "./user-columns";
import { Button } from "@/components/ui/button";

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

    const { data } = await supabase.schema('next_auth').from("users").select("*");
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

  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>{USER}</CardTitle>
            <div className="w-full flex justify-between space-x-4 pt-4">
              <Input
                placeholder={SEARCH_USER}
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) => {
                  table
                    .getColumn("name")
                    ?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
              />
              <Button className="bg-green-500 text-white">
                      <Plus color="#FFF" />
                      {CREATE_USER}
                    </Button>
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
