import { Routes } from "@angular/router";

export default [
    { path: '', loadComponent: () => import('./invitation-list/invitation-list.component') },
    { path: 'send/:id', loadComponent: () => import('./invitation-form/invitation-form.component')}
] as Routes;