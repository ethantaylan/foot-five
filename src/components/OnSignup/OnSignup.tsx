import { useUser } from "@clerk/clerk-react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../hooks/UseSupabase";
import { PlayersResponse } from "../../models/Player";
import { supabase } from "../../supabase";

const OnSignup: FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const subscribePlayerFetch = useSupabase<PlayersResponse[]>(
    () =>
      supabase.from("players").insert({
        user_id: user?.id,
        user_name: user?.username,
        first_name: user?.firstName,
        last_name: user?.lastName,
        user_img: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    false
  );

  const playerInfoFetch = useSupabase<PlayersResponse>(
    () => supabase.from("players").select().eq("user_id", user?.id).single(),
    false
  );

  useEffect(() => {
    user && playerInfoFetch.executeFetch();
  }, [user]);

  useEffect(() => {
    insertNewPlayerToDatabase();
  }, [playerInfoFetch.error]);

  useEffect(() => {
    playerInfoFetch.response && playerInfoFetch.response.id && navigate("/");
  }, [playerInfoFetch.response]);

  useEffect(() => {
    subscribePlayerFetch.response && navigate("/");
  }, [subscribePlayerFetch.response]);

  const insertNewPlayerToDatabase = async () => {
    if (playerInfoFetch.error && playerInfoFetch.error.code === "PGRST116") {
      await subscribePlayerFetch.executeFetch();

      navigate("/");
    }
  };

  return <></>;
};

export default OnSignup;
