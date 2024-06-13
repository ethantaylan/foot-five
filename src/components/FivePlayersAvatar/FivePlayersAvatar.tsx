import { FC } from "react";
import { Players } from "../../models/Player";

export interface FivePlayersAvatarProps {
  players: Players[];
}

export const FivePlayersAvatar: FC<FivePlayersAvatarProps> = ({ players }) => {
  //   const mockPlayers: Players[] = [
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },

  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //     {
  //       email: " random-user@mail.com",
  //       firstName: "Random",
  //       id: 1,
  //       isSubstitute: false,
  //       lastName: "User",
  //       userId: "1",
  //       userImg: "https://randomuser.me/api/port",
  //       fullName: "Random User",
  //       isAdmin: false,
  //       userName: "randomuser",
  //     },
  //   ];

  return (
    <div className="flex items-center">
      <div className="avatar-group -space-x-6 rtl:space-x-reverse">
        {players.map((player) => (
          <div key={player.userId} className="avatar">
            <div className="w-5 rounded-full me-2">
              <img alt="player-avatar" src={player.userImg} />
            </div>
          </div>
        ))}
      </div>
      <span className="text-xs">{players.length} / 10</span>
    </div>
  );
};
