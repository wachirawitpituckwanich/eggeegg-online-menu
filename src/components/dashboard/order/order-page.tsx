import { createContext, useContext, useEffect, useState } from "react";
import { columns, RecieptOrder } from "./order-columns";
import { DataTable } from "../../data-table";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import { LoaderCircle, Search, Trash2 } from "lucide-react";
import DashboardWrapper from "../dashboard-wrapper";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/datatable-button";
import { ORDER, SEARCH_ORDER } from "@/constants/constant";
import { Input } from "@/components/ui/input";
interface AdminOrderContextType {
  orderTableData: RecieptOrder[];
  setOrderTableData: React.Dispatch<React.SetStateAction<RecieptOrder[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectableCategories: string[];
  setSelectableCategories: React.Dispatch<React.SetStateAction<string[]>>;
  readOrder: () => void;
}

const AdminOrderContext = createContext<AdminOrderContextType | undefined>(
  undefined
);

export function useAdminOrderContext() {
  const context = useContext(AdminOrderContext);
  if (!context) {
    throw new Error(
      "useAdminOrderContext must be used within AdminOrderProvider"
    );
  }
  return context;
}

export function AdminOrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderTableData, setOrderTableData] = useState<RecieptOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectableCategories, setSelectableCategories] = useState<string[]>(
    []
  );

  const readOrder = async () => {
    const supabase = createClient();

    const { data } = await supabase.from("order").select("*");
    if (data) {
      data.sort((a, b) => a.id - b.id);
    }
    setOrderTableData(data ?? []);
    setLoading(false);
  };
  return (
    <AdminOrderContext.Provider
      value={{
        orderTableData,
        setOrderTableData,
        loading,
        setLoading,
        selectableCategories,
        setSelectableCategories,
        readOrder,
      }}
    >
      {children}
    </AdminOrderContext.Provider>
  );
}

export default function OrderPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const adminCC = useAdminOrderContext();
  const {
    orderTableData,
    readOrder,
    loading,
    setLoading,
  } = adminCC;

  const onDeleteAllClick = async (table: string) => {
    const supabase = createClient();
    const { error } = await supabase.from(table).delete();
    if (error) {
    } else {
      setLoading(true);
      readOrder();
    }
  };
  const table = useReactTable({
    data: orderTableData,
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
    readOrder();
  }, [loading]);

  return (
    <DashboardWrapper>
      <div className="w-full h-full px-4">
        <Card>
          <CardHeader>
            <CardTitle>{ORDER}</CardTitle>
            <div className="w-full flex justify-between space-x-4 pt-4">
              <Input
                placeholder={SEARCH_ORDER}
                value={
                  (table.getColumn("created_at")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) => {
                  table
                    .getColumn("created_at")
                    ?.setFilterValue(event.target.value);
                }}
                startIcon={Search}
                className="max-w-sm"
              />
              <DeleteButton
                name={ORDER}
                onClick={() => {
                  onDeleteAllClick("order");
                }}
              />
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
              <DataTable
                columns={columns}
                data={orderTableData}
                table={table}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardWrapper>
  );
}
