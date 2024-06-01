import { FC } from "react";
import { Players } from "../../models/Players/index";

export interface ListProps {
  players: Players[];
  isSubstitutePlayers?: boolean;
  withSubscriptionButton?: boolean;
  onSubscribe?: () => void;
  isUserAlreadySubscribed?: boolean;
}

export const List: FC<ListProps> = ({
  players,
  isSubstitutePlayers,
  withSubscriptionButton,
  onSubscribe,
  isUserAlreadySubscribed,
}) => {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-primary">
          {isSubstitutePlayers ? "Remplaçants" : "Joueurs"} ({players.length})
        </span>

        {withSubscriptionButton && (
          <button
            onClick={onSubscribe}
            className="btn btn-sm btn-primary rounded"
          >
            {isUserAlreadySubscribed ? "Se désinscrire" : "S'inscrire"}
          </button>
        )}
      </div>

      {players.length > 0 ? (
        <ul className="flex flex-col gap-2 p-0">
          {players.map((player, index) => (
            <li
              key={player.userId}
              className="flex items-center bg-white bg-opacity-65 shadow-sm rounded p-2"
            >
              <span className="text-sm font-bold me-2">{index + 1}.</span>
              <img
                className="rounded-full me-2"
                width={25}
                src={player.userImg}
                alt="Player Avatar"
              />

              <div className="w-full flex items-center justify-between">
                <div className="flex gap-1">
                  <span className="font-semibold">{player.userName}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-secondary text-sm">
          {isSubstitutePlayers
            ? "Pas de remplaçants inscrits"
            : "Pas de joueurs inscrits"}
        </span>
      )}
    </div>
  );
};
