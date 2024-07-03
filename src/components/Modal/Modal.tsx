import { FC, PropsWithChildren } from "react";
import { ModalActions } from "./ModalActions";
import { HiddenCloseModalButton } from "./HiddenCloseModalButton/HiddenCloseModalButton";

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
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold mb-5 text-lg">{title}</h3>

        {children}
        <ModalActions
          confirmButtonDisabled={confirmButtonDisabled}
          onConfirm={onConfirm}
        />

        <HiddenCloseModalButton />
      </div>
    </dialog>
  );
};
