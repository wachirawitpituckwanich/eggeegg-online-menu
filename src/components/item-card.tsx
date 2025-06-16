import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea } from "./ui/scroll-area";
import { ErrorDialog, PendingDialog, SuccessDialog } from "./dialog/dialog";
import { SUCCESS } from "@/constants/constant";
import {
  AdminMenuProvider,
  useAdminMenuContext,
} from "./dashboard/menu/menu-page";
import Addons from "@/interfaces/addons";
import Menu from "@/interfaces/menu";

import Image from "next/image";
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
import { toast } from "sonner"

interface AddonsTabProps {
  id: number;
  setAddons: React.Dispatch<React.SetStateAction<Addons[]>>;
  name?: string;
  price?: number;
}

interface MenuAddForm {
  category: string;
  name: string;
  description: string;
  price: number | string;
  image: string;
  addons: Addons[];
  is_active: boolean;
}

type MenuEditForm = MenuAddForm & { id: string | number };
function AddonsTab({ id, setAddons, name, price }: AddonsTabProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddons((prev: Addons[]) =>
      prev.map((addon) => (addon.id === id ? { ...addon, name: value } : addon))
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAddons((prev: Addons[]) =>
      prev.map((addon) =>
        addon.id === id ? { ...addon, price: value } : addon
      )
    );
  };

  return (
    <div className="w-full flex py-2 justify-between ">
      <Button
        variant="ghost"
        className="w-fit"
        onClick={() => {
          setAddons((prev: Addons[]) =>
            prev.filter((addon) => addon.id !== id)
          );
        }}
      >
        <X color="red" size={36} />
      </Button>
      <div className="flex justify-between gap-4">
        <Input
            value={name ?? ""}
            className="w-48 max-w-48 "
            placeholder="ชื่อ"
            id={`addon-name-${id}`}
            onChange={handleNameChange}
          />
        <Input
            className="w-24 max-w-24 "
            placeholder="ราคา"
            value={price ?? ""}
            id={`addon-price-${id}`}
            type="number"
            min="0"
            onChange={handlePriceChange}
          />
      </div>
    </div>
  );
}

export function ItemCard({
  type,
  dialogTrigger,
  data,
}: {
  type: string;
  dialogTrigger: React.ReactNode;
  data?: Menu;
}) {
  const adminCC = useAdminMenuContext();
  const {
    selectableCategories,
    setLoading,
    readMenu,
    setSelectableCategories,
  } = adminCC;
  const [addons, setAddons] = useState<Addons[]>(
    type == "edit" && data ? data.addons ?? [] : []
  );
  const [menuName, setMenuName] = useState<string>(
    type == "edit" && data ? data.name ?? "" : ""
  );
  const [menuDesc, setMenuDesc] = useState<string>(
    type == "edit" && data ? data.description ?? "" : ""
  );
  const [category, setCategory] = useState<string>(
    type == "edit" && data ? data.category ?? "" : ""
  );
  const [price, setPrice] = useState<number>(
    type == "edit" && data ? Number(data.price ?? 0) : 0
  );
  const [imageURL, setImageURL] = useState<string>(
    type == "edit" && data ? data.image ?? "" : ""
  );
  const formSchema = z.object({
    category: z.string().min(1, {
      message: "กรุณาเลือกหมวดหมู่",
    }),
    menuname: z.string().min(1, {
      message: "กรุณาใส่ชื่อเมนู",
    }),
    menudesc: z.string().nullable(),
    price: z.coerce.number(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: type == 'edit' && data ? data.category ?? "" : "",
      menuname: type == "edit" && data ? data.name ?? "" : "",
      menudesc: type == "edit" && data ? data.description ?? "" : "",
      price: type == "edit" && data ? Number(data.price ?? 0) : 0,
    },
  });
  const [id, setID] = useState(type == "edit" && data ? data.id ?? 0 : 0);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [editImg, setEditImg] = useState(false);
  async function submitForm(values: z.infer<typeof formSchema>) {
    const supabase = createClient();
    let URL = "";
    const file = (document?.getElementById("menu-picture") as HTMLInputElement)
      ?.files?.[0];
    if (file) {
      const { error: imageError } = await supabase.storage
        .from("menuimage")
        .upload(menuName, file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (imageError) {
        setSubmissionStatus("imageError");
        setErrorMessage(imageError.message);
        toast.error(errorMessage)
      } else {
        const { data: publicUrlData } = supabase.storage.from("menuimage")
          .getPublicUrl(`${menuName}?t=${Date.now()}
`);
        URL = publicUrlData.publicUrl;
      }
    }

    const formtype =
      type == "add"
        ? ({
            category: values.category,
            name: values.menuname,
            description: values.menudesc,
            price: values.price,
            image: URL,
            addons: addons,
            is_active: true,
          } as MenuAddForm)
        : type == "edit"
        ? ({
            id: data?.id,
            category: values.category,
            name: values.menuname,
            description: values.menudesc,
            price: values.price,
            image: URL,
            addons: addons,
            is_active: true,
          } as MenuEditForm)
        : ({} as MenuAddForm);
    const { data: formData, error: formError } = await supabase
      .from("menuitems")
      .upsert([formtype]);
    setSubmissionStatus("submitting");
    if (formError) {
      setSubmissionStatus("formError");
      setErrorMessage(formError.message);
      toast.error(errorMessage)
    } else {
      setSubmissionStatus("success");
      toast.success(SUCCESS)
      setLoading(true);
      setEditImg(false);
      setImageURL(URL);
      readMenu();
    }
  }
  const setUniqueCategories = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("menuitems")
      .select("category", { head: false });

    if (error) {
      toast.error(`Error fetching unique categories: ${error}`);
      return [];
    } else {
      const uniqueCategories = Array.from(
        new Set((data ?? []).map((item: { category: string }) => item.category))
      );
      setSelectableCategories(uniqueCategories);
      return uniqueCategories;
    }
  };
  useEffect(() => {
    setUniqueCategories();
  }, []);
  return (
    <AdminMenuProvider>
      <Dialog>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-2"
            >
              <DialogHeader>
                <DialogTitle className="text-center">
                  {type == "edit"
                    ? "แก้ไขเมนู"
                    : type == "add"
                    ? "เพิ่มเมนู"
                    : ""}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="w-full flex flex-col space-y-12">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="py-4">
                      <FormLabel>หมวดหมู่</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="เลือกหมวดหมู่" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectableCategories.map((item, index) => (
                            <SelectItem
                              key={String(index)}
                              id={String(index)}
                              value={item}
                            >
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="menuname"
                    render={({ field }) => (
                      <FormItem className="py-4">
                        <FormLabel>ชื่อเมนู</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อเมนู" {...field} className="w-full"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                    control={form.control}
                    name="menudesc"
                    render={({ field }) => (
                      <FormItem className="py-4">
                        <FormLabel>รายละเอียดเมนู</FormLabel>
                        <FormControl>
                          <Input placeholder="รายละเอียดเมนู" {...field} value={field.value ?? ""} className="w-full"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="py-4">
                        <FormLabel>ราคา</FormLabel>
                        <FormControl>
                          <Input placeholder="ราคา" type="number" {...field} className="w-full"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <div className="w-full flex flex-row justify-between py-4 ">
                 {type == "add" || (type == "edit" && editImg == true) ? (
                  <Input id="menu-picture" type="file" className="w-1/2" />
                  ) : type == "edit" && data?.image ? (
                    <div className="w-full h-full flex justify-end space-x-4 items-center align-middle">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-fit h-[4vh] p-4 hover:bg-yellow-500 hover:text-white "
                        onClick={() => {
                          setEditImg(true);
                        }}
                      >
                        แก้ไขรูปภาพ
                      </Button>
                      <Image
                        className=""
                        key={id}
                        src={imageURL}
                        alt={menuName}
                        width={64}
                        height={64}
                      />
                    </div>
                  ) : (
                    <Input id="menu-picture" type="file" className="w-1/2" />
                  )}
                </div>
                <div className="w-full flex flex-col py-4">
                  <p>ตัวเลือกเพิ่มเติม</p>
                  {addons.length == 0
                    ? null
                    : addons.map((items) => (
                        <AddonsTab
                          key={items.id}
                          id={items.id}
                          setAddons={setAddons}
                          name={items.name}
                          price={items.price}
                        />
                      ))}
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setID((prev: number) => prev + 1);
                        setAddons([...addons, { name: "", price: 0, id: id }]);
                      }}
                    >
                      <Plus /> เพิ่มตัวเลือก
                    </Button>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button
                  type="submit"
                >
                  {type == "edit"
                    ? "แก้ไขเมนู"
                    : type == "add"
                    ? "เพิ่มเมนู"
                    : ""}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminMenuProvider>
  );
}
