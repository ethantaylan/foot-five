import { ChangeEvent, FC } from "react";

export interface SwitchProps {
  label: string;
  isChecked: boolean;
  onToggle: (value: string) => void;
  className?: string;
}

export const Switch: FC<SwitchProps> = ({
  label,
  isChecked,
  onToggle,
  className,
}) => {
  return (
    <div className={`flex items-center ${className} w-52`}>
      <input
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onToggle(event.target.value)
        }
        type="checkbox"
        className="toggle toggle-sm me-2 toggle-secondary"
        checked={isChecked}
      />
      <label className={`label-text ${!isChecked && "text-opacity-55"}`}>
        {label}
      </label>
    </div>
  );
};
