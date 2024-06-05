import { Players, PlayersResponse } from "./Player";

export interface FivePlayerResponse {
  is_substitute: boolean;
  player: PlayersResponse;
}

export class FivePlayer {
  isSubstitute: boolean;
  player: Players;

  constructor({ is_substitute, player }: FivePlayerResponse) {
    this.isSubstitute = is_substitute;
    this.player = new Players(player);
  }
}
