import { $Enums } from "@prisma/client";

export interface UserGetDTO {
  id?: number;
  email: string;
  password: string;
  role: $Enums.Role;
  isActive: boolean | string;
}

export interface CredentialsChangeGetDTO {
  id: string | number;
  email: string;
  role: $Enums.Role;
  isActive: string;
}
