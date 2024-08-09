import { FC, useEffect, useState } from "react";
import { Modals } from "../../../constants/Modals";
import { closeModal } from "../../../utils/CloseModal";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../supabase";
import { Players } from "../../../models/Player";
import { Modal } from "../../Modal/Modal";
import { useFiveStore } from "../../../store/Five";
import { useGroupsStore } from "../../../store/GroupsStore";

export interface DeleteFiveModalProps {
  onDelete: () => void;
}

export const DeleteFiveModal: FC<DeleteFiveModalProps> = ({ onDelete }) => {
  const { five } = useFiveStore();
  const { selectedGroup } = useGroupsStore();
  const navigate = useNavigate();
  const [updatedGroups, setUpdatedGroups] = useState<string[]>([]);

  const deleteFiveFetch = useSupabase<Players>(
    () => supabase.from("fives").delete().eq("id", five?.id),
    false
  );

  const deleteFiveIdFromGroupFetch = useSupabase<Players>(
    () =>
      supabase
        .from("groups")
        .update({ fives_id: updatedGroups })
        .eq("id", selectedGroup?.id),
    false
  );

  useEffect(() => {
    const ug = selectedGroup?.fivesId.filter((f) => f !== five?.fiveId);
    setUpdatedGroups(ug ?? []);
  }, [selectedGroup]);

  useEffect(() => {
    deleteFiveFetch.response && deleteFiveIdFromGroupFetch.executeFetch();
  }, [deleteFiveFetch.response]);

  const handleFiveDelete = () => {
    deleteFiveIdFromGroupFetch.executeFetch();
    deleteFiveFetch.executeFetch().then(() => {
      closeModal(Modals.REMOVE_FIVE_MODAL);
      navigate("/");
    });
  };

  return (
    <Modal
      modalId={Modals.REMOVE_FIVE_MODAL}
      title="Suppression du five"
      onConfirm={handleFiveDelete}
    >
      {five?.fiveId}
    </Modal>
  );
};
