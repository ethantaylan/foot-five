import { useUser } from "@clerk/clerk-react";
import { FC } from "react";
import { Modals } from "../../../constants/Modals";
import { useSupabase } from "../../../hooks/UseSupabase";
import { Players } from "../../../models/Player";
import { supabase } from "../../../supabase";
import { closeModal } from "../../../utils/CloseModal";
import { Modal } from "../../Modal/Modal";
import { useFiveStore } from "../../../store/Five";

export interface UnSubscribeModalProps {
  onConfirm: () => void;
  label?: string;
}

export const UnSubscribeModal: FC<UnSubscribeModalProps> = ({ onConfirm }) => {
  const { five } = useFiveStore();
  const { user } = useUser();

  const deletePlayerFetch = useSupabase<Players>(
    () =>
      supabase
        .from("five_players")
        .delete()
        .eq("player_id", user?.id)
        .eq("five_id", five?.id),
    false
  );

  const handleUnsuscribeConfirmation = () => {
    deletePlayerFetch.executeFetch().then(() => {
      onConfirm();
      closeModal(Modals.UNSUBSCRIBE_MODAL);
    });
  };

  return (
    <Modal
      modalId={Modals.UNSUBSCRIBE_MODAL}
      title="Désinscription"
      onConfirm={handleUnsuscribeConfirmation}
    >
      <p className="mt-5">Êtes-vous sûr(e) ?</p>
    </Modal>
  );
};
