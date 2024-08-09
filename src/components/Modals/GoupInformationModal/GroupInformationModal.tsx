import { Modals } from "../../../constants/Modals";
import { useSupabase } from "../../../hooks/useSupabase";
import { useGroupsStore } from "../../../store/GroupsStore";
import { supabase } from "../../../supabase";
import { closeModal } from "../../../utils/CloseModal";
import { Modal } from "../../Modal/Modal";

export interface GroupInformationModal {
  onConfirm: () => void;
  onDeleteGroupe: () => void;
}

export const GroupInformationModal = ({
  onConfirm,
  onDeleteGroupe,
}: GroupInformationModal) => {
  const { selectedGroup } = useGroupsStore();

  const deleteGroupFetch = useSupabase(
    () => supabase.from("groups").delete().eq("id", selectedGroup?.id),
    false
  );

  return (
    <Modal
      modalId={Modals.GROUP_INFORMARION_MODAL}
      title={`Information du groupe ${selectedGroup?.name}`}
      onConfirm={onConfirm}
    >
      <div>
        <label className="label-text flex mb-3">Membres</label>
        {selectedGroup?.playersId?.map((a) => (
          <p key={a}>{a}</p>
        ))}
      </div>

      <div className="divider mb-2" />

      <button
        onClick={() =>
          deleteGroupFetch.executeFetch().then(() => {
            closeModal(Modals.GROUP_INFORMARION_MODAL);
            onDeleteGroupe();
          })
        }
        className="btn btn-error btn-sm"
      >
        Supprimer le groupe
      </button>
    </Modal>
  );
};
