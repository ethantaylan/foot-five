import { XCircleIcon } from "@heroicons/react/16/solid";
import { Five } from "../../models/Five";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../context";
import { FivePlayersAvatar } from "../FivePlayersAvatar/FivePlayersAvatar";
import { formatDate } from "../../utils/FormatDate";

export interface FivesProps {
  fives: Five[];
  onRemoveFive: (fiveId: number) => void;
}

export const Fives: FC<FivesProps> = ({ fives, onRemoveFive }) => {
  const { setFive, setPlayers, playerInfo, isUserAdmin, setOrganizer } =
    useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {playerInfo && fives && fives.length > 0 ? (
        fives.map((f) => {
          const today = new Date();
          const fiveDate = new Date(f.date);
          const isPastFive = today.getTime() > fiveDate.getTime();

          return (
            <div
              key={f.id}
              className={`w-full cursor-pointer border-l-4 ${
                isPastFive ? "border-red-500" : "border-green-500"
              } border-opacity-65 bg-white shadow-sm p-2 rounded`}
            >
              <div className="flex relative items-center justify-between">
                <h2 className="font-bold">{formatDate(f.date)}</h2>

                {!!f.players.find((player) => player.id === playerInfo.id) && (
                  <div className="badge badge-sm me-1 rounded badge-accent">
                    Inscrit
                  </div>
                )}

                {isUserAdmin && (
                  <XCircleIcon
                    style={{ right: 10, top: 40 }}
                    className="size-6 absolute  text-error"
                    onClick={() => onRemoveFive(f.id)}
                  />
                )}
              </div>

              <div
                onClick={() => {
                  navigate(`/fives/${f.id}`);
                  setFive(f);
                  setPlayers(f.players);
                  setOrganizer(f.organizer);
                }}
                className="flex flex-col"
              >
                <span className="text-secondary text-sm">
                  {f.place.replace("Autre", "Lieu non précisé")}
                </span>

                <FivePlayersAvatar players={f.players} />

                <div className="flex gap-3 items-center">
                  <span className="text-secondary text-xs">
                    Duration:
                    <span className="font-bold ms-1">{f.duration}</span>
                  </span>

                  <span className="text-secondary text-xs">
                    Organisé par:
                    <span className="font-bold ms-1">
                      {f.organizer?.username || "N/A"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h6 className="my-5 rounded alert alert-primary shadow-md">
          {"Il n'y a pas de fives d'organisés :("}
        </h6>
      )}
    </div>
  );
};
