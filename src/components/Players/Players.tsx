import { useState } from "react";
import { Players as PlayersModel, PlayersResponse } from "../../models/Players";
import { Spinner } from "../Spinner/Spinner";
import { supabase } from "../../supabase";

export default async function Players() {
  const [players, setPlayers] = useState<PlayersModel[]>([]);

  const { data } = await supabase
    .from("players")
    .select("*")
    .returns<PlayersResponse[]>();

  return (
    <div>
      <h3>Joueurs</h3>
      {players?.length > 0 ? (
        players.map((player) => (
          <div key={player.name}>{player.isSubstitude}</div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
