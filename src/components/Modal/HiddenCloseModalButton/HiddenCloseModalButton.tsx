import { FC } from "react";

export const HiddenCloseModalButton: FC<{ label?: string }> = ({ label }) => {
  return (
    <form method="dialog">
      <button>{label}</button>
    </form>
  );
};
