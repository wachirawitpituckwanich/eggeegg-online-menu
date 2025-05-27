import { ReactNode } from "react";

export default function DashboardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-secondary w-screen h-screen text-center align-middle flex flex-col justify-center">
      <div className="flex flex-col justify-center align-middle items-center w-full">
        {children}
      </div>
    </div>
  );
}
