import { FC } from "react";
import { Players } from "../../models/Players/index"; // Assuming Players is an array of player objects

export interface ListProps {
  players: Players[];
  userImg: string;
  isSubstitutePlayers?: boolean; // Use consistent naming (isSubstitutePlayers)
  withSubscriptionButton?: boolean;
  onSubscribe?: () => void;
  isUserAlreadySubscribed?: boolean;
}

export const List: FC<ListProps> = ({
  players,
  userImg,
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
        <ul className="list-none p-0">
          {players.map((player, index) => (
            <li
              key={player.userId}
              className="flex items-center bg-white bg-opacity-65 shadow-sm rounded p-2"
            >
              <span className="text-sm font-bold me-2">{index + 1}.</span>
              <img
                className="rounded-full me-2"
                width={25}
                src={userImg}
                alt="Player Avatar"
              />

              <div className="w-full flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="font-semibold">{player.lastName}</span>
                  <span className="font-semibold">{player.firstName}</span>
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
