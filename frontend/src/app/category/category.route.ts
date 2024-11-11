import { Routes } from "@angular/router";

export default [
    { path: 'add/:id', loadComponent: ()=> import('./category-form/category-form.component')},
    { path: ':id', loadComponent: () => import('./category-list/category-list.component') },
] as Routes;