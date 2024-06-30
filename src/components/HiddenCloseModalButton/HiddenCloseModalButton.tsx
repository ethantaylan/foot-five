import { FC } from "react";

export const HiddenCloseModalButton: FC<{ label?: string }> = ({ label }) => {
  return (
    <form method="dialog">
      <button className="btn btn-sm btn-ghost">{label}</button>
    </form>
  );
};
