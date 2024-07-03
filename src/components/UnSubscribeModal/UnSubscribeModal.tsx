import { FC, useState } from "react";
import { useGlobalStore } from "../../context";
import { Players } from "../../models/Player";
import { formatDate } from "../../utils/FormatDate";
import { Modal } from "../Modal/Modal";
import { Modals } from "../../constants/Modals";
import { useSupabase } from "../../hooks/useSupabase";
import { supabase } from "../../supabase";
import { useUser } from "@clerk/clerk-react";
import { closeModal } from "../../utils/CloseModal";

export interface UnSubscribeModalProps {
  onConfirm: () => void;
  label?: string;
}

export const UnSubscribeModal: FC<UnSubscribeModalProps> = ({ onConfirm }) => {
  const { playerInfo, five } = useGlobalStore();
  const { user } = useUser();

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false);

  function generatePlayerList(
    players: Players[],
    includePlayerInfo = false,
    isSubstitute = false
  ) {
    let list = (players || [])
      .map((p, index) => `${index + 1} ${p.userName} \n`)
      .join("");
    if (
      includePlayerInfo &&
      !isSubstitute &&
      hasConfirmed &&
      !hasUnsubscribed
    ) {
      list += `${players.length + 1} ${playerInfo?.userName}\n`;
    }
    return list;
  }

  function generateSubstituteList(subs: Players[], includePlayerInfo = false) {
    let list = (subs || [])
      .map((p, index) => `${index + 1} ${p.userName} \n`)
      .join("");
    if (includePlayerInfo && hasConfirmed && !hasUnsubscribed) {
      list += `${subs.length + 1} ${playerInfo?.userName}\n`;
    }
    return list;
  }

  const subs = five?.players.filter((p) => p.isSubstitute === true);
  const nonSubs = five?.players.filter((p) => !p.isSubstitute);

  const subscribedPlayers = generatePlayerList(nonSubs || []);
  const subscribedSubstitutePlayers = generateSubstituteList(subs || []);

  const message = `⚽FIVE du ${formatDate(five?.date || "")}\n\n*${
    playerInfo?.userName
  }* s'est dèsinscrit ☹️ \n\nJoueurs:\n${
    subscribedPlayers.length === 0 ? "_Pas de joueurs_" : subscribedPlayers
  }\n\nRemplaçants: \n${
    subscribedSubstitutePlayers.length === 0
      ? "_Pas de remplaçants_"
      : subscribedSubstitutePlayers
  }\n\n${window.location.href}`.replaceAll(",", " ");

  const deletePlayerFetch = useSupabase<Players>(
    () =>
      supabase
        .from("five_players")
        .delete()
        .eq("player_id", user?.id)
        .eq("five_id", five?.id),
    false
  );

  const handleUnsuscribeConfirmation = () => {
    deletePlayerFetch.executeFetch().then(() => {
      onConfirm();
      closeModal(Modals.UNSUBSCRIBE_MODAL);
    });
  };

  return (
    <Modal
      modalId={Modals.UNSUBSCRIBE_MODAL}
      title="Désinscription"
      onConfirm={handleUnsuscribeConfirmation}
    >
      <p className="mt-5">Êtes-vous sûr(e) ?</p>
    </Modal>
  );
};
