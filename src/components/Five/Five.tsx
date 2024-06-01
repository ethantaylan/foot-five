import { FC } from "react";
import DanteAndPlace from "../DateAndPlace/DateAndPlace";
import PlayersList from "../PlayersList/PlayersList";

export const Five: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <DanteAndPlace />

      <PlayersList />
    </div>
  );
};
