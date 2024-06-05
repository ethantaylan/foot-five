import { MapPinIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../utils/FormatDate";
import { FC } from "react";

export interface FiveInformationProps {
  date: string;
  place: string;
  placeUrl: string;
}

export const FiveInformation: FC<FiveInformationProps> = ({ date, place, placeUrl }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{formatDate(date)}</h2>

      <h3 className="text-secondary flex text-sm">
        {place}
        <MapPinIcon
          onClick={() => window.open(placeUrl)}
          className="size-5 ms-1"
        />
      </h3>
    </div>
  );
};
