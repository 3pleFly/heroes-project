import { Card } from "./card.model";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  cards?: number[];
}
