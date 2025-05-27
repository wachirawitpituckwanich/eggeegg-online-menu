import { Card, CardContent, CardHeader } from "./ui/card";
export default function TopCard() {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="w-full h-1/2 flex flex-row flex-1 justify-center">
        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
      </CardHeader>
      <CardContent className="w-full h-1/5 flex flex-col mb-2">
        <div className="w-full flex flex-row justify-center items-center align-middle">
          <div className="w-full h-5 flex flex-row justify-evenly items-center">
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
