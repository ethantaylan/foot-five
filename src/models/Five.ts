import { FivePlayerResponse } from "./FivePlayer";
import { Players } from "./Player";

export interface Organizer {
  username: string;
  userId: string;
}

export interface FiveResponse {
  id: number;
  date: string;
  place: string;
  place_url: string;
  organizer: Organizer;
  five_players: FivePlayerResponse[];
  duration: string;
}

export class Five {
  id: number;
  date: string;
  place: string;
  placeUrl: string;
  organizer: Organizer;
  players: Players[];
  duration: string;

  constructor({
    date,
    id,
    place,
    place_url,
    organizer,
    five_players,
    duration,
  }: FiveResponse) {
    this.date = date;
    this.id = id;
    this.place = place;
    this.placeUrl = place_url;
    this.organizer = organizer;
    this.duration = duration;
    this.players = five_players.map(
      ({ is_substitute, player }) => new Players({ ...player, is_substitute })
    );
  }
}
