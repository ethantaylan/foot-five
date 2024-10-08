import { FC, useEffect, useState } from "react";
import { Players } from "../../models/Player";
import { showModal } from "../../utils/ShowModal";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useSupabase } from "../../hooks/useSupabase";
import { supabase } from "../../supabase";
import { useParams } from "react-router-dom";
import { Modals } from "../../constants/Modals";
import { usePlayerInfoStore } from "../../store/PlayerInfo";
import { useAdminStore } from "../../store/Admin";

export interface ListProps {
  players: Players[] | undefined;
  isSubstitutePlayers?: boolean;
  withSubscriptionButton?: boolean;
  onDeleteUser: () => void;
  canSubscribe?: boolean;
}

export const List: FC<ListProps> = ({
  players,
  isSubstitutePlayers,
  withSubscriptionButton,
  onDeleteUser,
  canSubscribe = true,
}) => {
  const { id } = useParams();
  const { isUserAlreadySubscribed } = usePlayerInfoStore();
  const [playerId, setPlayerId] = useState<string>("");
  const { isUserAdmin } = useAdminStore();

  const deletePlayerFetch = useSupabase<Players>(
    () =>
      supabase
        .from("five_players")
        .delete()
        .eq("player_id", playerId)
        .eq("five_id", id),
    false
  );

  useEffect(() => {
    playerId &&
      id &&
      deletePlayerFetch.executeFetch().then(() => {
        onDeleteUser();
      });
  }, [playerId, id]);

  return (
    <>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-primary">
            {isSubstitutePlayers ? "Remplaçants" : "Joueurs"} ({players?.length}
            )
          </span>

          <span className="text-sm mt-1">
            {players?.length === 0 &&
              `Pas de ${
                isSubstitutePlayers ? "remplaçants" : "joueurs"
              } inscrits`}
          </span>
        </div>

        <div className="flex gap-2">
          {withSubscriptionButton && (
            <button
              disabled={canSubscribe}
              onClick={() =>
                isUserAlreadySubscribed
                  ? showModal(Modals.UNSUBSCRIBE_MODAL)
                  : showModal(Modals.SUBSCRIBE_MODAL)
              }
              className="btn btn-sm btn-primary rounded"
            >
              {isUserAlreadySubscribed ? "Se désinscrire" : "S'inscrire"}
            </button>
          )}
        </div>
      </div>

      {players && (
        <ul className="flex flex-col mb-5 mt-2 gap-2 p-0">
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
                <span className="font-semibold">{player.userName}</span>
                <span>
                  {isUserAdmin && (
                    <XCircleIcon
                      onClick={() => setPlayerId(player.userId)}
                      className="size-5 text-error cursor-pointer"
                    />
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
