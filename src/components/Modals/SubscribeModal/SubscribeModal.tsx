import { useUser } from "@clerk/clerk-react";
import { startCase } from "lodash";
import { ChangeEvent, useState } from "react";
import { useSupabase } from "../../../hooks/UseSupabase";
import { Players, PlayersResponse } from "../../../models/Player";
import { supabase } from "../../../supabase";
import { Switch } from "../../Switch/Switch";
import { Modals } from "../../../constants/Modals";
import { closeModal } from "../../../utils/CloseModal";
import { Modal } from "../../Modal/Modal";
import { useFiveStore } from "../../../store/Five";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";

export interface SubscribeModalProps {
  onConfirm: () => void;
}

export default function SubscribeModal({ onConfirm }: SubscribeModalProps) {
  const { user } = useUser();
  const { five } = useFiveStore();
  const { playerInfo } = usePlayerInfoStore();
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
        five_id: five?.id,
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
        .update({ user_name: userName })
        .eq("user_id", user?.id),
    false
  );

  const handleConfirm = async () => {
    if (!playerInfo) {
      await subscribePlayerFetch.executeFetch();
    }

    const isPlayerAlreadySubscribed = five?.players.some(
      (player) => player.userId === playerInfo?.userId
    );

    if (!isPlayerAlreadySubscribed) {
      await updateUsernameFetch.executeFetch();
      await subscribePlayerToFiveFetch.executeFetch();
      onConfirm();
      closeModal(Modals.SUBSCRIBE_MODAL);
    }
  };

  return (
    <Modal
      modalId={Modals.SUBSCRIBE_MODAL}
      title="Inscription"
      onConfirm={handleConfirm}
      confirmButtonDisabled={!userName}
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="userName" className="label-text">
          Nom
        </label>
        <input
          id="userName"
          type="text"
          placeholder="Type here"
          value={startCase(userName)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          className="input input-bordered input-sm w-full"
        />
      </div>
      <Switch
        label="Remplaçant"
        isChecked={isSubstitute || five?.players.length === 10}
        onToggle={() => setIsSubstitute((prev) => !prev)}
      />
    </Modal>
  );
}
