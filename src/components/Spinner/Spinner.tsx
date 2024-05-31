import { FC } from "react";

export interface SpinnerProps {
  size?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size }) => {
  return <span className={`loading loading-spinner loading-${size}`} />;
};
