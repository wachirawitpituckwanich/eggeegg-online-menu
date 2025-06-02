import { MouseEvent, useEffect, useState } from "react";
import { columns } from "./menu-columns";
import { DataTable } from "@/components/data-table";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoaderCircle, Plus } from "lucide-react";
import Menu from "@/interfaces/menu";
import DashboardWrapper from "../dashboard-wrapper";
import { DeleteButton } from "@/components/datatable-button";
import { ItemCard } from "@/components/item-card";
import { createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  ADD_MENU,
  MENU,
  SEARCH_MENU,
  SEARCH_PLACEHOLDER,
} from "@/constants/constant";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
interface AdminMenuContextType {
  menuTableData: Menu[];
  setmenuTableData: React.Dispatch<React.SetStateAction<Menu[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectableCategories: string[];
  setSelectableCategories: React.Dispatch<React.SetStateAction<string[]>>;
  readMenu: () => void;
}

const AdminMenuContext = createContext<AdminMenuContextType | undefined>(
  undefined
);

export function useAdminMenuContext() {
  const context = useContext(AdminMenuContext);
  if (!context) {
    throw new Error(
      "useAdminMenuContext must be used within AdminMenuProvider"
    );
  }
  return context;
}

export function AdminMenuProvider({ children }: { children: React.ReactNode }) {
  const [menuTableData, setmenuTableData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectableCategories, setSelectableCategories] = useState<string[]>(
    []
  );
  const readMenu = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("menuitems").select("*");
    if (data) {
      data.sort((a, b) => a.id - b.id);
    }
    setmenuTableData(data ?? []);
    setLoading(false);
  };
  return (
    <AdminMenuContext.Provider
      value={{
        menuTableData,
        setmenuTableData,
        loading,
        setLoading,
        selectableCategories,
        setSelectableCategories,
        readMenu,
      }}
    >
      {children}
    </AdminMenuContext.Provider>
  );
}


export default function AdminMenuPage() {
  const [searchTerm, setSearchterm] = useState<string>("");
  const adminCC = useAdminMenuContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const {
    menuTableData,
    setmenuTableData,
    readMenu,
    loading,
    setLoading,
    setSelectableCategories,
  } = adminCC;
  const supabase = createClient();

  const table = useReactTable({
    data: menuTableData,
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
    readMenu();
  }, [loading]);

  return (
    <DashboardWrapper>
      <div className="w-[70vw] h-full px-4">
        <Card>
          <CardHeader className="flex">
            <CardTitle>{MENU}</CardTitle>

            <div className="w-full flex justify-between space-x-4 pt-4">
              <Input
                placeholder={SEARCH_MENU}
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                  table.getColumn("name")?.setFilterValue(event.target.value);
                }}
                className="max-w-sm"
              />
              <div className="flex space-x-4">
                <ItemCard
                  type={"add"}
                  dialogTrigger={
                    <Button className="bg-green-500 text-white">
                      <Plus color="#FFF" />
                      {ADD_MENU}
                    </Button>
                  }
                />
                <DeleteButton name={MENU} onClick={() => {}} />
              </div>
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
              <DataTable columns={columns} data={menuTableData} table={table} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
