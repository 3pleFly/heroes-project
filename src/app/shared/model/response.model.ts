import { User } from "./user.model";

export interface ResponseModel {
  accessToken: string;
  user: User;
}
