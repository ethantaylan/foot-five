import { FC } from "react";
import { Modals } from "../../../constants/Modals";
import { closeModal } from "../../../utils/CloseModal";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../supabase";
import { Players } from "../../../models/Player";
import { Modal } from "../../Modal/Modal";
import { useFiveStore } from "../../../store/Five";

export const DeleteFiveModal: FC = () => {
  const { five } = useFiveStore();
  const navigate = useNavigate();

  const deleteFiveFetch = useSupabase<Players>(
    () => supabase.from("fives").delete().eq("id", five?.id),
    false
  );

  const handleFiveDelete = () => {
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
    />
  );
};
