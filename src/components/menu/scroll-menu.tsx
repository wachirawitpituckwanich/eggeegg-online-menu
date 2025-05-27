'use client';
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Menu from "@/interfaces/menu";
import Image from "next/image";
import { CartContext } from "@/app/context/cartcontext";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import React from "react";
import { Minus, Plus } from "lucide-react";
import { NOT_FOUND_MENU } from "@/constants/constant";
import ProdQuantityModifier from "./product-quantity-modifier";

export default function ScrollMenu({filteredMenus}: {filteredMenus: Menu[]}) {
  
  return (
    <ScrollArea className="w-full">
      {filteredMenus.length > 0 ? (
        <div className="flex flex-col">
          {filteredMenus.map((key: Menu) =>
            key.image != "" ? (
              <Dialog key={key.name}>
                <div className="w-full h-full">
                  <DialogTrigger className="flex flex-row justify-between items-center w-full h-24">
                    {key.image ? (
                      <div className="relative h-24 w-24">
                        <Image
                          src={key.image}
                          alt="test"
                          layout="fill"
                          loading="lazy"
                          unoptimized={true}
                        />
                      </div>
                    ) : null}
                    {key.image ? (
                      <div className="flex flex-col justify-center h-full">
                        <p>{key.name}</p>
                      </div>
                    ) : (
                      <p>{key.name}</p>
                    )}
                    <p className="w-fit text-end">{key.price} ฿</p>
                  </DialogTrigger>
                  <DialogContent>
                    {key.image ? (
                      <div className="relative h-96 w-full mt-4">
                        <Image
                          src={key.image}
                          alt="image"
                          layout="fill"
                          loading="lazy"
                          unoptimized={true}
                        />
                      </div>
                    ) : null}
                    <DialogHeader>
                      <DialogTitle>{key.name}</DialogTitle>
                      <DialogDescription key={"desc"}>
                        {key.description}
                      </DialogDescription>
                    </DialogHeader>
                    <ProdQuantityModifier keymap={key} />
                  </DialogContent>
                  <Separator />
                </div>
              </Dialog>
            ) : (
              <div className="w-full h-full" key={key.name}>
                <Dialog>
                  <div className="w-full h-full">
                    <DialogTrigger className="flex flex-row justify-between items-center w-full h-24">
                      {key.name}
                      <p className="w-fit justify-self-end  text-end">
                        {key.price} ฿
                      </p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{key.name}</DialogTitle>
                        <DialogDescription key={"desc"}>
                          {key.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                    <Separator />
                  </div>
                </Dialog>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="justify-self-center text-gray-500">
          {NOT_FOUND_MENU}
        </p>
      )}
    </ScrollArea>
  );
}

