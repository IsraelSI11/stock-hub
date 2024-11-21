import { Routes } from "@angular/router";
import {ProductFormComponent} from "./product-form/product-form.component";

export default [
    { path: 'add/:id', component: ProductFormComponent},
] as Routes;