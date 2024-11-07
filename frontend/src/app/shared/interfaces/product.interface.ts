import { Category } from "./category.interface";

export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    category: Category;
    stock: number;
    price: number;
}