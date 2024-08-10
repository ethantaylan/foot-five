import { FC, PropsWithChildren } from "react";
import { ModalActions } from "./ModalActions";

export interface ModalProps {
  modalId: string;
  title: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonDisabled?: boolean;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  onConfirm,
  modalId,
  title,
  children,
  confirmButtonDisabled,
  onCancel,
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">{title}</h3>

        {children}
        <ModalActions
          onCancel={onCancel}
          confirmButtonDisabled={confirmButtonDisabled}
          onConfirm={onConfirm}
        />
      </div>
    </dialog>
  );
};
