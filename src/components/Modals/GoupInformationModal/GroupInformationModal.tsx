import { Modals } from "../../../constants/Modals";
import { useSupabase } from "../../../hooks/useSupabase";
import { Groups } from "../../../models/Groups";
import { supabase } from "../../../supabase";
import { closeModal } from "../../../utils/CloseModal";
import { Modal } from "../../Modal/Modal";

export interface GroupInformationModal {
  group: Groups | null;
  onConfirm: () => void;
  onDeleteGroupe: () => void;
}

export const GroupInformationModal = ({
  group,
  onConfirm,
  onDeleteGroupe,
}: GroupInformationModal) => {
  const deleteGroupFetch = useSupabase(
    () => supabase.from("groups").delete().eq("id", group?.id),
    false
  );

  return (
    <Modal
      modalId={Modals.GROUP_INFORMARION_MODAL}
      title={`Information du groupe ${group?.name}`}
      onConfirm={onConfirm}
    >
      <div>
        <label className="label-text flex mb-3">Membres</label>
        {group?.playersId?.map((a) => (
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
