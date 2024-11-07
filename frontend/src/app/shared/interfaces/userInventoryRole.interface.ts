import { RoleName } from "../enum/roleName";
import { Inventory } from "./inventory.interface";

export interface UserInventoryRole{
    id: string;
    role: RoleName;
    inventory: Inventory;
}

