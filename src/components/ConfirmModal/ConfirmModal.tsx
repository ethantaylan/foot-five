import { FC } from "react";

export interface ConfirmModalProps {
  onConfirm: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm }) => {
  return (
    <>
      <dialog id="confirmModal" className="modal">
        <div className="modal-box">
          <div className="flex mb-5 items-center justify-between">
            <h3 className="font-bold text-lg">Désinscription</h3>
          </div>

          <p>Êtes-vous sûr(e) ?</p>

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

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
