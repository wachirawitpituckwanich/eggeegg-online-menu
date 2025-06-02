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

interface AddonsTabProps {
  id: number;
  setAddons: React.Dispatch<React.SetStateAction<Addons[]>>;
  name?: string;
  price?: number;
}

interface MenuAddForm {
      category: string,
      name: string,
      description: string,
      price: number | string,
      image: string,
      addons: Addons[],
      is_active: boolean,
}

type MenuEditForm = MenuAddForm & { id: string | number};
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
    <div className="w-full flex py-2">
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
      <div className="w-full flex justify-between">
        <Input
          value={name ?? ""}
          className="w-4/6"
          placeholder="ชื่อ"
          id={`addon-name-${id}`}
          onChange={handleNameChange}
        />
        <Input
          className="w-1/6"
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

function HandleFormSubmit({
  formState,
  errorMessage,
}: {
  formState: string;
  errorMessage?: string;
}) {
  switch (formState) {
    case "imageError":
      return (
        <ErrorDialog
          description={errorMessage ?? "เกิดข้อผิดพลาดบางอย่างขึ้น"}
        />
      );
    case "formError":
      return (
        <ErrorDialog
          description={errorMessage ?? "เกิดข้อผิดพลาดบางอย่างขึ้น"}
        />
      );
    case "success":
      return <SuccessDialog description={SUCCESS} />;
    case "submitting":
      return <PendingDialog />;
  }
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
  const [imageURL, setImageURL] = useState<string>(type == "edit" && data ? data.image ?? "" : ""
  );
  const [id, setID] = useState(type == "edit" && data ? data.id ?? 0 : 0);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [editImg, setEditImg] = useState(false)
  async function submitForm() {
    const supabase = createClient();
    let URL = "";
    const file = (document?.getElementById("menu-picture") as HTMLInputElement)
      ?.files?.[0];
    if (file) {
      const { data: imageData, error: imageError } = await supabase.storage
      .from("menuimage")
      .upload(menuName, file, {
        cacheControl: "3600",
        upsert: true,
      });
      if (imageError) {
      setSubmissionStatus("imageError");
      setErrorMessage(imageError.message);
    } else {
      const { data: publicUrlData } = supabase.storage
        .from("menuimage")
        .getPublicUrl(`${menuName}?t=${Date.now()}
`);
      URL = publicUrlData.publicUrl;
    }
    }
    
    const form = type == 'add' ? {
      category: category,
      name: menuName,
      description: menuDesc,
      price: price,
      image: URL,
      addons: addons,
      is_active: true,
    } as MenuAddForm : type == 'edit' ? {
      id: data?.id,
      category: category,
      name: menuName,
      description: menuDesc,
      price: price,
      image: URL,
      addons: addons,
      is_active: true,
    } as MenuEditForm : {} as MenuAddForm ;
    const { data: formData, error: formError } = await supabase
      .from("menuitems")
      .upsert([form]);
    setSubmissionStatus("submitting");
    if (formError) {
      setSubmissionStatus("formError");
      setErrorMessage(formError.message);
    } else {
      setSubmissionStatus("success");
      setLoading(true);
      setEditImg(false)
      setImageURL(URL)
      readMenu();
    }
  }
  const setUniqueCategories = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("menuitems")
      .select("category", { head: false }); 

    if (error) {
      console.error("Error fetching unique categories:", error);
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
          <DialogHeader>
            <DialogTitle className="text-center">
              {type == "edit" ? "แก้ไขเมนู" : type == "add" ? "เพิ่มเมนู" : ""}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="w-full h-[60vh]">
            <div className="w-full flex justify-between items-middle align-middle py-4">
              <p>หมวดหมู่</p>
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                }}
              >
                <SelectTrigger className="w-36">
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
            </div>
            <div className="w-full flex justify-between items-middle align-middle py-4">
              <p>ชื่อเมนู</p>
              <Input
                value={menuName}
                placeholder="ชื่อเมนู"
                className="w-36"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMenuName(e.currentTarget.value);
                }}
              />
            </div>
            <div className="w-full flex flex-col py-4">
              <p>รายละเอียดเมนู</p>
              <Textarea
                value={menuDesc}
                placeholder="รายละเอียดเมนู"
                className="resize-none mt-4"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setMenuDesc(e.currentTarget.value);
                }}
              />
            </div>
            <div className="w-full flex justify-between items-middle align-middle py-4">
              <p>ราคา</p>
              <Input
                type="number"
                placeholder="ราคา (THB)"
                value={price}
                className="w-36"
                min="0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrice(Number(e.currentTarget.value));
                }}
              />
            </div>
            <div className="w-full flex flex-row justify-between py-4 ">
              <p>รูปภาพ</p>
              {type == "add" ||  type == 'edit' && editImg == true ? (
                <Input id="menu-picture" type="file" className="w-1/2" />
              )  : type == "edit" && data?.image ? (
                <div className="w-full h-full flex justify-end space-x-4">
                  <Button
                  variant="ghost"
                  size="icon"
                  className="w-fit h-[4vh] p-4 hover:bg-yellow-500"
                  onClick={() => {setEditImg(true); }}
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
              ) : <Input id="menu-picture" type="file" className="w-1/2" />}
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
            <Dialog>
              <DialogTrigger className="w-full" asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  {type == "edit"
                    ? "แก้ไขเมนู"
                    : type == "add"
                    ? "เพิ่มเมนู"
                    : ""}
                </Button>
              </DialogTrigger>
              <HandleFormSubmit
                formState={submissionStatus}
                errorMessage={errorMessage}
              />
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminMenuProvider>
  );
}
