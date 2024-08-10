import { FC } from "react";

export interface ModalActions {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  confirmButtonDisabled?: boolean;
}

export const ModalActions: FC<ModalActions> = ({
  onCancel,
  onConfirm,
  confirmButtonLabel = "Confirmer",
  cancelButtonLabel = "Annuler",
  confirmButtonDisabled = false,
}) => {
  return (
    <div className="flex w-full gap-2 justify-end mt-6">
      <form method="dialog">
        <button onClick={onCancel} className="btn btn-sm">
          {cancelButtonLabel}
        </button>
      </form>

      <button
        disabled={confirmButtonDisabled}
        onClick={onConfirm}
        className="btn btn-sm btn-primary rounded"
      >
        {confirmButtonLabel}
      </button>
    </div>
  );
};
