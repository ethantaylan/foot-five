export interface PlayersResponse {
  first_name: string;
  last_name: string;
  is_substitute: boolean;
  id: number;
  email: string;
  user_id: string;
}

export class Players {
  id: number;
  isSubstitute: boolean;
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  constructor({
    is_substitute,
    id,
    email,
    first_name,
    last_name,
    user_id,
  }: PlayersResponse) {
    this.isSubstitute = is_substitute;
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.userId = user_id;
    this.lastName = last_name;
  }
}
