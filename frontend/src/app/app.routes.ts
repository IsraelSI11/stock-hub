import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth/auth.guard';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './inventory/inventory-form/inventory-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'inventory', component: InventoryListComponent, canActivate: [AuthGuard] },
    { path: 'form', component: InventoryFormComponent, canActivate: [AuthGuard] },
    { path: 'product/inventory', loadChildren: () => import('./product/product.route') , canActivate: [AuthGuard]},
    { path: 'category', loadChildren: () => import('./category/category.route') , canActivate: [AuthGuard]},
    { path: 'invitation', loadChildren: () => import('./invitation/invitation.route') , canActivate: [AuthGuard]},
];
