import Addons from "./addons";

export default interface Menu {
    quantity?: number;
    category?: string;
    description?: string;
    id: number;
    image?: string;
    name: string;
    price: number;
    addons? : Addons[]
  }