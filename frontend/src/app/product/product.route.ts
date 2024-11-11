import { Routes } from "@angular/router";
import {ProductFormComponent} from "./product-form/product-form.component";

export default [
    { path: 'add/:id', component: ProductFormComponent},
    { path: ':id', loadComponent: () => import('./product-list/product-list.component') },
] as Routes;