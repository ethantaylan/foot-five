import { FivePlayerResponse } from "../FivePlayer";
import { Players } from "../Players";

export interface FivesResponse {
  id: number;
  date: string;
  place: string;
  place_url: string;
  organizer: string;
  five_players: FivePlayerResponse[];
}

export class Fives {
  id: number;
  date: string;
  place: string;
  placeUrl: string;
  organizer: string;
  players: Players[];

  constructor({
    date,
    id,
    place,
    place_url,
    organizer,
    five_players,
  }: FivesResponse) {
    this.date = date;
    this.id = id;
    this.place = place;
    this.placeUrl = place_url;
    this.organizer = organizer;
    this.players = five_players.map(
      ({ is_substitute, player }) => new Players({ ...player, is_substitute })
    );
  }
}
