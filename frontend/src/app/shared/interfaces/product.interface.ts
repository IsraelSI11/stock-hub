import { Category } from "./category.interface";

export interface Product {
    id: string;
    code: string;
    name: string;
    imageUrl: string;
    category: Category;
    stock: number;
    price: number;
}

export interface ProductForm {
    code: string;
    name: string;
    imageUrl: string;
    category: string;
    stock: number;
    price: number;
}

export interface ProductItemTable {
    id: string;
    code: string;
    name: string;
    category: string;
    stock: number;
    price: number;
}