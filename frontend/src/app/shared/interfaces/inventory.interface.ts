import { Category } from "./category.interface";
import { Product } from "./product.interface";
import { UserInventoryRole } from "./userInventoryRole.interface";

export interface Inventory {
    id: string;
    name: string;
    userInventoryRoles: UserInventoryRole[];
    products: Product[];
    categories: Category[];
}

export interface InventoryItemTable{
    id: string;
    name: string;
    products: number;
    categories: number;
}

export interface InventoryForm{
    name: string;
    
}