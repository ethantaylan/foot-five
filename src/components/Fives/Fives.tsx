import { XCircleIcon } from "@heroicons/react/16/solid";
import { Five } from "../../models/Five";
import { FC } from "react";
import { formatDate } from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../context";

export interface FivesProps {
  fives: Five[];
  onRemoveFive: (fiveId: number) => void;
}

export const Fives: FC<FivesProps> = ({ fives, onRemoveFive }) => {
  const { setFive, setPlayers, playerInfo } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {fives && fives.length > 0 ? (
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
              <div className="flex justify-between">
                <h2 className="font-bold">{formatDate(f.date)}</h2>

                <XCircleIcon
                  className="size-6 text-error"
                  onClick={() => {
                    onRemoveFive(f.id);
                  }}
                />
              </div>

              <div
                onClick={() => {
                  navigate(`/${f.id}`);
                  setFive(f);
                  setPlayers(f.players);
                }}
                className="flex flex-col"
              >
                <span className="text-secondary text-sm">
                  {f.place.replace("Autre", "Lieu non précisé")}
                </span>

                <div className="flex items-center mt-2">
                  {playerInfo &&
                    !!f.players.find(
                      (player) => player.id === playerInfo.id
                    ) && (
                      <div className="badge badge-sm me-1 rounded badge-accent">
                        Inscrit
                      </div>
                    )}

                  <span className="text-secondary text-xs">
                    Organisé par:
                    <span className="font-bold ms-1">{f.organizer}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h6 className="my-5 rounded alert alert-primary shadow-md">{"Il n'y a pas de fives organisés :("}</h6>
      )}
    </div>
  );
};
