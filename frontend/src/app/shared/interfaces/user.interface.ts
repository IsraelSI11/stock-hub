import { UserInventoryRole } from "./userInventoryRole.interface";

export interface User {
    id: string;
    username: string;
    email: string;
    userInventoryRoles: UserInventoryRole[];
}
