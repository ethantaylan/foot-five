import { FC, useEffect, useState } from "react";
import { HiddenCloseModalButton } from "../HiddenCloseModalButton/HiddenCloseModalButton";
import { useGlobalStore } from "../../context";
import { Players } from "../../models/Player";
import { Five } from "../../models/Five";
import { formatDate } from "../../utils/FormatDate";

export interface UnSubscribeModalProps {
  onConfirm: () => void;
  title: string;
  modalId: string;
  label: string;
  five: Five;
}

export const UnSubscribeModal: FC<UnSubscribeModalProps> = ({
  onConfirm,
  title,
  modalId,
  five,
}) => {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false);

  const { playerInfo } = useGlobalStore();

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

  const subs = five.players.filter((p) => p.isSubstitute === true);
  const nonSubs = five.players.filter((p) => !p.isSubstitute);

  const subscribedPlayers = generatePlayerList(nonSubs);
  const subscribedSubstitutePlayers = generateSubstituteList(subs);

  const message = `⚽FIVE du ${formatDate(five?.date || "")}\n\n*${
    playerInfo?.userName
  }* s'est inscrit 🙂 \n\nJoueurs:\n${
    subscribedPlayers.length === 0 ? "_Pas de joueurs_" : subscribedPlayers
  }\n\nRemplaçants: \n${
    subscribedSubstitutePlayers.length === 0
      ? "_Pas de remplaçants_"
      : subscribedSubstitutePlayers
  }\n\n${window.location.href}`.replaceAll(",", " ");

  useEffect(() => {
    console.log(message);
  }, []);

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>

        <p className="mt-5">Êtes-vous sûr(e) ?</p>

        <div className="flex w-full gap-2 justify-end mt-6">
          <HiddenCloseModalButton label="Annuler" />

          <button
            onClick={onConfirm}
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
