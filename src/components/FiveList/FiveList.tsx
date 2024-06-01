import { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase.ts";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../utils/ShowModal";
import { NewFiveModal } from "../NewFiveModal/NewFiveModal";
import { formatDate } from "../../utils/FormatDate.ts";
import { Fives, FivesResponse } from "../../models/Fives/index.ts";
import { Players, PlayersResponse } from "../../models/Players/index.ts";
import { useUser } from "@clerk/clerk-react";
import { useGlobalStore } from "../../context/store.tsx";

export const FiveList = () => {
  const { setFive, setPlayerInfo, setPlayers } = useGlobalStore();
  const navigate = useNavigate();
  const { user } = useUser();

  const [fives, setFives] = useState<Fives[]>([]);

  const getFivesFetch = useSupabase<FivesResponse[]>(
    () =>
      supabase
        .from("fives")
        .select("*, five_players (is_substitute, player:player_id (*))")
        .order("id", { ascending: false })
        .limit(4),
    true
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    true
  );

  useEffect(() => {
    getFivesFetch.response &&
      setFives(getFivesFetch.response.map((f) => new Fives(f)));
  }, [getFivesFetch.response]);

  useEffect(() => {
    playerInfoFetch.response &&
      setPlayerInfo(new Players(playerInfoFetch.response));
  }, [playerInfoFetch.response]);

  return (
    <div className="h-full flex flex-col">
      <NewFiveModal onConfirm={() => getFivesFetch.executeFetch()} />

      <h1 className="flex text-xl font-bold">Bienvenue !</h1>
      <h1 className="mt-3 mb-1">Liste des fives</h1>

      <div className="flex flex-col gap-3">
        {fives && fives.length > 0 ? (
          fives.map((f) => {
            const today = new Date();
            const fiveDate = new Date(f.date);

            const isPastFive = today.getTime() > fiveDate.getTime();

            return (
              <div
                onClick={() => {
                  navigate(`/${f.id}`);
                  setFive(f);
                  setPlayers(f.players);
                }}
                key={f.id}
                className={`w-full border-l-4 ${
                  isPastFive ? "border-red-500" : "border-green-500"
                } border-opacity-65 bg-white shadow-sm p-2 rounded`}
              >
                <h2 className="font-bold">{formatDate(f.date)}</h2>

                <div className="flex flex-col">
                  <span className="text-secondary text-sm">
                    {f.place.replace("Autre", "Lieu non précisé")}
                  </span>

                  <div className="flex items-center mt-2">
                    {playerInfoFetch.response &&
                      !!f.players.find(
                        (player) => player.id === playerInfoFetch.response?.id
                      ) && (
                        <div className="badge badge-sm rounded badge-accent">
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
          <></>
        )}
      </div>

      <div className="flex h-full mt-2 justify-end"></div>
      <button
        onClick={() => showModal("newFiveModal")}
        className="btn w-full justify-self-end btn-sm rounded btn-primary"
      >
        Nouveau five
      </button>
    </div>
  );
};
