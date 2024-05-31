import { PlayersResponse } from "../models/Players";
import { supabase } from "../supabase";

export const getPlayers = async () => {
  const { data } = await supabase
    .from("players")
    .select("*")
    .returns<PlayersResponse[]>();

  return data;
};
