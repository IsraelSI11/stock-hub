import { Routes } from "@angular/router";
import { CategoryFormComponent } from "./category-form/category-form.component";

export default [
    { path: 'add/:id', component: CategoryFormComponent},
] as Routes;