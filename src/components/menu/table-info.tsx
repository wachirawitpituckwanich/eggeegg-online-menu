import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import coffeeshop from "@/images/coffee-shop.svg";
import { TABLE_NUM } from "@/constants/constant";
export default function TableInfo({tableId}: {tableId: string}) {
    return (
      <div className="w-full h-2/8 flex flex-row justify-between items-center px-2 pt-12">
        <Card className="h-full w-full px-2 border">
          <CardContent className="w-full h-full flex flex-row py-4">
            <div className="w-full h-full">
              <div className="h-full flex items-center gap-8">
                <Image
                  className="w-[20vw] h-[20vh] max-h-[15vh]"
                  src={coffeeshop}
                  alt={""}
                />
                <div className="font-medium lg:text- xl:text-xl dark:text-white">
                  <div className="text-sm md:text-2xl text-gray-500 dark:text-gray-400">
                    {TABLE_NUM}
                  </div>
                  <div className="text-3xl md:text-4xl ">{tableId}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  