import { ChangeEvent, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { useSupabase } from "../../../hooks/useSupabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";
import { supabase } from "../../../supabase";
import { Modal } from "../../Modal/Modal";
import { Switch } from "../../Switch/Switch";

export const NewGroupModal = () => {
  const { playerInfo } = usePlayerInfoStore();
  const [groupName, setGroupName] = useState<string>("");
  const [isPrivate, setIsGroupPrivate] = useState<boolean>(false);

  const newGroupFetch = useSupabase(
    () =>
      supabase
        .from("groups")
        .insert([
          { name: groupName, is_private: isPrivate, owner: playerInfo?.userId },
        ]),
    false
  );

  // TODO: not be able to create a group if the group name already exists

  return (
    <Modal
      modalId={Modals.NEW_GROUP_MODAL}
      title="Nouveau groupe"
      onConfirm={() => newGroupFetch.executeFetch()}
    >
      <div className="flex flex-col">
        <label className="label-text">Nom du groupe</label>
        <input
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGroupName(event.target.value)
          }
          className="input input-bordered input-sm w-full"
        />

        <Switch
          label="Privé"
          isChecked={isPrivate}
          onToggle={() => setIsGroupPrivate(!isPrivate)}
        />
      </div>
    </Modal>
  );
};
