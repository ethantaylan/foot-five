import { ChangeEvent, useEffect, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { useSupabase } from "../../../hooks/useSupabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";
import { supabase } from "../../../supabase";
import { Modal } from "../../Modal/Modal";
import { Switch } from "../../Switch/Switch";
import { closeModal } from "../../../utils/CloseModal";

export interface NewGroupModal {
  onConfirm: () => void;
}

export const NewGroupModal = ({ onConfirm }: NewGroupModal) => {
  const { playerInfo } = usePlayerInfoStore();
  const [groupName, setGroupName] = useState<string>("");
  const [isPrivate, setIsGroupPrivate] = useState<boolean>(false);
  const [pin, setPin] = useState<number>();
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  const newGroupFetch = useSupabase(
    () =>
      supabase.from("groups").insert([
        {
          name: groupName,
          is_private: isPrivate,
          owner: playerInfo?.userId,
          pin: pin,
          players_id: [playerInfo?.userName],
        },
      ]),
    false
  );

  useEffect(() => {
    setPin(Math.floor(Math.random() * (9999 - 100) + 1000));
  }, []);

  useEffect(() => {
    playerInfo &&
      setGroupMembers([...groupMembers, playerInfo?.userName || ""]);
  }, []);

  const reset = () => {
    setGroupName("");
    setIsGroupPrivate(false);
  };

  return (
    <Modal
      confirmButtonDisabled={groupName.length < 3}
      modalId={Modals.NEW_GROUP_MODAL}
      title="Nouveau groupe"
      onCancel={() => {
        reset();
        closeModal(Modals.NEW_GROUP_MODAL);
      }}
      onConfirm={() => {
        newGroupFetch.executeFetch().then(() => {
          closeModal(Modals.NEW_GROUP_MODAL);
          reset();
          onConfirm();
        });
      }}
    >
      <div className="flex flex-col">
        <label className="label-text">Nom du groupe</label>
        <input
          value={groupName}
          maxLength={10}
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setGroupName(event.target.value)
          }
          className="input input-bordered input-sm w-full"
        />

        <div className="mt-3 mb-4">
          <label className="label-text">PIN</label>
          <p className="p-3 bg-neutral-100 font-bold">{pin}</p>
        </div>

        <div>
          <label className="label-text">Visibilité</label>
          <Switch
            label="Privé"
            isChecked={isPrivate}
            onToggle={() => setIsGroupPrivate(!isPrivate)}
          />
        </div>
      </div>
    </Modal>
  );
};
