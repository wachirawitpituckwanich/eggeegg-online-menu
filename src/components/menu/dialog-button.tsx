"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { LucideProps } from "lucide-react";

export default function DialogButton({
  icon,
  title,
  header,
  body,
}: {
  icon: React.ReactNode & LucideProps;
  title?: string;
  header?: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{icon}</DialogTrigger>
      <DialogContent className="w-screen h-screen flex flex-col ">
        <DialogHeader>
          <DialogTitle className="pt-6">{title}</DialogTitle>
          <DialogDescription>{header}</DialogDescription>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  );
}
