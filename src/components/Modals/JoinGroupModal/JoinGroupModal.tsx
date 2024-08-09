import { ChangeEvent, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { Modal } from "../../Modal/Modal";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../supabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";

export interface JoinGroupModal {
  onConfirm: () => void;
  groups: string[];
}

export const JoinGroupModal = () => {
  const [groupName, setGroupName] = useState<string>("");

  const { playerInfo } = usePlayerInfoStore();

  const joinGroupFetch = useSupabase(
    () =>
      supabase
        .from("groups")
        .insert({
          players_id: playerInfo?.id,
          players_name: playerInfo?.fullName || playerInfo?.userName,
        })
        .eq("id", "b8879888-91fa-4814-aa4b-87cde4c727a7"),
    false
  );

  return (
    <Modal
      modalId={Modals.JOIN_GROUP_MODAL}
      title="Rejoindre un groupe"
      onConfirm={() => joinGroupFetch.executeFetch()}
    >
      <div className="flex flex-col">
        <label className="label-text">Nom du groupe</label>
        <input
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGroupName(event.target.value)
          }
          className="input input-bordered input-sm w-full"
        />
      </div>
    </Modal>
  );
};
