import { FC } from "react";
import { Players } from "../../models/Player";

export interface FivePlayersAvatarProps {
  players: Players[];
}

export const FivePlayersAvatar: FC<FivePlayersAvatarProps> = ({ players }) => {
  return (
    <div className="flex items-center">
      <div className="avatar-group -space-x-5 rtl:space-x-reverse">
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
