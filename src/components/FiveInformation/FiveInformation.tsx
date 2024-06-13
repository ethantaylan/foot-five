import { MapPinIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../utils/FormatDate";
import { FC } from "react";
import { useGlobalStore } from "../../context";
import { FivePlaces } from "../../constants/FivePlaces";
import { useUser } from "@clerk/clerk-react";

export interface FiveInformationProps {
  date: string;
  place: string;
  placeUrl: string;
}

export const FiveInformation: FC<FiveInformationProps> = ({
  date,
  place,
  placeUrl,
}) => {
  const { playerInfo, organizer } = useGlobalStore();
  const { user } = useUser();

  return (
    <div className="flex flex-col">
      <h2 className="font-bold">{formatDate(date)}</h2>

      <h3 className="text-secondary flex text-sm">
        {place}
        {Object.values(FivePlaces).includes(place as FivePlaces) && (
          <MapPinIcon
            onClick={() => window.open(placeUrl)}
            className="size-5 ms-1"
          />
        )}
      </h3>
      <div>
        {user && organizer?.userId === playerInfo?.userId && (
          <button className="text-md underline">Modifier</button>
        )}
      </div>
    </div>
  );
};
