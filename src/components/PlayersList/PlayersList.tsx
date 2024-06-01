import { Players, PlayersResponse } from "../../models/Players";
import { Spinner } from "../Spinner/Spinner";
import { supabase } from "../../supabase";
import { Alert } from "../Alert/Alert";
import { useUser } from "@clerk/clerk-react";
import { useSupabase } from "../../hooks/useSupa3";
import { useEffect } from "react";
// import { XCircleIcon } from "@heroicons/react/16/solid";
import { SubscribeModal } from "../SubscribeModal/SubscribeModal";
import { useGlobalStore } from "../../context/store";
import { List } from "../Players/Players";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

export default function PlayersList() {
  const getPlayersFetch = useSupabase<PlayersResponse[]>(
    () => supabase.from("players").select("*").eq("is_substitute", false),
    true
  );

  const getSubstitudePlayersFetch = useSupabase<PlayersResponse[]>(
    () => supabase.from("players").select("*").eq("is_substitute", true),
    true
  );

  const deletePlayerFetch = useSupabase<PlayersResponse[]>(
    () => supabase.from("players").delete().eq("user_id", user?.id),
    false
  );

  const { user } = useUser();

  const {
    players,
    setPlayers,
    isUserAlreadySubscribed,
    substitutePlayers,
    setSubstitutePlayers,
  } = useGlobalStore();

  useEffect(() => {
    getPlayersFetch.response &&
      setPlayers(getPlayersFetch.response.map((p) => new Players(p)));
  }, [getPlayersFetch.response]);

  useEffect(() => {
    getSubstitudePlayersFetch.response &&
      setSubstitutePlayers(
        getSubstitudePlayersFetch.response.map((p) => new Players(p))
      );
  }, [getSubstitudePlayersFetch.response]);

  if (getPlayersFetch.loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      {getPlayersFetch.error && (
        <Alert message={getPlayersFetch.error.message} status="error" />
      )}

      <ConfirmModal
        onConfirm={() =>
          deletePlayerFetch.executeFetch().then(() => {
            getPlayersFetch.executeFetch();
            getSubstitudePlayersFetch.executeFetch();
          })
        }
      />

      <SubscribeModal
        onConfirm={() => {
          getPlayersFetch.executeFetch();
          getSubstitudePlayersFetch.executeFetch();
        }}
      />

      <div className="flex flex-col w-full gap-10">
        <List
          withSubscriptionButton={true}
          isUserAlreadySubscribed={isUserAlreadySubscribed || undefined}
          players={players}
          userImg={user?.imageUrl || ""}
          onSubscribe={() =>
            isUserAlreadySubscribed
              ? (
                  document.getElementById("confirmModal") as HTMLFormElement
                ).showModal()
              : (
                  document.getElementById("subscribeModal") as HTMLFormElement
                ).showModal()
          }
        />

        <List
          isSubstitutePlayers
          players={substitutePlayers}
          userImg={user?.imageUrl || ""}
        />
      </div>
    </div>
  );
}
