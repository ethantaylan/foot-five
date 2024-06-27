import { MapPinIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../utils/FormatDate";
import { FC, useState } from "react";
import { FivePlaces } from "../../constants/FivePlaces";
import { showModal } from "../../utils/ShowModal";
import { Modals } from "../../constants/Modals";
import { Five } from "../../models/Five";
import { Players } from "../../models/Player";
import { ShareIcon } from "@heroicons/react/16/solid";
import { WhatsappIcon, WhatsappShareButton } from "react-share";

export interface FiveInformationProps {
  five: Five;
  playerInfo: Players;
}

export const FiveInformation: FC<FiveInformationProps> = ({
  playerInfo,
  five,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <h2 className="font-bold">{formatDate(five.date)}</h2>
        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon className="w-5 ms-2 h-5 cursor-pointer hover:text-neutral-600" />
        </WhatsappShareButton>

        <ShareIcon
          onClick={handleCopyUrl}
          className="w-5 ms-2 cursor-pointer hover:text-neutral-600"
        />
        {isCopied && (
          <span className="badge badge-sm badge-primary ms-1">Copié !</span>
        )}
      </div>

      <h3 className="text-secondary flex text-sm">
        {five.place}
        {Object.values(FivePlaces).includes(five.place as FivePlaces) && (
          <MapPinIcon
            onClick={() => window.open(five.placeUrl, "_blank")}
            className="size-5 ms-1"
          />
        )}
      </h3>
      <div className="flex items-center gap-2">
        <h3 className="text-secondary text-sm">
          Organisé par:
          <span className="ms-1 font-semibold">{five.organizer.username}</span>
        </h3>
        <h3 className="text-secondary text-sm">
          Durée: <span className="font-semibold">{five.duration}</span>
        </h3>
      </div>

      {five.organizer?.id === playerInfo?.userId && (
        <div className="flex gap-2">
          <button
            onClick={() => showModal(Modals.EDIT_FIVE_MODAL)}
            className="text-sm underline"
          >
            Modifier
          </button>

          <button
            onClick={() => showModal(Modals.REMOVE_FIVE_MODAL)}
            className="text-sm underline text-red-500"
          >
            Supprimer
          </button>
        </div>
      )}
      <div className="divider my-1" />
    </div>
  );
};
