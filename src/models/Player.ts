export interface PlayersResponse {
  first_name: string;
  last_name: string;
  is_substitute: boolean;
  id: number;
  email: string;
  user_id: string;
  user_img: string;
  full_name: string;
  user_name: string;
  is_admin: boolean;
  groups: string[];
}

export class Players {
  id: number;
  isSubstitute: boolean;
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  userImg: string;
  fullName: string;
  userName: string;
  isAdmin: boolean;
  groups: string[];

  constructor({
    is_substitute,
    id,
    email,
    first_name,
    last_name,
    user_id,
    user_img,
    full_name,
    user_name,
    is_admin,
    groups,
  }: PlayersResponse) {
    this.userName = user_name;
    this.isSubstitute = is_substitute;
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.userId = user_id;
    this.lastName = last_name;
    this.userImg = user_img;
    this.fullName = full_name;
    this.isAdmin = is_admin;
    this.groups = groups;
  }
}
