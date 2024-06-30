import { useUser } from "@clerk/clerk-react";
import { startCase } from "lodash";
import { ChangeEvent, FC, useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";
import { Players, PlayersResponse } from "../../models/Player";
import { supabase } from "../../supabase";
import { Switch } from "../Switch/Switch";
import { Five } from "../../models/Five";
import { Modals } from "../../constants/Modals";
import { HiddenCloseModalButton } from "../HiddenCloseModalButton/HiddenCloseModalButton";
import { closeModal } from "../../utils/CloseModal";
import { formatDate } from "../../utils/FormatDate";
import axios from "axios";

export interface SubscribeModalProps {
  onConfirm: () => void;
  five: Five;
  playerInfo: Players;
}

export const SubscribeModal: FC<SubscribeModalProps> = ({
  onConfirm,
  five,
  playerInfo,
}) => {
  const { user } = useUser();
  const [isSubstitute, setIsSubstitute] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(playerInfo?.userName ?? "");

  const subscribePlayerFetch = useSupabase<PlayersResponse[]>(
    () =>
      supabase.from("players").insert({
        user_id: user?.id,
        user_name: userName,
        first_name: user?.firstName,
        last_name: user?.lastName,
        user_img: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    false
  );

  const subscribePlayerToFiveFetch = useSupabase<Players>(
    () =>
      supabase.from("five_players").insert({
        five_id: five.id,
        player_id: user?.id,
        is_substitute: isSubstitute,
        player_name: userName,
      }),
    false
  );

  const updateUsernameFetch = useSupabase<Players>(
    () =>
      supabase
        .from("players")
        .update({
          user_name: userName,
        })
        .eq("user_id", user?.id),
    false
  );

  function generatePlayerList(
    players: Players[],
    includePlayerInfo = false,
    isSubstitute = false
  ) {
    let list = (players || [])
      .map((p, index) => `${index + 1} ${p.userName} \n`)
      .join("");
    if (includePlayerInfo && !isSubstitute) {
      list += `${players.length + 1} ${playerInfo.userName}\n`;
    }
    return list;
  }

  function generateSubstituteList(
    subs: Players[],
    includePlayerInfo = false,
    isSubstitute = false
  ) {
    let list = (subs || [])
      .map((p, index) => `${index + 1} ${p.userName} \n`)
      .join("");
    if (includePlayerInfo && isSubstitute) {
      list += `${subs.length + 1} ${playerInfo.userName}\n`;
    }
    return list;
  }

  const subs = five.players.filter((p) => p.isSubstitute === true);
  const nonSubs = five.players.filter((p) => !p.isSubstitute);

  const subscribedPlayers = generatePlayerList(
    nonSubs,
    !isSubstitute,
    isSubstitute
  );
  const subscribedSubstitutePlayers = generateSubstituteList(
    subs,
    isSubstitute,
    isSubstitute
  );

  const message = `⚽FIVE du ${formatDate(five?.date || "")}\n\n*${
    playerInfo?.userName
  }* s'est inscrit 🙂 \n\nJoueurs:\n${
    subscribedPlayers.length === 0 ? "_Pas de joueurs_" : subscribedPlayers
  }\n\nRemplaçants: \n${
    subscribedSubstitutePlayers.length === 0
      ? "_Pas de remplaçants_"
      : subscribedSubstitutePlayers
  }\n\n${window.location.href}`.replaceAll(",", " ");

  const handleSendMessage = async () => {
    axios.post(
      "https://academic-wendy-ethantaylan-3cf3d20b.koyeb.app/send-message",
      {
        message: message,
        group: "120363181297536515@g.us",
      }
    );
  };

  const handleConfirm = async () => {
    if (!playerInfo) {
      await subscribePlayerFetch.executeFetch();
    }

    const isPlayerAlreadySubscribed = five.players.find(
      (player) => player.userId === playerInfo.userId
    );

    if (!isPlayerAlreadySubscribed) {
      updateUsernameFetch.executeFetch();
      subscribePlayerToFiveFetch.executeFetch().then(() => {
        handleSendMessage();
      });

      onConfirm();
      closeModal(Modals.SUBSCRIBE_MODAL);
    }
  };

  return (
    <dialog id={Modals.SUBSCRIBE_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">Inscription</h3>

        <div className="flex flex-col gap-3">
          <label htmlFor="lastName" className="label-text">
            Nom
          </label>

          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUserName(event.target.value)
            }
            value={startCase(userName)}
            name="lastName"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-sm w-fulls"
          />
        </div>

        <Switch
          label="Remplaçant"
          isChecked={isSubstitute || (five?.players ?? [])?.length === 10}
          onToggle={() => setIsSubstitute(!isSubstitute)}
        />

        <div className="flex w-full gap-2 justify-end mt-6">
          <form method="dialog">
            <button className="btn btn-sm btn-ghost">Annuler</button>
          </form>

          <button
            disabled={userName.length === 0}
            onClick={() => handleConfirm()}
            className="btn btn-sm btn-primary rounded"
          >
            Confirmer
          </button>
        </div>
      </div>

      <HiddenCloseModalButton />
    </dialog>
  );
};
