import { ChangeEvent, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { Modal } from "../../Modal/Modal";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../supabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";
import { Groups } from "../../../models/Groups";
import { GroupsCards } from "../../GroupsCard/GroupsCard";

export const JoinGroupModal = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [group, setGroup] = useState<Groups | null>(null);
  const [password, setPassword] = useState<string>("");
  const { playerInfo } = usePlayerInfoStore();

  const getGroupFetch = useSupabase(() => {
    supabase
      .from("groups")
      .select("id, password, players_id, players_name")
      .eq("name", groupName)
      .eq("password", password)
      .single();
  });

  const joinGroupFetch = useSupabase(() => {
    supabase
      .from("groups")
      .update({
        players_id: "",
        players_name: "",
      })
      .eq("id", group?.id);
  }, false);

  return (
    <Modal
      modalId={Modals.JOIN_GROUP_MODAL}
      title="Rejoindre un groupe"
      onConfirm={() => joinGroupFetch.executeFetch()}
    >
      <div className="flex gap-3 flex-col">
        <div>
          <label className="label-text">Nom du groupe</label>
          <input
            value={groupName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGroupName(event.target.value)
            }
            className="input input-bordered input-sm w-full"
          />
        </div>

        <div>
          <label className="label-text">Mot de passe (PIN à 4 chiffres)</label>
          <input
            type="password"
            value={password}
            maxLength={4}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            className="input input-bordered input-sm w-full"
          />
        </div>

        <div className="flex">
          <GroupsCards
            groupName={""}
            membersLenght={0}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            fives={0}
          />
        </div>
      </div>
    </Modal>
  );
};
