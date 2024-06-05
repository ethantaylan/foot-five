import { FC } from "react";

export const HiddenCloseModalButton: FC = () => {
  return (
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  );
};
