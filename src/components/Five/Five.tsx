import { FC } from "react";
import PlayersList from "../PlayersList/PlayersList";

export const Five: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <PlayersList />
    </div>
  );
};
