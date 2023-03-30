import {User as TUser} from "@prisma/client";

declare namespace Admin {
  export type User = TUser
}  