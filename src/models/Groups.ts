export interface GroupsResponse {
  created_at: string;
  id: string;
  name: string;
  owner: string;
  fives_id: string[];
  players_id: string[];
  is_private: boolean;
}

export class Groups {
  createdAt: string;
  id: string;
  name: string;
  playersId: string[];
  fivesId: string[];
  isPrivate: boolean;
  owner: string;

  constructor({
    created_at,
    id,
    name,
    players_id,
    fives_id,
    is_private,
    owner,
  }: GroupsResponse) {
    this.createdAt = created_at;
    this.id = id;
    this.name = name;
    this.playersId = players_id;
    this.fivesId = fives_id;
    this.isPrivate = is_private;
    this.owner = owner;
  }
}
