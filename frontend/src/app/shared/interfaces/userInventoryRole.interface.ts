import { RoleName } from "../enum/roleName";
import { Inventory } from "./inventory.interface";
import { User } from "./user.interface";

export interface UserInventoryRole{
    id: string;
    user: User;
    roleName: RoleName;
    inventory: Inventory;
}

