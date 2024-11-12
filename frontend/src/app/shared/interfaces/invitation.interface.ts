import { RoleName } from "../enum/roleName";
import { User } from "./user.interface";

export interface Invitation {
    id: string;
    fromUser: User;
    toUser: User;
    inventoryId: string;
    role: RoleName;
}

export interface InvitationForm {
    to: string;
    role: RoleName;
}