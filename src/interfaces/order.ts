import Addons from "./addons";

export default interface Order {
    quantity: number;
    id: number;
    name: string;
    price: number;
    extra_request? : string
    addons? : Addons[]
  }