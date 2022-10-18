import { Card } from "./card.model";

export default interface UserCardsResponse {
  id: number;
  cards: Card[];
}
