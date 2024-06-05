import { FC } from "react";
import { Modals } from "../../constants/Modals";

export interface ConfirmModalProps {
  onConfirm: () => void;
}

const HiddenCloseModalButton: FC<{ label: string }> = ({ label }) => {
  return (
    <form method="dialog">
      <button className="btn btn-sm btn-ghost">{label}</button>
    </form>
  );
};

export const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm }) => {
  return (
    <dialog id={Modals.CONFIRM_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Désinscription</h3>

        <p className="mt-5">Êtes-vous sûr(e) ?</p>

        <div className="flex w-full gap-2 justify-end mt-6">
          <HiddenCloseModalButton label="Annuler" />

          <button
            onClick={onConfirm}
            className="btn btn-sm btn-primary rounded"
          >
            Confirmer
          </button>
        </div>
      </div>

      <HiddenCloseModalButton label="" />
    </dialog>
  );
};
