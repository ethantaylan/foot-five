import { ChangeEvent, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { Modal } from "../../Modal/Modal";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../supabase";
import { usePlayerInfoStore } from "../../../store/PlayerInfo";

export const JoinGroupModal = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");  // New state for the password
  const { playerInfo } = usePlayerInfoStore();

  const joinGroupFetch = useSupabase(async () => {
    // Fetch the group based on groupName
    const { data: group, error } = await supabase
      .from("groups")
      .select("id, password, players_id, players_name")
      .eq("name", groupName)
      .single();

    if (error) {
      console.error("Group not found:", error.message);
      return;
    }

    // Check if the provided password matches the stored password
    if (group.password !== password) {
      console.error("Incorrect password");
      return;
    }

    // Update the group with the new user
    const updatedPlayersId = [...group.players_id, playerInfo?.userId];
    const updatedPlayersName = [...group.players_name, playerInfo?.fullName || playerInfo?.userName];

    const { error: updateError } = await supabase
      .from("groups")
      .update({
        players_id: updatedPlayersId,
        players_name: updatedPlayersName,
      })
      .eq("id", group.id);

    if (updateError) {
      console.error("Failed to update group:", updateError.message);
    }
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
            type="password"  // Mask the password input
            value={password}  // Bind the password state to the input
            maxLength={4}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            className="input input-bordered input-sm w-full"
          />
        </div>
      </div>
    </Modal>
  );
};
