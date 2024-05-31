export interface PlayersResponse {
  name: string;
  is_subtitude: boolean;
}

export class Players {
  name: string;
  isSubstitude: boolean;
  constructor({ is_subtitude, name }: PlayersResponse) {
    this.isSubstitude = is_subtitude;
    this.name = name;
  }
}
