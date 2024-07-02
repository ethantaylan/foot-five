import { FC } from "react";
import { Modals } from "../../constants/Modals";

export interface DeleteFiveProps {
  onConfirm: () => void;
}

export const DeleteFiveModal: FC<DeleteFiveProps> = ({ onConfirm }) => {
  return (
    <dialog id={Modals.REMOVE_FIVE_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">Suppression du five</h3>

        <div className="flex w-full gap-2 justify-end mt-6">
          <form method="dialog">
            <button className="btn btn-sm btn-ghost">Annuler</button>
          </form>

          <button
            onClick={onConfirm}
            className="btn btn-sm btn-primary rounded"
          >
            Confirmer
          </button>
        </div>
      </div>
    </dialog>
  );
};
